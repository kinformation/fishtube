INSERT INTO
  temp_long(timestamp, temp)
SELECT
  timestamp, temp
FROM
  temp
WHERE
  timestamp/100000%36 = 0
  AND timestamp > ( SELECT MAX(timestamp) FROM temp_long )
;
