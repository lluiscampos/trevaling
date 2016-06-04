/* Copyright (c) 2016 Trevaling */

#include "philae.h"
#include "particle_mock.h"

/* Define global mocks */
CellularClass Cellular;
SerialClass   Serial;
ParticleClass Particle;

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
