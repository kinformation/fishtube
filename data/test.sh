#! /bin/sh
#
# test.sh
# Copyright (C) 2017 pi <pi@rpi01>
#
# Distributed under terms of the MIT license.
#


DATE=$(date -d"$1" +%s000)
QUERY="select * from temp where timestamp >= $DATE limit 1;"

echo "$QUERY" | sqlite3 fishtube.db
