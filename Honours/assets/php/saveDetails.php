<?php

	$username = $_POST['uname'];
	$password = $_POST['pword'];
	$host = $_POST['host'];
	$db = $_POST['db'];
	$table = $_POST['table'];
	
	$connection = mysqli_connect($host, $username, $password, $db);
    //$connection = mysql_select_db($db, $server);
	
	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	} 
	
	
	if(mysql_num_rows(mysqli_query("SHOW TABLES LIKE 'preferences'"))==1){
		
		//echo "Table exists";
		mysqli_query($connection, "DELETE FROM preferences");
	}
	else{
		//echo "Table does not exist";
		$sql = "CREATE TABLE preferences(
			username VARCHAR(20) NOT NULL,
			pword VARCHAR(20) NOT NULL,
			host VARCHAR(20) NOT NULL,
			db VARCHAR(20) NOT NULL,
			dataTable VARCHAR(20) NOT NULL
		)";
		mysqli_query($connection, $sql);
	}
	
	mysqli_query($connection, "INSERT INTO preferences (username, pword, host, db, dataTable)
				VALUES ('".$username."', '".$password."', '".$host."', '".$db."', '".$table."')");
				
	header('Location: /~jdo/Honours/detailsSaved.html');
?>