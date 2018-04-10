var headerNames
var headerNames2 = []
var dataArray
var allData
var selectXData = []
var selectYData = []
var count = 0;
var xCount = 0;

var overlayUp = false;

var colourCounter = 0;
var currentColour = 0;

var maxDataEntries = 100;
var tooltipArr = [];
var tooltipArr2 = [];
var tooltipCount = 0;
var tableCircles = [];
var tableCount = 0;

var xScale;
var yScale;
var xAxis;
var yAxis;
var svg;
var body;
var colorScale;
var circles;
var margin;
var h;
var w;
var formatPercent;
var yInput;
var xInput;
var margin;
var h;
var w;
var formatPercent;

var column = [];

var headersArr = [];
var filterArr = [];
//keeps track of whether a column is numbers or not for later filtering
var queryString = "";
var filterCSV;

var checkboxArr = []
var checkboxesArr = []
var checkboxName = "checkbox0";
var checkboxCount = 0;
var checkboxesCount = 0;


var searchboxes = []
var searchboxName = "searchbox0";

var selectboxArr = [] 
var selectedboxArr = [] 
var selectboxes = []
var selectboxName = "selectbox0";
var selectboxSelected = "selectboxSelected0";
var selectDiv = "multiSelect0"
var selectCount = 0;


var sliderArr = []
var sliders = []
var sliderName = "slider0";
var sliderCount = 0;
var sliderTextMin = "slidertextmin0";
var sliderTextMax = "slidertextmax0"
var handle_id;

var filterResults = [];


var colourArray = [
	"#1a75ff", "#00cc00", "#cc0000", "#990099", "#ff9900", "#72f3cc", "#91efe6", "#fed284", "#a6edf6", "#4bfee0", 
	"#9bfb4f", "#c1f3f6", "#e0f9ab", "#d4ffd2", "#fffac1", "#a9c5fd", "#f0acc4", "#7adf34", "#a8d516", "#86dade",
	"#6cdfd7", "#a7d5b9", "#b4d899", "#f1c0bf", "#a9e8c7", "#e6e04c", "#fcd4bf", "#67feb6", "#ddfeee", "#f5af92",
	"#a7cddc", "#c7cae9", "#e1c2c9", "#06f6a4", "#64f36c", "#ffd056", "#e9d3ea", "#94f595", "#eadbcc", "#acf2b2",
	"#a2fde0", "#f5e5c6", "#f7eb67", "#f1e9e6", "#e2efdb", "#cbeaa6", "#c5f4e0", "#ede9f5", "#b8bffd", "#97cced",
	"#fbfd52", "#aacac8", "#6fdf6e", "#23e83d", "#d6c33e", "#edbb66", "#96d8f1", "#d9c9a7", "#30ef8c", "#66ed41", 
	"#eabeed", "#c3dbce", "#d6d6e9", "#f8c6ee", "#d5d9d1", "#96f0cc", "#c7ef56", "#8ef6ff", "#aff0e8", "#b7f593", 
	"#dee7e0", "#bdff5c", "#eff01a", "#d7f0fe", "#bdfdc3", "#f0ef9c", "#d3fe14", "#bec0ea", "#c6c2be", "#eab1b3",
	"#ecfb92", "#d0bbd2", "#89d97b", "#cdc47c", "#acd345", "#21e0f4", "#9ed693", "#9adfcd", "#ccdc4c", "#e3e3c2",
	"#d8f003", "#e7f158", "#b8fff2", "#cdb9e9", "#faa8ae", "#cac75c", "#d7d119", "#eccb48", "#bbd7ea", "#a0f3c1"
]

function whichDiv(handle){
	return $(handle).closest('div');	
}


//checks is a value is a number
function checkValue(value){
	return isNaN(parseFloat(value));
}

//counts the unique values of a column of data
function countUnique(column) {
	return new Set(column).size;
}

