/* Copyright (c) 2016 Trevaling */

#include <stdio.h>
#include "philae.h"

int main (int argc, char *argv[])
{
  Philae p;

  printf("Philae position: %d\n", p.get_position());

  return 0;
}
