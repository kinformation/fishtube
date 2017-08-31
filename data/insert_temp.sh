#!/bin/zsh
cd /home/pi/www/fishtube/data

TIMESTAMP=$(date +'%s000')
TEMP=$(curl -s localhost/webiopi/temperature)

if [ `echo "$TEMP < 0.0" | bc` -eq 1 -o `echo "$TEMP > 50.0" | bc` -eq 1 ]; then
  exit
fi

cat SQL/INSERT_INTO_TEMP.sql        \
  | sed "s/%TIMESTAMP%/$TIMESTAMP/" \
  | sed "s/%TEMP%/$TEMP/"           \
  | sqlite3 fishtube.db

STAT=$(gpio -g read 18)
if [ $STAT -eq 1 -a $(echo "$TEMP > 27" | bc) -eq 1 ]; then
  sudo gpio -g mode 18 out
elif [ $STAT -eq 0 -a $(echo "$TEMP < 25" | bc) -eq 1 ]; then
  sudo gpio -g mode 18 in
fi

exit
