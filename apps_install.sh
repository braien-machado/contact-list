#!/bin/bash

printf "\n> Installing front-end\n"
frontFolder="./app/frontend"
cacheFolderFront="/tmp/frontend-cache"
rm -rf $cacheFolderFront
npm_config_loglevel=silent npm i --prefix ${frontFolder} --cache $cacheFolderFront

printf "\n> Installing back-end\n"
backFolder="./app/backend"
cacheFolderBack="/tmp/backend-cache"
rm -rf $cacheFolderBack
npm_config_loglevel=silent npm i --prefix ${backFolder} --cache $cacheFolderBack