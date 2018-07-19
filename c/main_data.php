<?php
  if($conn->check_connect()) {
    
  }
  else {
    $page = "e_connect_fail";
    $title = "server error";
  }
?>