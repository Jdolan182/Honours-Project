<?php 


	$username = "jdo"; 
    $password = "jdo";   
    $host = "mysql.cs.stir.ac.uk";
    $database = "jdo";
	$table = "Cars2";
	$count = 0;
	$tableDetails = array(array());
	$numberArr = array();
	$column = array();
	$columnName = "";


    $connection = mysqli_connect($host, $username, $password, $database);
 
	
	// Check connection
	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	} 
	$query = "DESCRIBE $table";
	$results = mysqli_query($connection, $query) or die('Query error: ' . mysqli_error($connection));

while($row = mysqli_fetch_array($results)) {
	echo $row['Type'];
	echo $row['Field'];
	$tableDetails[$count] = $row;
	$count++;
}

	$count = 0;

foreach($tableDetails as $arr){
	
	if(strpos($tableDetails[$count]['Type'], 'int') !== false){
		$numberArr[$count] = 1;
	}
	else{
		$numberArr[$count] = 0;
	}
	echo $numberArr[$count];
	$count++;
}


	$count = 0;
foreach ($numberArr as $num){
	
	$columnName = $tableDetails[$count]['Field'];
	unset($column);
	$colummn = array();
	
	if($num == 1){
		$query = "SELECT MIN(`$columnName`) as min, MAX(`$columnName`) as max FROM $table";
		$results = mysqli_query($connection, $query) or die('Query error: ' . mysqli_error($connection));
		
		$row = mysqli_fetch_array($results);
		$column[] = $row['min'];
		$column[] = $row['max'];

				
	}
	else{
		
		$query = "SELECT DISTINCT `$columnName` FROM $table";
		$results = mysqli_query($connection, $query) or die('Query error: ' . mysqli_error($connection));

		while($row = mysqli_fetch_array($results)) {
			$column[]=$row[$columnName];
		}
	}
		foreach($column as $col){
		echo"\n$col";
		}
	$count++;
}

?>
