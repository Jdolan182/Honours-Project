<?php


	//do  query in js then send that string via ajax 
	
	$queryString = "";
	$queryString = stripslashes($_GET['queryString']);

	$username = "jdo"; 
    $password = "jdo";   
    $host = "mysql.cs.stir.ac.uk";
    $database = "jdo";
	$table = "Computers";
	
	$data = "";
	$header = "";
	
	$server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);
	
	// Check connection
	if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
	} 
	
	if ( $queryString !== "" ){

	$counter = 0;
	
	$query = "SELECT * FROM $table WHERE ";
	
	$query .= $queryString;
	
	$query .= " LIMIT 100";
	
	$export = mysql_query ( $query ) or die ( "Sql error : " . mysql_error( ) );

	$fields = mysql_num_fields ( $export );
		
	for ( $i = 0; $i < $fields; $i++ )
{
    
	if($i == $fields - 1){
		$header .= mysql_field_name( $export , $i );
	}
	else{
		$header .= mysql_field_name( $export , $i ) . ",";
	}
}

	//$fields = mysql_num_fields ( $export );
	
	while( $row = mysql_fetch_row( $export ) )
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
		$data = str_replace( "\r" , "" , $data );

	}
	if ( $data == "" )
	{
		echo "(0) Records Found!";                        
	}
	else{
		echo "$header\n$data";
	}

	
?>