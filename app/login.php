<?php
  session_start();
  $_SESSION["username"] = $_POST["Username"];
  $_SESSION["password"] = $_POST["Password"];

  $url_ok = '/fishtube/index.html';
  $url_ng = '/fishtube/login.html';

  if($_SESSION["username"] != $_SESSION["password"]) {
    header("Location: {$url_ng}");
    exit;
  }
  if(isset($_POST["Username"])) {
    setcookie("username", $_POST["Username"], time()+120);
    header("Location: {$url_ok}");
    exit;
  }
?>

