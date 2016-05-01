/* Copyright (c) 2016 Trevaling */

#ifndef PHILAE_H
#define PHILAE_H

class Philae
{

public:

  Philae(void);
  ~Philae(void);

  void setup(void);
  void loop(void);

  int get_position();

private:

  int last_position;

};

#endif
