<script type="text/javascript" src="/~jdo/Honours/assets/js/jquery-3.2.1.min.js"></script>  	
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel='stylesheet' href='/~jdo/Honours/assets/css/style.css'>
<link rel='stylesheet' href='/~jdo/Honours/assets/css/d3.slider3.css'>
<script type="text/javascript" src="/~jdo/Honours/assets/js/makeFilters2.js"> </script>
<link rel='stylesheet' href='/~jdo/Honours/assets/css/myCSS7.css'>
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
<script data-require="angular.js@1.2.x" src="https://code.angularjs.org/1.2.10/angular.js" data-semver="1.2.10"></script>
<script src="/~jdo/Honours/assets/js/overlay2.js"></script>
	
<script>
function sortSelect(select) {
    $("#" + select).html($("#" + select + " option").sort(function(a, b) {
        return a.text == b.text ? 0 : a.text < b.text ? -1 : 1
    }))
}

function filterBox() {

    var searchBox = this.id;
	var selectBoxNum = searchBox.substring(searchBox.length - 1)
	var selectBox = "selectbox" + selectBoxNum
  
    var input, filter, ul, li, a, i;
    input = document.getElementById(searchBox);
    filter = input.value.toUpperCase();
    div = document.getElementById(selectBox);
    a = div.getElementsByTagName("option");;
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}
</script>
<?php 

	$username = "jdo"; 
    $password = "jdo";   
    $host = "mysql.cs.stir.ac.uk";
    $database = "jdo";
	$table = "preferences";
	
	
	$server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);
	
	
	$results = mysql_query("SELECT * FROM preferences");
	
	while($row = mysql_fetch_array($results)) {
		$username =  $row['username']; 
		$password = $row['pword'];;   
		$host = $row['host'];
		$database = $row['db'];
		$table = $row['dataTable'];
	}
	
	$count = 0;
	$tableDetails = array(array());
	$numberArr = array();
	$column = array();
	$columnName = "";


    $server = mysql_connect($host, $username, $password);
    $connection = mysql_select_db($database, $server);
	
	// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
} 
	$query = "DESCRIBE $table";
	$results = mysql_query($query) or die('Query error: ' . mysql_error());

while($row = mysql_fetch_array($results)) {

	$tableDetails[$count] = $row;
	$count++;
}

	$count = 0;

foreach($tableDetails as $arr){
	
	if(strpos($tableDetails[$count]['Type'], 'int') !== false){
		$numberArr[$count] = 1;
	}
	else if(strpos($tableDetails[$count]['Type'], 'decimal') !== false){
		$numberArr[$count] = 1;
	}
	else{
		$numberArr[$count] = 0;
	}

	$count++;
}

	$count = 0;
	
foreach ($numberArr as $num){
	
	$columnName = $tableDetails[$count]['Field'];
	unset($column);
	$colummn = array();
	
	if($num == 1){
		$query = "SELECT MIN(`$columnName`) as min, MAX(`$columnName`) as max FROM $table";
		$results = mysql_query($query) or die('Query error: ' . mysql_error());
		
		$row = mysql_fetch_array($results);
		$column[] = $row['min'];
		$column[] = $row['max'];

				
	}
	else{
		
		$query = "SELECT DISTINCT `$columnName` FROM $table";
		$results = mysql_query($query) or die('Query error: ' . mysql_error());

		while($row = mysql_fetch_array($results)) {
			$column[]=$row[$columnName];
		}
	}


?>
	<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="/~jdo/Honours/assets/js/d3.slider.js"></script>
	
	
	<script>
		var column = [];
		var columnName;
		var num;
		var count = 0;
		var counter = 0;
		<?php
		foreach($column as $col){
		?>
		column[count] = '<?php echo $col?>';
		columnName = '<?php echo $columnName?>';
		num = '<?php echo $num?>';
		count++;
		<?php
		}
		?>
		makeFilters(column, columnName, num, counter);
		counter++;
	</script
	
 <?php
 
 
	$count++;
}

