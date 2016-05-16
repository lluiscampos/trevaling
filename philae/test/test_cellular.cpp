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

BOOST_AUTO_TEST_SUITE_END( )
