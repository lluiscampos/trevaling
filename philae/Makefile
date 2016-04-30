#
# Philae Makefile
#

CC := g++
SRCDIR := src
BUILDDIR := build
BINDIR := bin
TARGET := $(BINDIR)/philae
TESTER := $(BINDIR)/tester

SRCEXT := cpp
SOURCES := $(shell find $(SRCDIR) -type f -name *.$(SRCEXT))
HEADERS := $(shell find $(SRCDIR) -type f -name *.h)
OBJECTS := $(patsubst $(SRCDIR)/%,$(BUILDDIR)/%,$(SOURCES:.$(SRCEXT)=.o))
CFLAGS := -g -Wall --coverage

$(TARGET): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) build/main.o build/philae.o -o $(TARGET)

$(BUILDDIR)/%.o: $(SRCDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	@echo " Cleaning...";
	$(RM) -r $(BUILDDIR) $(TARGET) coverage coverage.info

$(TESTER): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) -c -I$(SRCDIR) -o $(BUILDDIR)/test_philae.o test/test_philae.cpp
	$(CC) $(CFLAGS) -I$(SRCDIR) build/test_philae.o build/philae.o -o $(TESTER)

lint:
	cpplint $(SOURCES) $(HEADERS)

test: $(TESTER)
	./$(TESTER)
	lcov --capture --directory $(BUILDDIR) --base-directory . --output-file coverage.info
	lcov --remove coverage.info "/usr/include/*" -o coverage.info

coverage: test
	genhtml coverage.info --output-directory coverage

particle:
	particle compile electron src/main.ino src/philae.h src/philae.cpp --saveTo firmware.bin
	sudo particle flash --serial firmware.bin

.PHONY: clean test coverage particle
