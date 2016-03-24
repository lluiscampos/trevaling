
#include <stdio.h>
#include "philae.h"

Philae::Philae(void)
{
	last_position = 10;
}

Philae::~Philae(void)
{
}

int Philae::get_position()
{
    return last_position;
}

