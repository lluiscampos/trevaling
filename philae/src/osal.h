/* Copyright (c) 2016 Trevaling */

#ifndef OSAL_H
#define OSAL_H

/* OS Abstraction Layer */

#if defined(PARTICLE)
  #define philae_printf(...) Serial.printf(__VA_ARGS__)
  #define philae_available Serial.available() > 0
  #define philae_getchar Serial.read
#else
  #define philae_printf(...) printf(__VA_ARGS__)
  #define philae_available true
  #define philae_getchar getchar
#endif

#endif
