<?php
  $db = new SQLite3('../data/fishtube.db');
  $sql = "select * from temp_long;";
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
