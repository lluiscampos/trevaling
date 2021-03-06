/* Copyright (c) 2016 Trevaling */

#if defined(PARTICLE)
  #include "application.h"
#else
  #include <stdio.h>
  #include <string.h>
  #include "particle_mock.h"
#endif
#include "cellular.h"

#include "philae.h"

Philae::Philae(void)
{
  this->current_position.local_area_code = 0;
  this->current_position.cell_id = 0;
  this->last_position.local_area_code = 0;
  this->last_position.cell_id = 0;
}

Philae::~Philae(void)
{

}

const char* dev_command_to_str(philae_dev_command_t command_id)
{
  switch (command_id)
  {
    case PHILAE_DEV_NETWORK_REGISTRATION_STATUS:
      return "PHILAE_DEV_NETWORK_REGISTRATION_STATUS";
    case PHILAE_DEV_OPERATOR_SELECTION:
      return "PHILAE_DEV_OPERATOR_SELECTION";
    case PHILAE_DEV_PRINT_CURRENT_POSITION:
      return "PHILAE_DEV_PRINT_CURRENT_POSITION";
    case PHILAE_DEV_PUBLISH_CURRENT_POSITION:
      return "PHILAE_DEV_PUBLISH_CURRENT_POSITION";
    default:
      return "(unknown)";
  }
}

const char * Philae::operator_list_to_json_all(cellular_operator_list_t cell_list)
{
  static char str[1024] = {0};

  sprintf(str, "{\"len\":%d,\"list\":[",
    cell_list.len
  );

  for (unsigned int i = 0; i < cell_list.len; i++)
  {
    sprintf(str + strlen(str),
        "{\"mcc\":%d,\"mnc\":%d,\"lac\":%u,\"ci\":%u,\"bsic\":%u,\"arfcn\":%d,\"rxlev\":%d},",
        cell_list.list[i].mcc,
        cell_list.list[i].mnc,
        cell_list.list[i].lac,
        cell_list.list[i].ci,
        cell_list.list[i].bsic,
        cell_list.list[i].arfcn,
        cell_list.list[i].rxlev );
  }

  sprintf(str + strlen(str) - 1, "]}");

  return str;
}

const char * Philae::operator_list_to_json(cellular_operator_list_t cell_list)
{
  static char str[1024] = {0};

  sprintf(str, "[");

  for (unsigned int i = 0; i < cell_list.len; i++)
  {
    sprintf(str + strlen(str),
        "{\"mcc\":%d,\"mnc\":%d,\"lac\":%u,\"ci\":%u,\"rxlev\":%d},",
        cell_list.list[i].mcc,
        cell_list.list[i].mnc,
        cell_list.list[i].lac,
        cell_list.list[i].ci,
        cell_list.list[i].rxlev );
  }

  sprintf(str + strlen(str) - 1, "]");

  return str;
}

void Philae::operator_list_sort_by_rxlev(cellular_operator_list_t* p_cell_list)
{
  cellular_operator_t cell_info_tmp;

  for (unsigned int i = 0 ; i < ( p_cell_list->len - 1); i++)
  {
    for (unsigned int j = 0 ; j < (p_cell_list->len - i - 1); j++)
    {
      if (p_cell_list->list[j].rxlev > p_cell_list->list[j+1].rxlev)
      {
        memcpy((void *)&cell_info_tmp, (void *)&p_cell_list->list[j],
            sizeof(cellular_operator_t));
        memcpy((void *)&p_cell_list->list[j], (void *)&p_cell_list->list[j+1],
            sizeof(cellular_operator_t));
        memcpy((void *)&p_cell_list->list[j+1], (void *)&cell_info_tmp,
            sizeof(cellular_operator_t));
      }
    }
  }
}

