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
OBJECTS := $(patsubst $(SRCDIR)/%,$(BUILDDIR)/%,$(SOURCES:.$(SRCEXT)=.o))
CFLAGS := -g -Wall

$(TARGET): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) build/main.o build/philae.o -o $(TARGET)

$(BUILDDIR)/%.o: $(SRCDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	@echo " Cleaning..."; 
	@echo " $(RM) -r $(BUILDDIR) $(TARGET)"; $(RM) -r $(BUILDDIR) $(TARGET)

tester: $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) build/test_philae.o build/philae.o -o $(TESTER)

.PHONY: clean

