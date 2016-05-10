/* Copyright (c) 2016 Trevaling */

#if defined(PARTICLE)
  #include "application.h"
#else
  #include <stdio.h>
  #include <string.h>
  #include <stdlib.h>
#endif
#include "osal.h"

#include "cellular.h"


/* Debug functions */

void debug_print_callback(int type, const char* buf, int len)
{
  philae_printf("[debug] callback type 0x%08x len %d\r\n", type, len);
  philae_printf("<buf>%s</buf>\r\n", buf);
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
  philae_printf("<parse_buffer>%s</parse_buffer>\r\n", parse_buffer);
  if (retval != 1)
  {
    return false;
  }

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

#if defined(PARTICLE)

int callbackCREG_set(int type, const char* buf, int len, char* creg)
{
  debug_print_callback(type, buf, len);

  if (type == TYPE_PLUS)
  {
    /*nothing*/
  }
  return WAIT;
}

int callbackCREG_get(int type, const char* buf, int len,
            cmd_network_registration_status_t* p_network_registration_status)
{
  int retval;

  debug_print_callback(type, buf, len);

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

  retval = Cellular.command(callbackCREG_set, creg_set, 10000, "AT+CREG=2\r\n");
  philae_printf("Cellular.command retval: %d\r\n", retval);

  retval = Cellular.command(callbackCREG_get, p_network_registration_status, 10000, "AT+CREG?\r\n");
  philae_printf("Cellular.command retval: %d\r\n", retval);

  return retval == RESP_OK;
}

#else

bool cmd_network_registration_status_get(
            cmd_network_registration_status_t* p_network_registration_status)
{
  philae_printf("CREG DUMMY\r\n");

  return true;
}

#endif
