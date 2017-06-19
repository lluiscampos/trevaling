/* Copyright (c) 2016 Trevaling */

#if defined(PARTICLE)
  #include "application.h"
#else
  #include <stdio.h>
  #include <string.h>
  #include <stdlib.h>
  #include "particle_mock.h"
#endif

#include "cellular.h"


#define META_CASE_RETURN(type) case type: return #type

const char* at_resp_type_to_str(int type)
{
  switch (type)
  {
    META_CASE_RETURN(TYPE_UNKNOWN);
    META_CASE_RETURN(TYPE_OK);
    META_CASE_RETURN(TYPE_ERROR);
    META_CASE_RETURN(TYPE_RING);
    META_CASE_RETURN(TYPE_CONNECT);
    META_CASE_RETURN(TYPE_NOCARRIER);
    META_CASE_RETURN(TYPE_NODIALTONE);
    META_CASE_RETURN(TYPE_BUSY);
    META_CASE_RETURN(TYPE_NOANSWER);
    META_CASE_RETURN(TYPE_PROMPT);
    META_CASE_RETURN(TYPE_PLUS);
    META_CASE_RETURN(TYPE_TEXT);
    META_CASE_RETURN(TYPE_ABORTED);
    default:
      return "(unknown)";
  }
}


/* Debug functions */
void debug_print_callback(int type, const char* buf, int len)
{
#if 0
  Serial.printf("[debug] callback type 0x%06x %s len %d\r\n", type, at_resp_type_to_str(type), len);

  char line[1024+64];
  if (sscanf(buf, "\r\n%[^\r]\r\n", line) == 1)
  {
    Serial.printf("<line>%s</line>\r\n", line);
  }
  else
  {
    Serial.printf("<buf>%s</buf>\r\n", buf);
  }
#endif
}


/* CREG functions */

#define ATCOMMAND_SCAN(cmd) "\r\n" cmd ": %[^\r]\r\n"

bool cmd_network_registration_status_parse(const char* buf,
            cmd_network_registration_status_t* p_network_registration_status)
{
  char parse_buffer[64];
  char* p_token;
  int retval;

  retval = sscanf(buf, ATCOMMAND_SCAN("+CREG"), parse_buffer);
  //Serial.printf("<parse_buffer>%s</parse_buffer>\r\n", parse_buffer);
  if (retval != 1)
  {
    return false;
  }

  //TODO: Check for p_token being a sane pointer or return

  p_token = strtok((char*)parse_buffer, ",");
  p_network_registration_status->n = strtol(p_token, NULL, 10);

  p_token = strtok(NULL, ",");
  p_network_registration_status->stat = strtol(p_token, NULL, 10);

  p_token = strtok(NULL, ",");
  if (*p_token == '"')
  {
    p_token++;
    p_network_registration_status->lac = strtol(p_token, NULL, 16);
  }
  else
  {
    p_network_registration_status->lac = strtol(p_token, NULL, 10);
  }

  p_token = strtok(0, ",");
  if (*p_token == '"')
  {
    p_token++;
    p_network_registration_status->ci = strtol(p_token, NULL, 16);
  }
  else
  {
    p_network_registration_status->ci = strtol(p_token, NULL, 10);
  }

  p_token = strtok(0, ",");
  p_network_registration_status->actstatus = strtol(p_token, NULL, 10);

  return true;
}

//TODO: Investigate number and type of callbacks

int callbackCREG_set(int type, const char* buf, int len, char* creg)
{
  //debug_print_callback(type, buf, len);

  if (type == TYPE_PLUS)
  {
    /*nothing*/
  }
  return WAIT;
}

int callbackCREG_get(int type, const char* buf, int len,
            cmd_network_registration_status_t* p_network_registration_status)
{
  //debug_print_callback(type, buf, len);

  if (type == TYPE_PLUS)
  {
    cmd_network_registration_status_parse(buf, p_network_registration_status);
  }
  return WAIT;
}

bool cmd_network_registration_status_get(
            cmd_network_registration_status_t* p_network_registration_status)
{
  int retval;
  char creg_set[32] = "";

  memset(p_network_registration_status, 0, sizeof(cmd_network_registration_status_t));

  //TODO: Investigate ahd check the Cellular.command retval

  retval = Cellular.command(callbackCREG_set, creg_set, 10000, "AT+CREG=2\r\n");
  //Serial.printf("Cellular.command retval: %d\r\n", retval);

  retval = Cellular.command(callbackCREG_get, p_network_registration_status, 10000, "AT+CREG?\r\n");
  //Serial.printf("Cellular.command retval: %d\r\n", retval);

  return retval == RESP_OK;
}