?>
<!DOCTYPE html>
<meta charset='utf-8'>
<html ng-app="visualSearch">
  <head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	

	
  </head>
  <script>
  
	var handle_id;
	var lastElClicked;
	var currentMin;
	var currentMax;
	var num;


window.onmousedown = function (e) {
	
    var el = e.target;
	lastElClicked = el;
	

	if(el.className == "navlink"){
		return;
	}
    else if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();
		var searchBox = el.parentNode.id;
		var whatBox = searchBox.slice(0, -1);
		var selectBoxNum = searchBox.substring(searchBox.length - 1)
		var selectBox = "selectbox" + selectBoxNum
		var selectedBox = "selectboxSelected" + selectBoxNum
        // toggle selection
		if(whatBox == "selectbox"){
			if (el.hasAttribute('selected')){
				el.removeAttribute('selected');
			}
			else{
				el.setAttribute('selected', '');
				$('#' + selectedBox).append(el);
				sortSelect(selectedBox);
				 
			}
					
					var arr = []
					arr = $("#" + selectedBox).val();
					console.log(arr);
					makeQuery(selectBox);
					//getFilterData(arr, searchBox);
		}
		else{
				$('#' + selectBox).append(el);
				el.removeAttribute('selected');
				sortSelect(selectBox);
				num = selectBoxNum;
				var arr = []
				arr = $("#" + selectedBox).val();
				
				
				makeQuery(selectBox);
				
				//getFilterData(arr, selectBox);
		}

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
	else if (el.tagName.toLowerCase() == 'a') {
		//console.log();
		handle_id = el.parentNode.id;
		
	}
}
window.onmouseup = function (e) {
	
	var el = e.target;
	 
	if(el.className == "navlink"){
		return;
	}
	else if (lastElClicked.tagName.toLowerCase() == 'a') {
		makeQuery(lastElClicked.id)
	}
}

function getCheckbox(box){
	
		console.log(box);
		
		if(box.type == 'checkbox'){
		var checkboxes = [];
		for(var i = 0; i < checkboxArr.length; i++){
			for(var j = 0; j < checkboxArr[i][1].length; j++){
				
				if(box.id == checkboxArr[i][1][j]){
					checkboxes = checkboxArr[i][1];
				}
			}
		}
		console.log(box.id);
		makeQuery(checkboxes);
	}
}

