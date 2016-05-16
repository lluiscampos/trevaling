/* Copyright (c) 2016 Trevaling */

#ifndef PHILAE_H
#define PHILAE_H

enum philae_dev_command_t
{
  PHILAE_DEV_NETWORK_REGISTRATION_STATUS = (int) '1',

  PHILAE_DEV_PRINT_CURRENT_POSITION      = (int) '5',
  PHILAE_DEV_PUBLISH_CURRENT_POSITION    = (int) '6'
};

struct philae_position_t
{
  unsigned int      local_area_code;
  long unsigned int cell_id;
};

class Philae
{

public:

  Philae(void);
  ~Philae(void);

  void setup(void);
  void loop(void);

  const char* get_position();
  void set_position(unsigned int local_area_code, long unsigned int cell_id);
  void retreive_and_update_position();
  bool position_changed();

private:

  void process_dev_command(philae_dev_command_t command_id);
  philae_position_t current_position;
  philae_position_t last_position;

};

#endif
