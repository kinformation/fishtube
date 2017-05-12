#!/bin/sh

sqlite3 fishlive.db <<EOL
create table temp(timestamp INTEGER, temp REAL);
EOL
