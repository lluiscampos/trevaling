/* Copyright (c) 2016 Trevaling */

#include "philae.h"

int main (int argc, char *argv[])
{
  Philae p;

  p.setup();

  while (1)
  {
    p.loop();
  }

  return 0;
}
