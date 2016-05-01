/* Copyright (c) 2016 Trevaling */

#if defined(PARTICLE)
  #include "application.h"
#else
  #include <stdio.h>
#endif
#include "philae.h"

#if defined(PARTICLE)
  #define philae_printf(...) Serial.printf(__VA_ARGS__)
  #define philae_available Serial.available() > 0
  #define philae_getchar Serial.read
#else
  #define philae_printf(...) printf(__VA_ARGS__)
  #define philae_available true
  #define philae_getchar getchar
#endif

Philae::Philae(void)
{
  last_position = 10;
}

Philae::~Philae(void)
{

}

void Philae::setup(void)
{
#if defined(PARTICLE)
  Serial.begin(9600);
#endif
}

void Philae::loop(void)
{
  int incomingByte = 0;

  if (philae_available)
  {
    // Read the incoming byte:
    incomingByte = philae_getchar();

    // Say what you got:
    philae_printf("Hello! I received: %d \r\n", incomingByte);

    // Say where philae is
    philae_printf("Philae position: %d \r\n", this->get_position());

  }
}

int Philae::get_position()
{
  return last_position;
}
