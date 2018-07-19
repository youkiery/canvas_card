<?php
  include_once("m/connect.php");
  session_start();
  $conn = new connection();
  $page = "home";
  $title = "Card Canvas";
  include_once("c/main_data.php");
  include_once("v/header.php");
  include_once("v/$page.php");
  include_once("v/footer.php");
?>
