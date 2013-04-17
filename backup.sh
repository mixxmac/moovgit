#!/bin/bash
DIR="./scripts/*"
DIRTO="html-log"

getURI() {
  PATH1="./$DIRTO/${2:2}"
  URL="${1:5}"
  [ "${1:0:5}" == '#URI=' ] && echo "Backing up $2" && curl "$URL" > "$PATH1.html" && ./wkhtmltopdf -l ${URL/www/mstage} "$PATH1.pdf"   
}

backup() {
  mkdir -p $DIRTO 
  for f in $*; do
    [ ${f: -3} == '.ts' ] && [ -f "$f" ] && getURI $(head -1 "$f") "$f"
    [ -d "$f" ] && mkdir -p "$DIRTO/$f" && echo "Entering $f" && backup "$f/*.ts"
  done
}
backup $DIR
