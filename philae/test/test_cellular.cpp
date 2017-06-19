#include <boost/test/unit_test.hpp>

#include "cellular.h"

BOOST_AUTO_TEST_SUITE (commands_test)

BOOST_AUTO_TEST_CASE(test_cmd_network_registration_status_parse)
{
  cmd_network_registration_status_t status;
  memset(&status, 0, sizeof(cmd_network_registration_status_t));

  cmd_network_registration_status_parse("\r\n+CREG: 2,5,\"5079\",\"CEA2EF\",6\r\n", &status);

  BOOST_CHECK_EQUAL( status.n,         2 );
  BOOST_CHECK_EQUAL( status.stat,      5 );
  BOOST_CHECK_EQUAL( status.lac,       0x5079 );
  BOOST_CHECK_EQUAL( status.ci,        0xCEA2EF );
  BOOST_CHECK_EQUAL( status.actstatus, 6 );

}

BOOST_AUTO_TEST_CASE(test_cellular_cellular_operator_parse)
{
  cellular_operator_t cellular_operator;
  memset(&cellular_operator, 0, sizeof(cellular_operator_t));

  const char line[] = "MCC:222, MNC: 88, LAC:55fa, CI:ffff, BSIC:3f, Arfcn:00104, RXLEV:037";

  BOOST_CHECK(cellular_cellular_operator_parse(line, &cellular_operator));

  BOOST_CHECK_EQUAL( cellular_operator.mcc,   222 );
  BOOST_CHECK_EQUAL( cellular_operator.mnc,   88 );
  BOOST_CHECK_EQUAL( cellular_operator.lac,   0x55fa );
  BOOST_CHECK_EQUAL( cellular_operator.ci,    0xffff );
  BOOST_CHECK_EQUAL( cellular_operator.bsic,  0x3f );
  BOOST_CHECK_EQUAL( cellular_operator.arfcn, 104 );
  BOOST_CHECK_EQUAL( cellular_operator.rxlev, 37 );

}

BOOST_AUTO_TEST_SUITE_END( )
