/* Copyright (c) 2016 Trevaling */

#if defined(PARTICLE)
  #include "application.h"
#else
  #include <stdio.h>
#endif
#include "osal.h"
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
    case PHILAE_DEV_PRINT_CURRENT_POSITION:
      return "PHILAE_DEV_PRINT_CURRENT_POSITION";
    case PHILAE_DEV_PUBLISH_CURRENT_POSITION:
      return "PHILAE_DEV_PUBLISH_CURRENT_POSITION";
    default:
      return "(unknown)";
  }
}

void Philae::process_dev_command(philae_dev_command_t command_id)
{
  philae_printf("Processing %s...\r\n", dev_command_to_str(command_id));

  if (command_id == PHILAE_DEV_NETWORK_REGISTRATION_STATUS)
  {
    this->retreive_and_update_position();
  }
  else if (command_id == PHILAE_DEV_PRINT_CURRENT_POSITION)
  {
    philae_printf("Philae position: %s \r\n", this->get_position());
  }
  else if (command_id == PHILAE_DEV_PUBLISH_CURRENT_POSITION)
  {
#if defined(PARTICLE)
    bool retval;
    philae_printf("Publishing current position\r\n");
    retval = Particle.publish("current-position", this->get_position(), 60, PRIVATE);
    if (not retval)
    {
      philae_printf("failed\r\n"); /* sic */
    }
#endif
  }
  else
  {
    philae_printf("nothing to do\r\n");
  }

  philae_printf("...done\r\n");
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
    philae_printf("retreive_and_update_position failed\r\n");
  }
}

void Philae::setup(void)
{
#if defined(PARTICLE)
  Serial.begin(9600);
#endif
}

void Philae::loop(void)
{
  int incomingByte = 0;

  if (philae_available)
  {
    incomingByte = philae_getchar();

    this->process_dev_command((philae_dev_command_t)incomingByte);
  }

#if defined(PARTICLE)
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
  System.sleep(60);
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