function makeQuery(el){
		
	var queryString;
	
	for(var i = 0; i < headerNames.length; i++){
		for(var j = 0; j < checkboxArr.length; j++){
			if(headerNames[i] == checkboxArr[j][0]){
				var arr = checkboxArr[j][1];
				var checkboxes = [];
				var counter = 0;
	
				for(var k = 0; k < arr.length; k++){
					
					var checkboxNum = arr[k].substring(arr[k].length - 1);
					var checkbox = d3.select("#checkbox" + checkboxNum);
					if(checkbox[0][0].checked == true){
						checkboxes[counter] = checkbox[0][0].value;
						counter++;
					}
					
				}
				
			
			if(filterResults[i][0] == headerNames[i]){
				filterResults[i][1] = checkboxes;
			}
			}
		}
	}
	

	for(var i = 0; i < headerNames.length; i++){
		for(var j = 0; j < selectboxes.length; j++){
			if(headerNames[i] == selectboxes[j]){
				var arr = d3.select("#selectboxSelected" + j)[0][0].selectedOptions;
				var selectedOptions = []
				for(var k = 0; k < arr.length; k++){
					selectedOptions[k] = arr[k].value;
				}
				
			if(filterResults[i][0] == headerNames[i]){
				filterResults[i][1] = selectedOptions;
			}
			}
		}
	}
    for(var i = 0; i < headerNames.length; i++){
		for(var j = 0; j < sliders.length; j++){
			if(headerNames[i] == sliders[j]){
				var min = d3.select("#slidertextmin" + j)[0][0].innerHTML;
			    var max = d3.select("#slidertextmax" + j)[0][0].innerHTML;
				
				var minMaxArr = [];
				minMaxArr[0] = min;
				minMaxArr[1] = max;
				
			if(filterResults[i][0] == headerNames[i]){
				filterResults[i][1] = minMaxArr;
			}
			}
		}
	}
	

	queryString = "";
	
	for(var i = 0; i < headerNames.length; i++){
		
	
		if(numberArr[i] == 1){
			//numbers
			queryString = queryString + "`" + headerNames[i] + "`" + " BETWEEN " + filterResults[i][1][0] + " AND " + filterResults[i][1][1];
			queryString = queryString + " AND ";

			
		}
		else if(numberArr[i] == 0){
			//strings
			
				
				if(filterResults[i][1].length == 1){
					queryString = queryString + "`" + headerNames[i] + "`" + " = '" + filterResults[i][1][0] + "'";
					queryString = queryString + " AND ";

				}
				else{
					
					
					for(var j = 0; j < filterResults[i][1].length; j++){
						if(j == 0){
							queryString = queryString + "(";
						}
						queryString = queryString + "`" + headerNames[i] + "`" + " = '" + filterResults[i][1][j] + "'";
						
						if((j + 1) == filterResults[i][1].length) {
							queryString = queryString + ") AND ";
						}
						else{
							queryString = queryString + " OR ";
						}
				}
				
			}
		
		}
	}
	
	if(queryString.substring(queryString.length - 4) == 'AND '){
		queryString = queryString.substring(0, queryString.length - 4);
	}
	
	console.log(queryString);
	getFilterData(el, queryString)
}

function makeNumberQuery(){
	
	queryString = "";
	
	for(var i = 0; i < headerNames.length; i++){
		
	
		if(numberArr[i] == 1){
			//do nothing

			
		}
		else if(numberArr[i] == 0){
			//strings
			
				
				if(filterResults[i][1].length == 1){
					queryString = queryString + "`" + headerNames[i] + "`" + " = '" + filterResults[i][1][0] + "'";
					queryString = queryString + " AND ";

				}
				else{
					
					
					for(var j = 0; j < filterResults[i][1].length; j++){
						if(j == 0){
							queryString = queryString + "(";
						}
						queryString = queryString + "`" + headerNames[i] + "`" + " = '" + filterResults[i][1][j] + "'";
						if((j + 1) == filterResults[i][1].length) {
							queryString = queryString + ") AND ";
						}
						else{
							queryString = queryString + " OR ";
						}
				}
				
			}
		
		}
	}
	
	if(queryString.substring(queryString.length - 4) == 'AND '){
		queryString = queryString.substring(0, queryString.length - 4);
	}
	console.log(queryString);
	return queryString;
}

