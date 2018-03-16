#!/bin/bash

cp -f CNAME build/CNAME
cd build
git init
git config user.name "Travis-CI"
git config user.email "travis-ci@gnucitizen.org"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@github.com/gnucitizen/gnucitizen-blog" master:gh-pages > /dev/null 2>&1
