#!/usr/bin/env sh

node --expose-gc ./node_modules/.bin/jest --runInBand --coverage --verbose --forceExit --detectOpenHandles --ci