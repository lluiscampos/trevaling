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
SOURCES := $(shell find $(SRCDIR) -type f -name *.$(SRCEXT) -not -name main.*)
HEADERS := $(shell find $(SRCDIR) -type f -name *.h)
OBJECTS := $(patsubst $(SRCDIR)/%,$(BUILDDIR)/%,$(SOURCES:.$(SRCEXT)=.o))
TESTS   := $(shell find $(TSTDIR) -type f -name *.$(SRCEXT))
TESTOBJ := $(patsubst $(TSTDIR)/%,$(BUILDDIR)/%,$(TESTS:.$(SRCEXT)=.o))

CC := g++
CFLAGS := -std=c++11 -g -Wall --coverage

VERSION := $(shell git describe --tags --always --dirty)

$(TARGET): $(OBJECTS) $(HEADERS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) -c -o $(BUILDDIR)/main.o $(SRCDIR)/main.cpp
	$(CC) $(CFLAGS) $(OBJECTS) $(BUILDDIR)/main.o -o $(TARGET)

$(BUILDDIR)/%.o: $(SRCDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

$(BUILDDIR)/%.o: $(TSTDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -I$(SRCDIR) -o $@ $<

$(TESTER): $(TESTOBJ) $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) $(TESTOBJ) $(OBJECTS) -o $(TESTER)

clean:
	@echo " Cleaning...";
	$(RM) -r $(BUILDDIR) $(TARGET) coverage coverage.info

lint:
	vera++ --error $(SRCDIR)/*

test: $(TESTER)
	./$(TESTER)
	lcov --capture --directory $(BUILDDIR) --base-directory . --output-file coverage.info
	lcov --remove coverage.info "/usr/include/*" "/test/*" -o coverage.info 1>/dev/null

coverage: test
	genhtml coverage.info --output-directory coverage

particle:
	particle compile electron --target 0.6.2 src/main.ino $(SOURCES) $(HEADERS) --saveTo $(BINDIR)/firmware_$(VERSION).bin

.PHONY: clean test coverage particle
