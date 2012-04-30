<?php
$name = $_GET['u'];
$user = "root";
$pass = "";
$server = "localhost";
$db = "datab";
mysql_connect($server,$user,$pass) or die("Can not connect");
mysql_select_db($db) or die("No such database");
$query = "SELECT * FROM `users` where `name` = '$name'";
$result = mysql_query($query);
if (mysql_num_rows($result) == 0)
	{ echo "<font color=green>Available!</font>"; } else { echo "<font color=red>Not Available :( </font>"; }
?>