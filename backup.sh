#!/bin/bash
DIR="./scripts/*"
DIRTO="html-log"
JSDIR="js-log"

NEWBAR="\033[35m*****************************************************\033[m"

getURI() {
  PATH1="./$DIRTO/${2:2}"
  URI="${1:5}"
  [ "${1:0:5}" == '#URI=' ] && echo -e "\n$NEWBAR"  && echo "Backing up $2" && wget -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36" "$URI" -o dumpfile -O "$PATH1.html" && ./srcbackup/wkhtmltopdf --disable-javascript -q -l ${URI/www/mstage} "$PATH1.pdf" && saveJS "$PATH1.html" $(grep "Resolving" dumpfile -B 1 | tail -2 | head -1 | grep -o "http.*")
}

saveJS() {
  echo -e "\033[36m$2 has:\033[m"
  for SRC in $(grep -o --line-buffered '<script.*src="[^"]*"[^>]*>' $1 | grep -o ' src="[^"]*"' | grep -o '"[^"]*"'); do
    src=${SRC//\"}
    ( [ ${src:0:4} == 'http' ] ) && wget -q "$src" -O "$JSDIR/${src##*/}" && echo -e "\033[33m$src saved!\033[36m"
    ( [ ${src:0:2} == '//' ] ) && wget -q "$src" -O "$JSDIR/${src##*/}" && echo -e "\033[33m$src saved!\033[36m"
    ( [ ${src:0:1} == '/' ] && [ ${src:0:2} != '//' ] ) && wget -q "$(echo $2 | sed -e 's@.*//\([^/]*\)/*.*@\1@')$src" -O "$JSDIR/${src##*/}" && echo -e "\033[33m$(echo $2 | sed -e 's@.*//\([^/]*\)/*.*@\1@')$src saved!\033[36m"
    ( [ ${src:0:1} != '/' ] && [ ${src:0:4} != 'http' ] ) && wget -q "${2%/*}/$src" -O "$JSDIR/${src##*/}" && echo -e "\033[33m${2%/*}$src saved!\033[36m"
  done
  echo -n -e "\033[m"
}

backup() {
  echo -e "\033[37mStarting Backup initializing directories\033[m"
  mkdir -p $DIRTO 
  mkdir -p $JSDIR
  echo -e "\033[32mDirectories Created!\033[m"
  for f in $*; do
    [ ${f: -3} == '.ts' ] && [ -f "$f" ] && getURI $(head -1 "$f") "$f" && echo -e "\033[32m$f successfully backed up!\033[m" && echo -e "$NEWBAR\n"
    [ -d "$f" ] && mkdir -p "$DIRTO/$f" && echo -e "\033[33mEntering $f\033[m" && backup "$f/*"
  done
}
backup $DIR
exit 0
