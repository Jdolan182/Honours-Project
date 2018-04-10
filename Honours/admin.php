<?php

	$username = "jdo"; 
    $password = "jdo";   
    $host = "mysql.cs.stir.ac.uk";
    $database = "jdo";
	$table = "preferences";
	
	
	$connection = mysqli_connect($host, $username, $password, $database);
  
	
	
	$results = mysqli_query($connection, "SELECT * FROM preferences");
	
	while($row = mysqli_fetch_array($results)) {
		$username =  $row['username']; 
		$password = $row['pword'];;   
		$host = $row['host'];
		$database = $row['db'];
		$table = $row['dataTable'];
	}
?>
<html>
<!DOCTYPE html>
<meta charset='utf-8'>
<html ng-app="visualSearch">
  <head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel='stylesheet' href='/~jdo/Honours/assets/css/style.css'>
<link rel='stylesheet' href='/~jdo/Honours/assets/css/d3.slider3.css'>
<link rel='stylesheet' href='/~jdo/Honours/assets/css/myCSS7.css'>
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
	
  </head>

  <body>
	<div id="background">
	<div id="navbar" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
				</button>
				<a class="navbar-brand" href="">
					<span class="glyphicon glyphicon-chevron-left"></span>
				</a>
				<a class="navbar-brand" href="">Home</a>
			</div>
		<div class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-left">
				<li><a href="/~jdo/Honours/visualSearch4.php">Search</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-left">
				<li><a href="/~jdo/Honours/admin.php">Admin</a></li>
			</ul>
		</div>
		</div>
	</div>

	</br>
	</br>
	</br>
	
	<div id="wrapper">
		<div>
		<div id ="formDiv" class="formDiv">
			Database details
			<hr>
			</br>
			<form class="adminForm" action="/~jdo/Honours/assets/php/saveDetails.php" method="post">
				<table id="formTable" class="formTable">
				<tr class="formTableRow">
					<td class="formTableCol">UserName:</td>
					<td class="formTableCol"><input type="text" name="uname" placeholder="Enter Username" value="<?php echo $username?>" required><br></td>
				</tr>
				<tr class="formTableRow">
					<td class="formTableCol">Password:</td>
					<td class="formTableCol"><input type="password" name="pword" placeholder="Enter Password" required><br></td>
				</tr>
				<tr class="formTableRow">
					<td class="formTableCol">Host:</td> 
					<td class="formTableCol"><input type="text" name="host" placeholder="Enter Host" value="<?php echo $host?>" required><br></td>
				</tr>
				<tr class="formTableRow">	
					<td class="formTableCol">Database:</td> 
					<td class="formTableCol"><input type="text" name="db" placeholder="Enter Database" value="<?php echo $database?>" required><br></td>
				</tr>
				<tr class="formTableRow">
					<td class="formTableCol">Table:</td> 
					<td class="formTableCol"><input type="text" name="table" placeholder="Enter Table" value="<?php echo $table?>" required><br></td>
				</tr>
				<tr class="formTableRow">
					<td class="formTableCol" ><input type="submit" value="Save Details"></td>
				</tr>
			</form>
	
		</div>
	</div>

  </body>
  

  
</html>