function removeArrayValue(array, value) {
    var index = array.indexOf(value);
    if (index >= 0) {
        array.splice(index, 1);
        reindexArray(array);
    }
}
function reindexArray(array) {
   var result = [];
    for (var key in array) {
        result.push(array[key]);
    }
    return result;
}

function addLabel(circle){
	
	if(tableCount != 5){
		if(!tableCircles.includes(circle)){
			tableCircles[tableCount] = circle;
			var compareDiv = d3.select('#compareDiv');
			
			var data = d3.select(circle)[0][0].__data__;

			for(var i = 0 ; i < tooltipArr.length ; i++){
				tooltipArr2[i] = tooltipArr[i].charAt(0).toUpperCase()  + tooltipArr[i].substr(1);;
				
			} 
			
			
			var div = compareDiv.append('div')
				.attr('class', 'tableDiv');
				
			var span = div.append('div')
				.attr('id', 'close' + tableCount)
				.attr('class', 'close')
				.on('click', function(d){
					this.parentNode.parentNode.removeChild(this.parentNode);
					
					var close = this.id;
					var closeNum = close.substring(close.length - 1)
					removeArrayValue(tableCircles, tableCircles[closeNum])
					tableCount--;
				})
				.text('x');
				
				
			var table = div.append('table')
				.attr('class', 'compareTable')
				
				
			var thead = table.append('thead')
			var	tbody = table.append('tbody');
			
			// append the header row
			tbody.append('tr')
			
			thead.append('th')
				.text("Comparison")
				
			thead.append('th')
				.text("Data")
				
			for(var i = 0; i < tooltipArr.length; i++){
			
				tbody.append('tr')
				
				tbody.append('td')
					.text(tooltipArr2[i])
				tbody.append('td')
					.text(data[tooltipArr[i]])
			}
				
				
			div.append('br');
			
			var span = div.append('div')
				.attr('id', 'table' + tableCount)
				.attr('class', 'moreInfo')
				.on('click', function(d){
					showMoreDetails(this.id);
					overlayShow();	
					overlayUp = true;
					
				})
				.text('Click for more info...');
				
			tableCount++;
			div.append('br');
		}
	}
	
}


function showMoreDetails(id){
	console.log(id);
	
	var tableNum = id.substring(id.length - 1)
	
	
	var data = d3.select(tableCircles[tableNum])[0][0].__data__;
	
	
	var overlay = d3.select('#overlay');
	
	var div = overlay.append('div')
		.attr('class', 'tableDiv');
		
	var span = div.append('div')
		.attr('id', 'close')
		.attr('class', 'close')
		.on('click', function(d){
			//this.parentNode.parentNode.removeChild(this.parentNode);
			//this.parentNode.removeChild(this);
			overlayHide();

		})
		.text('x');
		
		
	var table = div.append('table')
		.attr('class', 'compareTable')
		
		
	var thead = table.append('thead')
	var	tbody = table.append('tbody');
	
	// append the header row
	tbody.append('tr')
	
	thead.append('th')
		.text("Comparison")
		
	thead.append('th')
		.text("Data")
		
	for(var i = 0; i < headerNames.length; i++){
	
		tbody.append('tr')
		
		tbody.append('td')
			.text(headerNames2[i])
		tbody.append('td')
			.text(data[headerNames[i]])
	}
	
	var span = div.append('div')
				.attr('class', 'moreInfo')
				.text('Go to store page');
				
	div.append('br');
	
	
}

//changes graph based on filters
function applyFilters(){
		
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
	console.log(queryString)
	console.log(filterResults);
	

	sendFilters();
	
}



function sendFilters() {
	filterCSV = [];
	var xhttp; 

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(this.responseText == "(0) Records Found!"){	
				d3.select('#searchSpan').text("No results found from your search. Please try changing the filters!");
				update();
			}
			else if(this.responseText !== "(0) Records Found!"){
				filterCSV = this.responseText;		
				update();
			}
		}	
	};
	xhttp.open("GET", "/~jdo/Honours/assets/php/filterData.php?queryString="+queryString, true);
	xhttp.send();
}


