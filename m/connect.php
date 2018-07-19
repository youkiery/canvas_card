<?php
  include_once("config.php");
  class connection {
    public $conn;
    function __construct() {
      try {
        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      }
      catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
    }
    function insert_into($sql) {
      $this->conn->exec($sql);
    }
  }
?>