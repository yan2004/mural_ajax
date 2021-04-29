<?php
require_once("../dbconnect.php");

$sql = "SELECT * FROM geo_data";
$result = $conn->query($sql);
$rows = $result->fetchAll();
echo json_encode($rows);

?>