function update(){
	
	
	// Get the data again
	circles = svg.selectAll('circle')
			 .data(allData)
             .remove()
			 .exit();
	
	if(filterCSV.length > 0){
	count = 0;
	allData = [];
	
    allData = d3.csv.parse(filterCSV) 
	
	console.log(allData);
	
	if(allData.length ==  maxDataEntries ){
		d3.select('#searchSpan').text("Limiting results to " + allData.length + " data entries. Apply filters for a more defined result!");
	}
	else if(allData.length <  maxDataEntries ){
		d3.select('#searchSpan').text("Your search returned " + allData.length + " results");
	}
	
	
	var xValue = d3.select('#xSelect')[0][0].value;
	var yValue = d3.select('#ySelect')[0][0].value;
	
	console.log(xValue);
	
	var num;
	
	for(var i = 0; i < headerNames.length; i++){
		if(currentColour == headerNames[i]){
			num = i;
		}
		
	}
	
	
	if(numberArr[num] == 1){
	  
	  	var column = [];
	
		allData.map(function(d){
			column.push(d[headerNames[num]]);
		})
		
		var min = Math.min.apply(null, column) 
		var max = Math.max.apply(null, column) 
		
	colorScale = d3.scale.linear()
		.domain([min, max])  
		.range(["#e6f0ff", "#003d99"]); 
	}
	else if(numberArr[num] == 0){
		//make stirng colours
		colorScale =  d3.scale.ordinal()
			.domain(headerNames[num])
			.range(colourArray);
	}

	 xScale
  if(!checkValue(dataArray[xValue])){
	  	
		allData.forEach(function(d){
			d[xValue] = parseInt(d[xValue]);
		});
		
		var column = [];
	
			allData.map(function(d){
				column.push(d[xValue]);
		})
		
	    var min = Math.min.apply(null, column) 
		min = min - 5;
		
  xScale = d3.scale.linear()
    .domain([
        d3.min([min,d3.min(allData,function (d) { return d[xValue] })]),
        d3.max([0,d3.max(allData,function (d) { return d[xValue] })])
      ])
    .range([0,w])
  }
  else{
  xScale = d3.scale.ordinal()
    .domain(allData.map(function(d) { return d[xValue]; }))
	.rangeRoundBands([0, w], 1);
  }
	xAxis.scale(xScale) // change the xScale
    d3.select('#xAxis') // redraw the xAxis
      .transition().duration(1000)
      .call(xAxis)
    d3.select('#xAxisLabel') // change the xAxisLabel
      .transition().duration(1000)
      .text(xValue)

	  
  yScale
  if(!checkValue(dataArray[yValue])){
	  
	  	allData.forEach(function(d){
			d[yValue] = parseInt(d[yValue]);
		});
	  	
		var column = [];
			 
			allData.map(function(d){
				column.push(d[yValue]);
		})
		var min = Math.min.apply(null, column) 
		min = min - 5;
		
		
		
  yScale = d3.scale.linear()
    .domain([
        d3.min([min,d3.min(allData,function (d) { return d[yValue] })]),
		d3.max([0,d3.max(allData,function (d) { return d[yValue] })])
      ])
    .range([h,0])
  }
 
  else{
  yScale = d3.scale.ordinal()

    .domain(allData.map(function(d) { return d[yValue]; }))
	.rangeRoundBands([h, 0], 1);
  }
    yAxis.scale(yScale) // change the xScale
    d3.select('#yAxis') // redraw the xAxis
      .transition().duration(1000)
      .call(yAxis)
    d3.select('#yAxisLabel') // change the xAxisLabel
      .transition().duration(1000)
      .text(yValue)
	
	circles = svg.selectAll('circle')
		.data(allData)
		.enter()
	.append('circle')
		.attr('cx',function (d) { return xScale(d[xValue]) })
		.attr('cy',function (d) { return yScale(d[yValue]) })
		.attr('r','10')
		.attr('stroke','black')
		.attr('stroke-width',1)
		.attr('fill',function (d,i) { return colorScale(d[headerNames[num]]) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
		  d3.select(this).style("cursor", "pointer"); 
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
		  d3.select(this).style("cursor", "default"); 
      })
	 .on('click', function(d){
		  addLabel(this);
	  })
	 
    .append('title') // Tooltip
      .text(function (d) { return  tooltip(allData)})
	 
	 
	 

	 
	}
}

