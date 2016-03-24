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
CFLAGS := -g -Wall --coverage

$(TARGET): $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) build/main.o build/philae.o -o $(TARGET)

$(BUILDDIR)/%.o: $(SRCDIR)/%.$(SRCEXT)
	@mkdir -p $(BUILDDIR)
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	@echo " Cleaning..."; 
	$(RM) -r $(BUILDDIR) $(TARGET) coverage

tester: $(OBJECTS)
	@mkdir -p $(BINDIR)
	$(CC) $(CFLAGS) -c -I$(SRCDIR) -o $(BUILDDIR)/test_philae.o test/test_philae.cpp
	$(CC) $(CFLAGS) -I$(SRCDIR) build/test_philae.o build/philae.o -o $(TESTER)

test: tester
	./$(TESTER)
	lcov --capture --no-external --directory . --output-file coverage.info
	genhtml coverage.info --output-directory coverage

.PHONY: clean

