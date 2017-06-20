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
 * +CREG: <stat>[,<lac>,<ci>[,<AcTStatus>]]
 */

struct cmd_network_registration_status_t
{
  int n;
  int stat;
  unsigned int lac;
  long unsigned int ci;
  int actstatus;
};

bool cmd_network_registration_status_get(
            cmd_network_registration_status_t* p_network_registration_status);
bool cmd_network_registration_status_parse(
            const char* buf,
            cmd_network_registration_status_t* p_network_registration_status);

#define CELLULAR_OPERATOR_MAX 16

struct cellular_operator_t
{
  int mcc;           /* Mobile Country Code Mobile Country Code, range 0 - 999 (3 digits). */
  int mnc;           /* Mobile Network Code, range 0 - 999 (1 to 3 digits). */
  unsigned int lac;  /* Location Area Code, range 0h-FFFFh (2 octets) */
  unsigned int ci;   /* Cell Identity: for 2G cell: range 0h-FFFFh (2 octets) */
  unsigned int bsic; /* Base Station Identify Code, range 0h-3Fh (6 bits) */
  int arfcn;         /* Absolute Radio Frequency Channel Number, range 0 - 1023 or INVALID_ARFCN */
  int rxlev;         /* Received signal level on the cell, range 0 - 63 or 255 (not available) */
};

struct cellular_operator_list_t
{
  unsigned int len;
  cellular_operator_t list[CELLULAR_OPERATOR_MAX];
};

bool cellular_cmd_operator_selection(
            cellular_operator_list_t* p_cellular_operator_list_t);


bool cellular_cellular_operator_parse(
            const char* buf,
            cellular_operator_t* p_cellular_operator);

#endif
