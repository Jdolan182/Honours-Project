<?php

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
	
	
	$header = "";
	$data = "";

    $connection = mysqli_connect($host, $username, $password, $database);

	// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
} 

$select = "SELECT * FROM $table limit 100";

$export = mysqli_query ($connection, $select ) or die ( "Sql error : " . mysqli_error($connection) );

$fields = mysqli_num_fields ( $export );

for ( $i = 0; $i < $fields; $i++ )
{
    
	if($i == $fields - 1){
		$colObj = mysqli_fetch_field_direct($export, $i);
		$header .= $colObj->name;
	}
	else{
		$colObj = mysqli_fetch_field_direct($export, $i);
		$header .= $colObj->name . ",";
	}
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
$data = str_replace( "\r" , "" , $data );


if ( $data == "" )
{
    $data = "\n(0) Records Found!\n";                        
}

echo "$header\n$data";

?>