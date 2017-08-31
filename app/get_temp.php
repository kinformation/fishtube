<?php
  $db = new SQLite3('../data/fishtube.db');
  $time_1w_before = time() - 7 * 24 * 60 * 60;
  $sql = "select * from temp where timestamp > " . $time_1w_before*1000;
  $res = $db->query($sql);

  $data = array();
  while($row = $res->fetchArray()) {
    $data[] = array(
      'x'=>$row['timestamp'],
      'y'=>$row['temp']
    );
  }
  $db->close();

  header('Content-type: application/json');
  echo json_encode($data, JSON_NUMERIC_CHECK);

  exit();
?>
