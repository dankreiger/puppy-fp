#!/usr/bin/env sh

echo "┏━━━ 🕵️‍♀️ lint ━━━━━━━"
eslint src --quiet --ext .ts --ignore **/*.spec.ts
