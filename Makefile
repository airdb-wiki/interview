.PHONY: test

all: run

run:
	hugo server --minify --theme book

sub:
	git submodule update --init

build:
	hugo -D --minify