void Philae::process_dev_command(philae_dev_command_t command_id)
{
  Serial.printf("Processing %s...\r\n", dev_command_to_str(command_id));

  if (command_id == PHILAE_DEV_NETWORK_REGISTRATION_STATUS)
  {
    this->retreive_and_update_position();
  }
  if (command_id == PHILAE_DEV_OPERATOR_SELECTION)
  {
    cellular_operator_list_t cell_list = {0};
    cellular_cmd_operator_selection(&cell_list);

    Serial.printf("OPERATORS LIST (%d)\r\n", cell_list.len);
    for (unsigned int i = 0; i < cell_list.len; i++)
    {
      Serial.printf("[%d]: %d,%d,0x%x,0x%x,0x%x,%d,%d\r\n", i,
          cell_list.list[i].mcc,
          cell_list.list[i].mnc,
          cell_list.list[i].lac,
          cell_list.list[i].ci,
          cell_list.list[i].bsic,
          cell_list.list[i].arfcn,
          cell_list.list[i].rxlev );
    }
    Serial.printf("DONE\r\n");
  }
  else if (command_id == PHILAE_DEV_PRINT_CURRENT_POSITION)
  {
    Serial.printf("Philae position: %s \r\n", this->get_position());
  }
  else if (command_id == PHILAE_DEV_PUBLISH_CURRENT_POSITION)
  {
    bool retval;
    Serial.printf("Publishing current position\r\n");
    retval = Particle.publish("current-position", this->get_position(), 60, PRIVATE);
    if (not retval)
    {
      Serial.printf("failed\r\n"); /* sic */
    }
  }
  else
  {
    Serial.printf("nothing to do\r\n");
  }

  Serial.printf("...done\r\n");
}

void Philae::retreive_and_update_position()
{
  bool retval;
  cmd_network_registration_status_t network_registration_status;

  retval = cmd_network_registration_status_get(&network_registration_status);
  if (retval)
  {
    this->set_position(network_registration_status.lac, network_registration_status.ci);
  }
  else
  {
    Serial.printf("retreive_and_update_position failed\r\n");
  }
}

void Philae::setup(void)
{
  Serial.begin(9600);
}

void Philae::loop(void)
{
//TODO: Find a way to get the develop console conditionally compiled
#if 0
  const unsigned long sleep_time = 1 * 1000;
  Serial.printf(".");
  int incomingByte = 0;

  if (Serial.available() > 1)
  {
    Serial.printf("flush %d bytes\r\n", Serial.available());
    while (Serial.available())
    {
      incomingByte = Serial.read();
      Serial.printf("flush%c\r\n", incomingByte);
    }
  }

  if (Serial.available() > 0)
  {
    incomingByte = Serial.read();

    this->process_dev_command((philae_dev_command_t)incomingByte);
  }
  delay(sleep_time);

#else
  const unsigned long sleep_time = 300 * 1000;

  cellular_operator_list_t cell_list = {0};
  if (cellular_cmd_operator_selection(&cell_list))
  {
    this->operator_list_sort_by_rxlev(&cell_list);

    /* Send only the 4 closest antennas */
    if (cell_list.len > 4)
    {
      cell_list.len = 4;

      /* Check that the json fits in 255 bytes, else send only 3 antennas */
      if (strlen(this->operator_list_to_json(cell_list)) > 255)
      {
        cell_list.len = 3;
      }
    }

    bool retval;
    retval = Particle.publish("cellular-list", this->operator_list_to_json(cell_list), 60, PRIVATE);
    if (not retval)
    {
      //TODO: Get some failure statistics
    }
  }
  else
  {
    this->retreive_and_update_position();
    if (this->position_changed())
    {
      bool retval;
      retval = Particle.publish("current-position", this->get_position(), 60, PRIVATE);
      if (not retval)
      {
        //TODO: Get some failure statistics
      }
    }
  }

  delay(sleep_time);
#endif
}

const char * Philae::get_position()
{
  static char str[64];

  sprintf(str, "{\"lac\":%u,\"ci\":%lu}",
    this->current_position.local_area_code,
    this->current_position.cell_id
  );

  return str;
}

void Philae::set_position(unsigned int local_area_code, long unsigned int cell_id)
{
  this->last_position.local_area_code = this->current_position.local_area_code;
  this->last_position.cell_id = this->current_position.cell_id;
  this->current_position.local_area_code = local_area_code;
  this->current_position.cell_id = cell_id;
}

bool Philae::position_changed()
{
  return not (    (this->current_position.local_area_code == this->last_position.local_area_code)
              and (this->current_position.cell_id == this->last_position.cell_id));
}
