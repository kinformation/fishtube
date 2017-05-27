#!/bin/sh
cd /home/pi/www/fishtube/data

TIMESTAMP=`date +'%s000'`
TEMP=`curl -s localhost/webiopi/temperature`

sqlite3 fishtube.db <<EOL
insert into temp values($TIMESTAMP, $TEMP);
EOL
