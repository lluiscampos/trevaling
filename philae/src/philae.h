/* Copyright (c) 2016 Trevaling */

#ifndef PHILAE_H
#define PHILAE_H

enum philae_dev_command_t
{
  PHILAE_DEV_NETWORK_REGISTRATION_STATUS = (int)'1'
};

class Philae
{

public:

  Philae(void);
  ~Philae(void);

  void setup(void);
  void loop(void);

  int get_position();

private:

  void process_dev_command(philae_dev_command_t command_id);
  int last_position;

};

#endif