//creates the tooltip for the circles on the graph	
function tooltip(data){
	
	var tooltip = tooltipArr[0] + ': ' + data[count][tooltipArr[0]]
	for(var i = 1; i < tooltipArr.length; i++){
		var str = '\n' + tooltipArr[i] + ': ' + data[count][tooltipArr[i]]
		tooltip = tooltip.concat(str)
	}
	count++
	return tooltip
}

function assignFilter(){
	
   for(var i = 0; i < headerNames.length; i++){
	  filterResults[i] = [];
	  filterResults[i][0] = headerNames[i];
	  filterResults[i][1] = [];
  } 
}


d3.csv("/~jdo/Honours/assets/php/getData.php",function (data) {
// CSV section
  allData = data
  headerNames = d3.keys(data[0]);
  
  assignFilter();
  
  dataArray = data[0];
  
  //console.log(data);
  
  var selectData = [];
  
  for(var i = 0; i < headerNames.length; i++){
	
		column = [];
		var containsString = false;
		var makeTooltip = true;
		
		data.map(function(d){
			column.push(d[headerNames[i]]);
		})
			
		for(var j = 0; j < column.length; j++){ 
			if(checkValue(column[j])){
				containsString = true;
				break;
			}
			
		} 
		//console.log(column);
		for(var j = 0; j < column.length; j++){ 
			//check length of text in column
			//if(column[j].length > 20){
			//	makeTooltip = false;
			//	break;
			//}
		} 
		
		if(makeTooltip == true){
			tooltipArr[tooltipCount] = headerNames[i]; 
			tooltipCount++
		}
		

		selectData[i] = {"text" : headerNames[i]};
		
//		if(containsString == false){
//			selectXData[xCount] = {"text" : headerNames[i]};
//			xCount++;
//		}
//			selectYData[i] = {"text" : headerNames[i]};
//			numberArr[i] = 0;
	
	}

  
  
	var body = d3.select('body')
	var graphDiv = d3.select('#graphDiv')
	
 

  // Select X-axis Variable
  var span = graphDiv.append('span')
    .text('Select X-Axis variable: ')
  xInput = graphDiv.append('select')
      .attr('id','xSelect')
      .on('change',xChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text ;})
  graphDiv.append('br')
  graphDiv.append('br')

  // Select Y-axis Variable
  var span = graphDiv.append('span')
      .text('Select Y-Axis variable: ')
  yInput = graphDiv.append('select')
      .attr('id','ySelect')
      .on('change',yChange)
    .selectAll('option')
      .data(selectData)
      .enter()
    .append('option')
      .attr('value', function (d) { return d.text })
      .text(function (d) { return d.text})
  //graphDiv.append('br')
  
  d3.select('#ySelect').property('value', headerNames[1]);

  // Variables
  body = d3.select('body')
  margin = { top: 50, right: 50, bottom: 50, left: 100 }
  h = 700 - margin.top - margin.bottom
  w = 800 - margin.left - margin.right
  formatPercent = d3.format('.2%')
  // Scales
  if(numberArr[0] == 1){
	  
	  	var column = [];
	
		allData.map(function(d){
			column.push(d[headerNames[0]]);
		})
		
		var min = Math.min.apply(null, column) 
		var max = Math.max.apply(null, column) 
		
		
	colorScale = d3.scale.linear()
		.domain([min, max])  
		.range(["#e6f0ff", "#003d99"]); 
  }
  else if(numberArr[0] == 0){
	  //make stirng colours
	  colorScale =  d3.scale.ordinal()
		.domain(headerNames[0])
		.range(colourArray);
  }
  xScale
  if(!checkValue(dataArray[headerNames[0]])){
	  	
		allData.forEach(function(d){
			d[headerNames[0]] = parseInt(d[headerNames[0]]);
		});
		
		var column = [];
	
			allData.map(function(d){
				column.push(d[headerNames[0]]);
		})
		
		var min = Math.min.apply(null, column) 
		min = min - 5;
		
		
  xScale = d3.scale.linear()
    .domain([
      d3.min([min,d3.min(allData,function (d) { return d[headerNames[0]] })]),
      d3.max([0,d3.max(allData,function (d) { return d[headerNames[0]] })])
      ])
    .range([0,w])
  }
  else{
  xScale = d3.scale.ordinal()
    .domain(allData.map(function(d) { return d[headerNames[0]]; }))
	.rangeRoundBands([0, w], 1);
  } 
  yScale
  if(!checkValue(dataArray[headerNames[1]])){
	  	
		allData.forEach(function(d){
			d[headerNames[1]] = parseInt(d[headerNames[1]]);
		});
		
		var column = [];
			 
			allData.map(function(d){
				column.push(d[headerNames[1]]);
		})
	
		var min = Math.min.apply(null, column) 
		min = min - 5;
		
		
		
  yScale = d3.scale.linear()
    .domain([
      d3.min([min,d3.min(allData,function (d) { return d[headerNames[1]] })]),
      d3.max([0,d3.max(allData,function (d) { return d[headerNames[1]] })])
      ])
    .range([h,0])
  }
  else{
  yScale = d3.scale.ordinal()

    .domain(allData.map(function(d) { return d[headerNames[1]]; }))
	.rangeRoundBands([h, 0], 1);
  }
  
	  
	// SVG
	svg = graphDiv.append('svg')
		.attr('height',h + margin.top + margin.bottom)
		.attr('width',w + margin.left + margin.right)
    .append('g')
		.attr('transform','translate(' + margin.left + ',' + margin.top + ')')



  // X-axis
  xAxis = d3.svg.axis()
    .scale(xScale)
    //.ticks(5)
    .orient('bottom')
  // Y-axis
  yAxis = d3.svg.axis()
    .scale(yScale)
    //.ticks(5)
    .orient('left')
  // Circles
  circles = svg.selectAll('circle')
      .data(allData)
      .enter()
    .append('circle')
      .attr('cx',function (d) { return xScale(d[headerNames[0]]) })
      .attr('cy',function (d) { return yScale(d[headerNames[1]]) })
      .attr('r','10')
      .attr('stroke','black')
      .attr('stroke-width',1)
      .attr('fill',function (d,i) { return colorScale(d[headerNames[0]]) })
      .on('mouseover', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',20)
          .attr('stroke-width',3)
		  d3.select(this).style("cursor", "pointer"); 
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('r',10)
          .attr('stroke-width',1)
		  d3.select(this).style("cursor", "default"); 
      })
	  .on('click', function(d){
		  addLabel(this);
	  })	 
    .append('title') // Tooltip
      .text(function (d) { return  tooltip(allData)})
	  

  // X-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','xAxis')
      .attr('transform', 'translate(0,' + h + ')')
      .call(xAxis)
    .append('text') // X-axis Label
      .attr('id','xAxisLabel')
      .attr('y',-10)
      .attr('x',w)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text(headerNames[0])
  // Y-axis
  svg.append('g')
      .attr('class','axis')
      .attr('id','yAxis')
      .call(yAxis)
    .append('text') // y-axis Label
      .attr('id', 'yAxisLabel')
      .attr('transform','rotate(-90)')
      .attr('x',0)
      .attr('y',5)
      .attr('dy','.71em')
      .style('text-anchor','end')
      .text(headerNames[0])
	  
	  
	  
	function zoom() {
		svg.select(".x.axis").call(xAxis);
		svg.select(".y.axis").call(yAxis);

		svg.selectAll(".dot")
			.attr("transform", transform);
	  }

	function transform(d) {
		return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
	}
	
		graphDiv.append('br')
		graphDiv.append('br')
	  
	 	var span = graphDiv.append('span')
			.attr("id", "searchSpan")
			.text("Limiting results to " + allData.length + " data entries. Apply filters for a more defined result!");
		
		graphDiv.append('br')
		graphDiv.append('br')	
					
	 //just makes first letter of filter name capital, might be an easier way but this will do for now.
		for(var i = 0 ; i < headerNames.length ; i++){
			headerNames2[i] = headerNames[i].charAt(0).toUpperCase()  + headerNames[i].substr(1);;
		
		} 
	
		
		
		var filterDiv = d3.select('#filterDiv');
		
	 //Creating filter dynamically based on dataset
		for(var i = 0; i < headerNames.length; i++){
		  
		  //change to query database with ajax to fill column array
			column = [];
			var containsString = false;
			var checkBoxes = false;
			var makeFilter = true;
				 		
			allData.map(function(d){
				column.push(d[headerNames[i]]);
			})
			
			column = filterData[i][1];
			
	
			
			if(numberArr[i] == 0){
				containsString = true;
				
			}
			 
		  
			for(var j = 0; j < column.length; j++){ 
				//check length of text in column
				if(column[j].length > 50){
					makeFilter = false;
					break;
				}
			} 
		  
			if(countUnique(column) < 8 && containsString == true){
				checkBoxes = true;
			 
			}
			

		  
			if(makeFilter == true){
				if(checkBoxes == true){
				//create checkbox filter
			  
				var set = new Set(column)
				//.entries(unique);
				let checkboxValues = Array.from(set);
				
				
				
				var span = filterDiv.append('span')
					.attr('class', 'filterHeaders')
					.text(headerNames2[i] + ': ');
				filterDiv.append('br')
				
				for(var j = 0; j < checkboxValues.length; j++){ 
					var checkboxes = filterDiv.append('input')
						.attr('id',checkboxName)
						.attr('checked', 'checked')
						.attr('type', "checkbox")
						.attr('value', checkboxValues[j])
						.on('change', function(d){
							getCheckbox(this);
						})
						.append("input")
						.attr('type', 'checkbox')

					var span = filterDiv.append('span')
						.attr('id', checkboxName + "span")
						.text(checkboxValues[j] + '   ');
				
					checkboxesArr[j] = checkboxName;
					checkboxesCount++;
					checkboxName = "checkbox" + checkboxesCount;
				}
			    
				
					checkboxArr[checkboxCount] = []
					checkboxArr[checkboxCount][0] = headerNames[i];
					checkboxArr[checkboxCount][1] = checkboxesArr;
					checkboxesArr = [];
			
					checkboxCount++;
					
				filterDiv.append('br')
				var radio = filterDiv.append('input')
					.attr('id', headerNames[i])
					.attr('name', 'colour')
					.attr('type', 'radio')		
					.attr('value', 'Colour by this filter')		
				var span = filterDiv.append('span')
					.text('Colour by this filter');					
				filterDiv.append('br')
				filterDiv.append('br')
				}
				else if(containsString == true){
					//create dropdown box filter
					
					var set = new Set(column)
					//.entries(unique);
					let selectboxValues = Array.from(set);
					
					var span = filterDiv.append('span')
						.attr('class', 'filterHeaders')
						.text(headerNames2[i] + ': ');
			 
					filterDiv.append('br')
								  
					var multiSelectDiv = filterDiv.append('div')
						.append('div')
						.attr("id", selectDiv)
					
					
					var search = multiSelectDiv.append('input')
						.attr('type', "text")
						.attr('id', searchboxName)
						.attr('placeholder', "Search")
						.on('keyup', filterBox);
						
	

						
					
			  
					var dropdownFilter = multiSelectDiv.append('select')
						.attr('id', selectboxName)
						.attr('size', 6)
						.attr('class', 'multiBox')
						.attr('multiple', true)
					.selectAll('option')
						.data(selectboxValues)
						.enter()
					.append('option')
						.attr("value", function(d) { return d; })
						.text(function (d) { return d;})
						
					sortSelect(selectboxName);
					
					filterDiv.append('br')
					
					var span = multiSelectDiv.append('span')
						.attr('class', 'selectedOptions')
						.text('Selected Options:');
						
					var dropdownSelected = multiSelectDiv.append('select')
						.attr('id', selectboxSelected)
						.attr('size', 6)
						.attr('float', 'left')
						.attr('class', 'multiBox')
						.attr('multiple', true)
					
				
					searchboxes[selectCount] = searchboxName;
					
					selectboxArr[selectCount] = selectboxName;
					selectedboxArr[selectCount] = selectboxSelected;
					
					
					selectboxes[selectCount] = headerNames[i];
					selectCount++;
				
					searchboxName = "searchbox" + selectCount;

					selectboxName = "selectbox" + selectCount;
					
					selectboxSelected = "selectboxSelected" + selectCount;
				
					selectDiv = "multiSelect" + selectCount;
				multiSelectDiv.append('br')
				var radio = multiSelectDiv.append('input')
					.attr('id', headerNames[i])
					.attr('name', 'colour')
					.attr('type', 'radio')			
					.attr('value', 'Colour by this filter')
				var span = multiSelectDiv.append('span')
					.text('Colour by this filter');	
				
				}
				else{
			  
					var min = Math.min.apply(null, column),
						max = Math.max.apply(null, column);
					var symbol = "";
					var snapBool = false;
					
					//for rounding the max, might be a better way but this is just for looks of the filters.

					
						
					
					//create number filter
					var span = filterDiv.append('span')
						.attr("id", headerNames2[i])
						.attr('class', 'filterHeaders')
						.text(headerNames2[i] + ': ')
				
					filterDiv.append('br')
					filterDiv.append('br')
			  
					var sliderDiv = filterDiv.append('div')
						.append('div')
						.attr("id", sliderName)
					
	
					filterDiv.append('br')
					filterDiv.append('br')
				
					var span = filterDiv.append('span')
						.text('Min: ' + symbol);
					var span = filterDiv.append('span')
						.attr("id", sliderTextMin)
						.text(min);
					filterDiv.append('br')
				
					var span = filterDiv.append('span')
						.text('Max: ' + symbol);
					var span = filterDiv.append('span')
						.attr("id", sliderTextMax)
						.text(max);
						

				
					d3.select('#slider' + sliderCount).call(d3.slider().axis(true).snap(snapBool).value( [ min, max ] ).min(min).max(max).on("slide", function(evt, value) {
		
						//have to check which slider is actually being used, Have to check which one so I know which id of the span to select
						var sliderNum = handle_id.substring(handle_id.length - 1);
	
						d3.select('#slidertextmin' + sliderNum).text(value[ 0 ].toFixed(0));
						d3.select('#slidertextmax' + sliderNum).text(value[ 1 ].toFixed(0));
					}));
					
					sliderArr[sliderCount] = sliderName;	
					sliders[sliderCount] = headerNames[i];	
					body.append('br')
					sliderCount++
					sliderName = "slider" + sliderCount;
					sliderTextMin = "slidertextmin" + sliderCount;
					sliderTextMax = "slidertextmax" + sliderCount;
					//numberArr[i] = 1;
					filterDiv.append('br')
					var radio = filterDiv.append('input')
						.attr('id', headerNames[i])
						.attr('name', 'colour')
						.attr('type', 'radio')
					var span = filterDiv.append('span')
					.text('Colour by this filter');	
					filterDiv.append('br')
			
				}
		  
					;
					filterDiv.append('br')

			}
		}
	  
		filterDiv.append('br')
		
		
		var applyFilters = filterDiv.append("input")
			.attr("type", "button")
			.attr("class", "filterButton")
			.attr("name", "ApplyFilters")
			.attr("id", "Apply Filters")
			.attr("value", "Apply Filters")
			.attr("onclick", "applyFilters()");
			
		filterDiv.append('br')
		
		d3.selectAll("#" + headerNames[0])
			.attr("checked", "checked")
			currentColour = headerNames[0];
		
		d3.selectAll("input[name='colour']").on("change", function(){
			console.log(this.id);
			currentColour = this.id;
		});
  function yChange() {
    var value = this.value // get the new y value
	
	var column = [];
	
	allData.map(function(d){
		column.push(d[value]);
	})
	
	var min = Math.min.apply(null, column) 
	min = min - 5;
	
	
	//Check is values of the 'value' selected are numbers or not
	if(!checkValue(dataArray[value])){
		
	yScale = d3.scale.linear()
	yScale // change the yScale
      .domain([
        d3.min([min,d3.min(allData,function (d) { return d[value] })]),
        d3.max([0,d3.max(allData,function (d) { return d[value] })])
        ])
		.range([h,0])
    yAxis.scale(yScale) // change the yScale
    d3.select('#yAxis') // redraw the yAxis
      .transition().duration(1000)
      .call(yAxis)
    d3.select('#yAxisLabel') // change the yAxisLabel
      .text(value)    
    d3.selectAll('circle') // move the circles
      .transition().duration(500)
      .delay(function (d,i) { return i*10})
        .attr('cy',function (d) { return yScale(d[value]) })
	}
	else{
		
	yScale = d3.scale.ordinal()
    yScale // change the yScale
      .domain(allData.map(function(d) { return d[value]; }))
	  .rangeRoundBands([h, 0], 1);
	  //.range([h,0])
    yAxis.scale(yScale) // change the yScale
    d3.select('#yAxis') // redraw the yAxis
      .transition().duration(1000)
      .call(yAxis)
    d3.select('#yAxisLabel') // change the yAxisLabel
      .text(value)    
    d3.selectAll('circle') // move the circles
      .transition().duration(500)
      .delay(function (d,i) { return i*10})
        .attr('cy',function (d) { return yScale(d[value]) })
	}
  }

  function xChange() {
    var value = this.value // get the new x value
	console.log(value);
		var column = [];
	
	allData.map(function(d){
		column.push(d[value]);
	})
	
	var min = Math.min.apply(null, column) 
	min = min - 5;
	
	if(!checkValue(dataArray[value])){
		
		xScale = d3.scale.linear()
    xScale // change the xScale
      .domain([
        d3.min([min,d3.min(allData,function (d) { return d[value] })]),
        d3.max([0,d3.max(allData,function (d) { return d[value] })])
        ])
		.range([0,w])
		    xAxis.scale(xScale) // change the xScale
    d3.select('#xAxis') // redraw the xAxis
      .transition().duration(1000)
      .call(xAxis)
    d3.select('#xAxisLabel') // change the xAxisLabel
      .transition().duration(1000)
      .text(value)
    d3.selectAll('circle') // move the circles
      .transition().duration(500)
      .delay(function (d,i) { return i*10})
        .attr('cx',function (d) { return xScale(d[value]) })
	}
	else{
	xScale = d3.scale.ordinal()
	xScale // change the yScale
      .domain(allData.map(function(d) { return d[value]; }))
	  .rangeRoundBands([0, w], 1);
	  //.range([0,w])
    xAxis.scale(xScale) // change the xScale
    d3.select('#xAxis') // redraw the xAxis
      .transition().duration(1000)
      .call(xAxis)
    d3.select('#xAxisLabel') // change the xAxisLabel
      .transition().duration(1000)
      .text(value)
    d3.selectAll('circle') // move the circles
      .transition().duration(500)
      .delay(function (d,i) { return i*10})
        .attr('cx',function (d) { return xScale(d[value]) })
	} 
  }
})