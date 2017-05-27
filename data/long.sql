insert into temp_long(timestamp, temp) select timestamp, temp from temp where timestamp/100000%36 = 0;