/* Parses COPS response:
     [MCC:<MCC>, MNC:<MNC>, LAC:<LAC>, CI:<CI>, BSIC:<BSIC>, Arfcn:<Arfcn>, RXLEV:<RXLEV>
*/
bool cellular_cellular_operator_parse(const char* buf,
            cellular_operator_t* p_cellular_operator)
{
  if ( sscanf(buf, "\r\nMCC:%d, MNC:%d, LAC:%x, CI:%x, BSIC:%x, Arfcn:%5d, RXLEV:%3d\r\n",
        &p_cellular_operator->mcc,
        &p_cellular_operator->mnc,
        &p_cellular_operator->lac,
        &p_cellular_operator->ci,
        &p_cellular_operator->bsic,
        &p_cellular_operator->arfcn,
        &p_cellular_operator->rxlev ) > 0 )
  {
    return true;
  }
  return false;
}

int callbackCOPS(int type, const char* buf, int len,
            cellular_operator_list_t* p_cellular_operator_list)
{
  debug_print_callback(type, buf, len);

  char line[1024+64];
  if (sscanf(buf, "\r\n%[^\r]\r\n", line) != 1)
  {
    /* TODO: Save error */
    Serial.printf("[callbackCOPS] error, cannot parse line from buffer <buf>%s</buf>\r\n", buf);
    return WAIT;
  }

  Serial.printf("[callbackCOPS] info, 0x%06x %s line %s\r\n",
      type, at_resp_type_to_str(type), line);

  if (type == TYPE_PLUS)
  {
    /* Ignore the seldom +CIEV responses */
  }
  else if (type == TYPE_UNKNOWN)
  {
    /* +COPS response */
    if (p_cellular_operator_list->len < (CELLULAR_OPERATOR_MAX-1))
    {
      cellular_operator_t cellular_operator;
      if (cellular_cellular_operator_parse(line, &cellular_operator))
      {
        void* p_dest = (void *)&p_cellular_operator_list->list[p_cellular_operator_list->len];
        memcpy((void *)p_dest, &cellular_operator, sizeof(cellular_operator_t));

        p_cellular_operator_list->len++;
      }
    }
  }
  else if ((type == TYPE_OK) && (strcmp(line, "OK") == 0))
  {
    /* All responses received */
    Serial.printf("Got OK from +COPS, we are done :)\r\n");
  }
  else
  {
    /* TODO: Save error */
    Serial.printf("[callbackCOPS] error, unexpected response 0x%06x %s line %s\r\n",
        type, at_resp_type_to_str(type), line);
  }

  return WAIT;
}

static inline int callbackSTRING(int type, const char* buf, int len, int* data)
{
  debug_print_callback(type, buf, len);

  char line[1024+64];
  if (sscanf(buf, "\r\n%[^\r]\r\n", line) != 1)
  {
    /* TODO: Save error */
    Serial.printf("[callbackSTRING] error, cannot parse line from buffer <buf>%s</buf>\r\n", buf);
    return WAIT;
  }

  /* Accept TYPE_PLUS and TYPE_OK, do nothing */
  if ((type == TYPE_PLUS) || (type == TYPE_OK))
  {
    Serial.printf("[callbackSTRING] info, 0x%06x %s line %s\r\n",
        type, at_resp_type_to_str(type), line);
  }
  else
  {
    Serial.printf("[callbackSTRING] error, unexpected response 0x%06x %s line %s\r\n",
        type, at_resp_type_to_str(type), line);
  }
  return WAIT;
}

bool cellular_cmd_operator_selection(
        cellular_operator_list_t* p_cellular_operator_list)
{
  int data;
  int ret;
  int final_result = false;

  /* TODO: Do we really need to probe before scanning? */
  Serial.printf("[ AT+COPS=? ]\r\n");
  ret = Cellular.command(callbackSTRING, &data, 3*60000, "AT+COPS=?\r\n");

  /* Do scan if probe went fine */
  if (ret == RESP_OK)
  {
    Serial.printf("[ AT+COPS=5 ]\r\n");
    ret = Cellular.command(callbackCOPS, p_cellular_operator_list, 3*60000, "AT+COPS=5\r\n");
    if (ret == RESP_OK)
    {
      final_result = true;
    }
  }
  if (final_result)
  {
    Serial.printf("\r\nScan complete!\r\n");
  }
  else
  {
     Serial.printf("\r\nScan incomplete! Power cycle the modem and try again.\r\n");
  }

  return final_result;
}
