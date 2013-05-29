#!/bin/bash
DIR="./scripts/*"
DIRTO="html-log"
JSDIR="js-log"

getURI() {
  PATH1="./$DIRTO/${2:2}"
  URI="${1:5}"
  [ "${1:0:5}" == '#URI=' ] && echo "Backing up $2" && wget "$URI" -o dumpfile -O "$PATH1.html" && ./wkhtmltopdf -l ${URI/www/mstage} "$PATH1.pdf" && saveJS "$PATH1.html" $(grep -o "Location: [^ ]*" dumpfile | grep -o " .*")
}

saveJS() {
  echo -e "$1 has:\033[36m"
  for SRC in $(grep -o --line-buffered '<script.*src="[^"]*"[^>]*>' $1 | grep -o ' src="[^"]*"' | grep -o '"[^"]*"'); do
    src=${SRC//\"}
    ( [ ${src:0:4} == 'http' ] ) && wget "$src" -O "$JSDIR/${src##*/}" 
    ( [ ${src:0:2} == '//' ] ) && wget "${src}" -O "$JSDIR/${src##*/}"
    ( [ ${src:0:1} == '/' ] && [ ${src:0:2} != '//' ] ) && wget "$2$src" -O "$JSDIR/${src##*/}"
    ( [ ${src:0:1} != '/' ] && [ ${src:0:4} != 'http' ] ) && wget "$2${src}" -O "$JSDIR/${src##*/}"
    echo -e "\033[33m$src saved!\033[36m"
    echo -e ""
  done
  echo -e "\033[m"
}

backup() {
  echo -e "\033[37mStarting Backup initializing directories\033[m"
  mkdir -p $DIRTO 
  mkdir -p $JSDIR
  echo -e "\033[32mDirectories Created!\033[m"
  for f in $*; do
    [ ${f: -3} == '.ts' ] && [ -f "$f" ] && getURI $(head -1 "$f") "$f" && echo -e "\033[32m$f successfully backed up!\033[m"
    [ -d "$f" ] && mkdir -p "$DIRTO/$f" && echo -e "\033[33mEntering $f\033[m" && backup "$f/*"
  done
}
backup $DIR
