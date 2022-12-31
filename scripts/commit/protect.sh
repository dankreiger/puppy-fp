#!/bin/sh

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" = "main" ]; then
  echo "You can't commit to main!"
  exit 1
fi

echo "Committing to $CURRENT_BRANCH"
