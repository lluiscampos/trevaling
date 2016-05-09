/* Copyright (c) 2016 Trevaling */

#ifndef COMMANDS_H
#define COMMANDS_H

/* This module implements some u-blox AT commands. Uses particle.io Cellular class to access
u-blox chip and issue the raw commands to the network and parse the data.

The full descripion of the commands can be found here:
https://www.u-blox.com/sites/default/files/u-blox-ATCommands_Manual_%28UBX-13002752%29.pdf
*/


/* Network registration status +CREG
 * Configures the network registration information.
 * +CREG: <stat>[,<lac>,<ci>[,<AcTStatus>]] if <n>=2 and there is a change of the network cell in GERAN/UTRAN/E-UTRAN
 */

typedef struct {
  int n;
  int stat;
  unsigned int lac;
  long unsigned int ci;
  int actstatus;
} cmd_network_registration_status_t;

bool cmd_network_registration_status_get(cmd_network_registration_status_t* p_network_registration_status);
bool cmd_network_registration_status_parse(const char* buf, cmd_network_registration_status_t* p_network_registration_status);

#endif
