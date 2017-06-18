#include <boost/test/unit_test.hpp>

#include "philae.h"
#include "cellular.h"

BOOST_AUTO_TEST_SUITE (philae_test)

BOOST_AUTO_TEST_CASE(test_Philae_get_position)
{
  char position_str[64];
  Philae p;

  strcpy(position_str, p.get_position());
  BOOST_CHECK(strcmp(position_str, "{\"lac\":0,\"ci\":0}") == 0);
}

BOOST_AUTO_TEST_CASE(test_Philae_position_changed)
{
  Philae p;

  BOOST_CHECK(p.position_changed() == false);

  p.set_position(1234, 5678);
  BOOST_CHECK(p.position_changed() == true);

  p.set_position(1234, 5678);
  BOOST_CHECK(p.position_changed() == false);
}

BOOST_AUTO_TEST_CASE(test_Philae_operator_list_to_json)
{
  cellular_operator_list_t cell_list = {0};
  cell_list.len = 3;
  cell_list.list[0].mcc   = 222;
  cell_list.list[0].mnc   = 88;
  cell_list.list[0].lac   = 0x55fa;
  cell_list.list[0].ci    = 0xffff;
  cell_list.list[0].bsic  = 0x3f;
  cell_list.list[0].arfcn = 104;
  cell_list.list[0].rxlev = 37;
  cell_list.list[1].mcc   = 333;
  cell_list.list[1].mnc   = 77;
  cell_list.list[1].lac   = 0xaabb;
  cell_list.list[1].ci    = 0xeeee;
  cell_list.list[1].bsic  = 0xf3;
  cell_list.list[1].arfcn = 205;
  cell_list.list[1].rxlev = 73;
  cell_list.list[2].mcc   = 444;
  cell_list.list[2].mnc   = 88;
  cell_list.list[2].lac   = 0xccdd;
  cell_list.list[2].ci    = 0xdddd;
  cell_list.list[2].bsic  = 0xa6;
  cell_list.list[2].arfcn = 306;
  cell_list.list[2].rxlev = 66;

  Philae p;

  const char expected[] = "{\"len\":3,\"list\":[{\"mcc\":222,\"mnc\":88,\"lac\":22010,\"ci\":65535,\
\"bsic\":63,\"arfcn\":104,\"rxlev\":37},{\"mcc\":333,\"mnc\":77,\"lac\":43707,\"ci\":61166,\
\"bsic\":243,\"arfcn\":205,\"rxlev\":73},{\"mcc\":444,\"mnc\":88,\"lac\":52445,\"ci\":56797,\
\"bsic\":166,\"arfcn\":306,\"rxlev\":66}]}";

  BOOST_CHECK_EQUAL( p.operator_list_to_json(cell_list), expected);
}

BOOST_AUTO_TEST_SUITE_END( )
