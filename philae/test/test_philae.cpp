#include <boost/test/unit_test.hpp>

#include "philae.h"

BOOST_AUTO_TEST_SUITE (phylae_test)

BOOST_AUTO_TEST_CASE(tc_01_get_position)
{
  char position_str[64];
  Philae p;

  strcpy(position_str, p.get_position());
  BOOST_CHECK(strcmp(position_str, "{\"lac\":0,\"ci\":0}") == 0);
}

BOOST_AUTO_TEST_SUITE_END( )
