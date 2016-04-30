#
# Philae Makefile
#

SRCDIR := src
TSTDIR := test
BUILDDIR := build
BINDIR := bin
TARGET := $(BINDIR)/philae
TESTER := $(BINDIR)/tester

SRCEXT  := cpp
SOURCES := $(shell find $(SRCDIR) -type f -name *.$(SRCEXT))
OBJECTS := $(patsubst $(SRCDIR)/%,$(BUILDDIR)/%,$(SOURCES:.$(SRCEXT)=.o))
TESTS   := $(shell find $(TSTDIR) -type f -name *.$(SRCEXT))
TESTOBJ := $(patsubst $(TSTDIR)/%,$(BUILDDIR)/%,$(TESTS:.$(SRCEXT)=.o))

CC := g++
CFLAGS := -g -Wall --coverage

$(TARGET): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) $(OBJECTS) -o $(TARGET)

$(BUILDDIR)/%.o: $(SRCDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

$(BUILDDIR)/%.o: $(TSTDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -I$(SRCDIR) -o $@ $<

$(TESTER): $(TESTOBJ) $(BUILDDIR)/philae.o
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) $(TESTOBJ) $(BUILDDIR)/philae.o -o $(TESTER)

clean:
	@echo " Cleaning...";
	$(RM) -r $(BUILDDIR) $(TARGET) coverage coverage.info

lint:
	vera++ --error $(SRCDIR)/*

test: $(TESTER)
	./$(TESTER)
	lcov --capture --directory $(BUILDDIR) --base-directory . --output-file coverage.info
	lcov --remove coverage.info "/usr/include/*" "/test/*" -o coverage.info

coverage: test
	genhtml coverage.info --output-directory coverage

particle:
	particle compile electron src/main.ino src/philae.h src/philae.cpp --saveTo firmware.bin
	sudo particle flash --serial firmware.bin

.PHONY: clean test coverage particle