function editQuery(header){
	
	queryString = "";
	
	for(var i = 0; i < headerNames.length; i++){
		
		if(headerNames[i] != header){
			if(numberArr[i] == 1){
				//numbers
				queryString = queryString + "`" + headerNames[i] + "`" + " BETWEEN " + filterResults[i][1][0] + " AND " + filterResults[i][1][1];
				queryString = queryString + " AND ";

				
			}
			else if(numberArr[i] == 0){
				//strings
				
					
					if(filterResults[i][1].length == 1){
						queryString = queryString + "`" + headerNames[i] + "`" + " = '" + filterResults[i][1][0] + "'";
						queryString = queryString + " AND ";

					}
					else{
						
						
						for(var j = 0; j < filterResults[i][1].length; j++){
							if(j == 0){
								queryString = queryString + "(";
							}
							queryString = queryString + "`" + headerNames[i] + "`" + " = '" + filterResults[i][1][j] + "'";
						
							if((j + 1) == filterResults[i][1].length) {
								queryString = queryString + ") AND ";
							}
							else{
								queryString = queryString + " OR ";
							}
					}
					
				}
			
			}
		}
		else{
			console.log(header);
		}
	}

	if(queryString.substring(queryString.length - 4) == 'AND '){
		queryString = queryString.substring(0, queryString.length - 4);
	}
	
	return queryString;
	
}
function getFilterData(elName, query){
	
	var colName;
	var filterName = [];
	var queryString = query;
	var num;
	var filterNum;
	
	for(var i = 0; i < checkboxArr.length; i++){
		for(var j = 0; j < checkboxArr[i][1].length; j++){
			if(checkboxArr[i][1] == elName){
				colName = checkboxArr[i][0];
			}
		}
	}
	
	for(var i = 0; i < selectboxArr.length; i++){
		if(selectboxArr[i] == elName){
			colName = selectboxes[i];
		}
	}
	

	for(var i = 0; i < sliderArr.length; i++){
		if(sliderArr[i] == elName){
			colName = sliders[i];
		}
	}

	for(var i = 0; i < headerNames.length; i++){
		if(headerNames[i] == colName){
			num = numberArr[i];
		}
	}
	
	for(var i = 0; i < headerNames.length; i++){
		
		if(headerNames[i] != colName){
			
			for(var j = 0; j < checkboxArr.length; j++){
				for(var k = 0; k < checkboxArr[j][0].length; k++){
					
					if(checkboxArr[j][0] == headerNames[i]){
					filterName = checkboxArr[j][1];
					}
				}
			}
				
			for(var j = 0; j < selectboxes.length; j++){
				
				if(selectboxes[j] == headerNames[i]){
				filterName = selectboxArr[j];
				queryString = editQuery(headerNames[i])
				}
			}
		

			for(var j = 0; j < sliders.length; j++){
				if(sliders[j] == headerNames[i]){
				filterName = sliderArr[j];
				}
			}
				
			filterNum = numberArr[i];
				

			if(filterNum == 1){
				queryString = makeNumberQuery();
				if(queryString != ""){
					updateNumFilters(headerNames[i], queryString, filterName, filterNum);
				}
			}
			else if(filterNum == 0){
				if(queryString != ""){
					updateStringFilters(headerNames[i], queryString, filterName, filterNum);
				}
			}
		}
	}	
}

function updateNumFilters(header, query, filter, num) {
	

	var newFilterCSV;
	var newFilterData = []
	var xhttp; 

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			newFilterCSV = this.responseText
			
			newFilterData = newFilterCSV
				.split()                         // Convert to one string per line
				.map(function(lineStr) {
					return lineStr.split(",");   // Convert each line to array (,)
				})
		
					
				changeFilterData(newFilterData, filter, num)
		}	
	};
	xhttp.open("GET", "/~jdo/Honours/assets/php/changeNumFilters.php?query="+query + "&header="+header, true);
	xhttp.send();
}

function updateStringFilters(header, query, filter, num) {
	

	var newFilterCSV;
	var newFilterData = []
	var xhttp; 

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			newFilterCSV = this.responseText
			
			newFilterData = newFilterCSV
				.split()                         // Convert to one string per line
				.map(function(lineStr) {
					return lineStr.split(",");   // Convert each line to array (,)
				})
			
				
			changeFilterData(newFilterData, filter, num)
		}	
	};
	xhttp.open("GET", "/~jdo/Honours/assets/php/changeStringFilters.php?query="+query + "&header="+header, true);
	xhttp.send();
}

