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
    default:
      return "(unknown)";
  }
}

void Philae::process_dev_command(philae_dev_command_t command_id)
{
  bool retval;

  philae_printf("Processing %s...\r\n", dev_command_to_str(command_id));

  if (command_id == PHILAE_DEV_NETWORK_REGISTRATION_STATUS)
  {
    cmd_network_registration_status_t network_registration_status;

    retval = cmd_network_registration_status_get(&network_registration_status);
    if (retval)
    {
      this->set_position(network_registration_status.lac, network_registration_status.ci);
      philae_printf("n: %d, stat %d, lac %u, ci %lu, actstatus %d\r\n",
        network_registration_status.n,
        network_registration_status.stat,
        network_registration_status.lac,
        network_registration_status.ci,
        network_registration_status.actstatus
      );
    }
    else
    {
      philae_printf("failed\r\n"); /* sic */
    }
  }

  philae_printf("...done\r\n");
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

    philae_printf("Philae position: %s \r\n", this->get_position());
  }
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
  this->current_position.local_area_code = local_area_code;
  this->current_position.cell_id = cell_id;
}
