<?php
  class connection {
    public $conn;
    function __construct() {
      include_once("config.php");
      $this->conn = new mysqli($servername, $username, $password, $database);
    }
    function check_connect() {
      if($this->conn) {
        return 1;
      }
      return 0;
    }
    function insert_into($sql, $lastid) {
      $res = mysqli_query($this->conn, $sql);
      if($res) {
        if($lastid) {
          return $this->conn->insert_id();
        }
        return 1;  
      }
      return 0;
    }
    function select_row($sql, $all) {
      $res = mysqli_query($this->conn, $sql);
      if($res && mysqli_num_rows($res)) {
        if($all) {
          return mysqli_fetch_all($res, MYSQLI_ASSOC);
        }
        return mysqli_fetch_assoc($res);
      }
      return 0;
    }
  }
?>