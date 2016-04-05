
#include "philae.h"

Philae p;
int incomingByte = 0; // for incoming serial data

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available() > 0) {
    // Read the incoming byte:
    incomingByte = Serial.read();

    // Say what you got:
    Serial.print("Hello! I received: ");
    Serial.println(incomingByte, DEC);

    // Say where philae is
    Serial.print("Philae position: ");
  	Serial.println(p.get_position());
  }
}
