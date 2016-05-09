#include <boost/test/unit_test.hpp>

#include "philae.h"

BOOST_AUTO_TEST_SUITE (phylae_test)

BOOST_AUTO_TEST_CASE(tc_01_get_position)
{
  Philae p;
  BOOST_CHECK(p.get_position() == 10);
}

BOOST_AUTO_TEST_SUITE_END( )