function changeFilterData(data, filter, num){
	
	var filterData = []
		filterData = data;
	var filterName = []
	    filterName = filter;
	var filterNum = num;
	
	console.log(data);
	for(var i = 0; i < checkboxArr.length; i++){

			if(checkboxArr[i][1] == filterName){
				console.log("checkbox Change");
				
				for(var j = 0; j < checkboxArr[0].length; j++){
					
				var box = document.getElementById(checkboxArr[i][1][j]);
				
				console.log(box.value)
				if(filterData[0].indexOf(box.value) < 0){
					$('#' + box.id).prop('checked', false);
					$('#' + box.id).prop('enabled', false);
				}
				else{
					$('#' + box.id).prop('checked', true);
					$('#' + box.id).prop('enabled', true);
					
						
				}
				}
			
					
				
			}
		
	}
	
	for(var i = 0; i < selectboxArr.length; i++){
		if(selectboxArr[i] == filterName){
			console.log("select Change");
			var select = document.getElementById(filterName);
			for (var j = select.options.length - 1 ; j >= 0 ; j--){
				select.remove(j);
			}
		
			for(var j = 0; j < filterData[0].length; j++) {
				var opt = filterData[0][j];
				select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
			}
			sortSelect(filterName);
		}
	}
	
	

	for(var i = 0; i < sliderArr.length; i++){
		if(sliderArr[i] == filterName){
			console.log("slider Change");
			//d3.select('#' + filterName).min(filterData[0]).max(filterData[1]);
			min = parseFloat(filterData[0][0]);
			max = parseFloat(filterData[0][1]);
			console.log(filterData);

			
			var slider = document.getElementById(filterName);
			var sliderNum = filterName.substring(filterName.length - 1);
			
			while (slider.firstChild) {
				slider.removeChild(slider.firstChild);
			}
		
			
			 currentMin = parseFloat(document.getElementById("slidertextmin" + sliderNum).innerText);
			 currentMax = parseFloat(document.getElementById("slidertextmax" + sliderNum).innerText);
			
			if(currentMin < min){
				currentMin = min
			}
			if(currentMax > max){
				currentMax = max
			}
			if(min == max){
				max+= 1;
				currentMax+= 1;
			}
			
			d3.select('#slidertextmin' + sliderNum).text(currentMin);
			d3.select('#slidertextmax' + sliderNum).text(currentMax);
			
			d3.select('#' + filterName).call(d3.slider().axis(true).snap(false).value( [ currentMin, currentMax ] ).min(min).max(max).on("slide", function(evt, value) {
		
				//have to check which slider is actually being used, Have to check which one so I know which id of the span to select
				var sliderNum = handle_id.substring(handle_id.length - 1);
	
				d3.select('#slidertextmin' + sliderNum).text(value[ 0 ].toFixed(0));
				d3.select('#slidertextmax' + sliderNum).text(value[ 1 ].toFixed(0));			
			}));
					
		}
	}
	
}
function overlayShow(){
  document.getElementById("overlay").style.display = "block";
  document.getElementById("wrapper").style.opacity = "0.6";
  document.getElementById("navbar").style.opacity = "0.6";
  
}

function overlayHide(){
	var overlay = document.getElementById("overlay");
	while (overlay.firstChild) {
    overlay.removeChild(overlay.firstChild);
	}
	
	overlayUp = false;
	isOverlay = false;
	
	document.getElementById("overlay").style.display = "none";
	document.getElementById("wrapper").style.opacity = "1";
	document.getElementById("navbar").style.opacity = "1";
 
}
</script> 
	

  <body>
	<script type="text/javascript" src="/~jdo/Honours/assets/js/scatterplot40.js"></script>
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
				<li><a class="navlink" href="/~jdo/Honours/visualSearch4.php">Search</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-left">
				<li><a class="navlink" href="/~jdo/Honours/admin.php">Admin</a></li>
			</ul>
		</div>
		</div>
	</div>

	</br>
	</br>
	</br>
	
	<div id="wrapper">
		<div
		<div id ="filterDiv" class="filterDiv">
			Filters
			<hr>
			</br>
		
		</div>
		<div id ="graphDiv" class="graphDiv">
			Data
			<hr>
			</br>
		</div>
		<div id ="compareDiv" class="compareDiv">
			Select up to 5 circles to compare
			<hr>
			</br>
		</div>
	</div>
	<overlay>
		<div id="overlay">
		</div>
	</overlay>

  </body>
  
</html>
