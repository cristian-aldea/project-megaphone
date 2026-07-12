#!/usr/bin/env bash
set -euo pipefail

# CNAME lives in public/, so vite build copies it into dist/

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree is dirty. Commit or stash changes before deploying." >&2
  exit 1
fi

git checkout main
npm run build

git branch -D gh-pages 2>/dev/null || true
git checkout -b gh-pages

rm -rf docs
mkdir docs
cp -R dist/. docs/
git add docs/
git commit -m "Deploy website"

git push -u origin gh-pages --force-with-lease
git checkout main
