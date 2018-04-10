<?php


	//do  query in js then send that string via ajax 
	
	$queryString = "";
	$queryString = stripslashes($_GET['query']);
	$header = $_GET['header'];
	
	$username = "jdo"; 
    $password = "jdo";   
    $host = "mysql.cs.stir.ac.uk";
    $database = "jdo";
	$table = "preferences";
	
	
	$connection = mysqli_connect($host, $username, $password, $database);
	
	// Check connection
	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	} 
	
	$results = mysqli_query($connection, "SELECT * FROM preferences");
	
	while($row = mysqli_fetch_array($results)) {
		$username =  $row['username']; 
		$password = $row['pword'];;   
		$host = $row['host'];
		$database = $row['db'];
		$table = $row['dataTable'];
	}
	
	$data = "";
	
	
	$connection = mysqli_connect($host, $username, $password, $database);
   
	
	// Check connection
	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	} 
	
	if ( $queryString != "" ){
	

	$query = "SELECT DISTINCT $header FROM $table WHERE ";
	
	$query .= $queryString;
	
	
	$export = mysqli_query ($connection, $query ) or die ( "Sql error : " . mysqli_error($connection) );
	
	}
	else{
		$query = "SELECT DISTINCT $header FROM $table";
		
		$export = mysqli_query ($connection, $query ) or die ( "Sql error : " . mysqli_error($connection) );
	}

	while( $row = mysqli_fetch_row( $export ) )
	{
		$i = 0;
		$len = count($row);
		$line = '';
		
		foreach( $row as $value )
		{                                            
			if ( ( !isset( $value ) ) || ( $value == "" ) )
        {
            $value = "\t";
        }
        else
        {
			if ($i == $len - 1) {
				$value = $value ;
			}
			else{
				$value = $value . ",";
			}
			
        }
		$line .= $value;
		$i++;
		
	}
		$data .= trim( $line ) . "\n";
	}
		$data = preg_replace('#\n+#',',',trim($data));

	
	if ( $data == "" )
	{
		echo "(0) Records Found!";                        
	}
	else{
		echo $data;
	}
	
	
?>