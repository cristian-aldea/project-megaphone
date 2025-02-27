#!/usr/bin/env bash

git checkout main
git branch -D gh-pages
git checkout -b gh-pages

rm -rf docs
mkdir docs
echo "www.cristianaldea.com" > docs/CNAME
git add docs/
git commit -m "Create CNAME"

npm run build
mv dist/* docs
git add docs/
git commit -m "Deploy website"

git push -u origin gh-pages --force-with-lease
git checkout main
