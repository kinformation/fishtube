<?php

  $url_ok = '/fishtube/index.html';
  $url_ng = '/fishtube/login.html';

  if(isset($_POST["Username"]) && $_POST["Username"] == $_POST["Password"]) {
    session_start();
    $_SESSION["username"] = $_POST["Username"];
    $_SESSION["password"] = $_POST["Password"];
    setcookie("username", $_POST["Username"], time()+120);
    header("Location: {$url_ok}");
    exit;
  }

  header("Location: {$url_ng}");
  exit;
?>

