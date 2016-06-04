/* Copyright (c) 2016 Trevaling */

#ifndef PARTICLE_MOCK
#define PARTICLE_MOCK

#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <stdarg.h>

/* Mock for Serial
   See https://github.com/WiringProject/Wiring/blob/master/framework/cores/AVR8Bit/WHardwareSerial.h
 */
class SerialClass
{
  public:
    inline void begin(const uint32_t baud = 9600, const uint8_t data_bits = 8,
               const uint8_t stop_bits = 1, const uint8_t parity = 0)
    {
      return;
    }
    inline int available(void)
    {
      return 1;
    }
    inline int read(void)
    {
      return getchar();
    }
    inline int printf(const char *format, ...)
    {
      int retval;
      va_list args;
      va_start(args, format);
      retval = vprintf(format, args);
      va_end(args);
      return retval;
    }
};
extern SerialClass Serial;

/* Cellular.command() return values */
#define NOT_FOUND    (0)
#define WAIT         (-1) // TIMEOUT
#define RESP_OK      (-2)
#define RESP_ERROR   (-3)
#define RESP_PROMPT  (-4)
#define RESP_ABORTED (-5)

/* Cellular.command() callback types */
#define TYPE_UNKNOWN    (0x000000)
#define TYPE_OK         (0x110000)
#define TYPE_ERROR      (0x120000)
#define TYPE_RING       (0x210000)
#define TYPE_CONNECT    (0x220000)
#define TYPE_NOCARRIER  (0x230000)
#define TYPE_NODIALTONE (0x240000)
#define TYPE_BUSY       (0x250000)
#define TYPE_NOANSWER   (0x260000)
#define TYPE_PROMPT     (0x300000)
#define TYPE_PLUS       (0x400000)
#define TYPE_TEXT       (0x500000)
#define TYPE_ABORTED    (0x600000)

/* Mock for Cellular
   See https://github.com/spark/firmware/blob/develop/wiring/inc/spark_wiring_cellular.h
 */
class CellularClass
{
  public:
    template<typename... Targs>
    inline int command(const char* format, Targs... Fargs)
    {
      return RESP_OK;
    }

    template<typename... Targs>
    inline int command(uint32_t timeout_ms, const char* format, Targs... Fargs)
    {
      return RESP_OK;
    }

    template<typename T, typename... Targs>
    inline int command(int (*cb)(int type, const char* buf, int len, T* param),
            T* param, const char* format, Targs... Fargs)
    {
      return RESP_OK;
    }

    template<typename T, typename... Targs>
    inline int command(int (*cb)(int type, const char* buf, int len, T* param),
            T* param, uint32_t timeout_ms, const char* format, Targs... Fargs)
    {
      return RESP_OK;
    }
};
extern CellularClass Cellular;

/* Particle.publish() event types */
#define PUBLIC  0
#define PRIVATE 1
#define NO_ACK  2

/* Mock for Particle
   See https://github.com/spark/firmware/blob/develop/wiring/inc/spark_wiring_cloud.h
 */
class ParticleClass
{
  public:
    inline bool publish(const char *eventName, uint8_t eventType=PUBLIC)
    {
      return true;
    }

    inline bool publish(const char *eventName, const char *eventData, uint8_t eventType=PUBLIC)
    {
      return true;
    }

    inline bool publish(const char *eventName, const char *eventData, uint8_t f1, uint8_t f2)
    {
      return true;
    }
};
extern ParticleClass Particle;

/* Other mocks */
inline void delay(unsigned long)
{
  return;
}

#endif
