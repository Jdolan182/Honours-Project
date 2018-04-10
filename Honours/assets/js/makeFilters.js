var column = [];

var headersArr = [];
var filterArr = [];
//keeps track of whether a column is numbers or not for later filtering
var numberArr = [];
var queryString = "";
var filterCSV;

var checkboxArr = []
var checkboxesArr = []
var checkboxName = "checkbox0";
var checkboxCount = 0;
var checkboxesCount = 0;


var searchboxes = []
var searchboxName = "searchbox0";

var selectboxes = []
var selectboxName = "selectbox0";
var selectboxSelected = "selectboxSelected0";
var selectDiv = "multiSelect0"
var selectCount = 0;


var sliders = []
var sliderName = "slider0";
var sliderCount = 0;
var sliderTextMin = "slidertextmin0";
var sliderTextMax = "slidertextmax0"
var handle_id;


function checkValue(value){
	return isNaN(parseFloat(value));
}

//counts the unique values of a column of data
function countUnique(column) {
	return new Set(column).size;
}
var filterDiv;

function makeFilter(data, header, num){
	
	
	console.log(data);
	
		 //just makes first letter of filter name capital, might be an easier way but this will do for now.
		
		
		var header2 = header.charAt(0).toUpperCase()  + header.substr(1);;
		
		
	
		
		
	filterDiv = d3.select('#filterDiv');
		
	 //Creating filter dynamically based on dataset
		
		  
		  //change to query database with ajax to fill column array
			column = [];
			var containsString = false;
			var checkBoxes = false;
			var makeFilter = true;
				 		
			column = data;
			console.log(column.length);
			
			for(var j = 0; j < column.length; j++){ 
				if(checkValue(column[j])){
					
					containsString = true;
					break;
				}
			} 
		  
			for(var j = 0; j < column.length; j++){ 
				//check length of text in column
				if(column[j].length > 20){
					makeFilter = false;
					break;
				}
			} 
		  
			if(countUnique(column) < 3){
				checkBoxes = true;
			 
			}
			
			if(countUnique(column) == 100 && containsString == true){
				makeFilter = false;
			}
		
			if(makeFilter == true){
				if(checkBoxes == true){
				//create checkbox filter
			  
				var set = new Set(column)
				//.entries(unique);
				let checkboxValues = Array.from(set);
				
				
				
				var span = filterDiv.append('span')
					.attr('class', 'filterHeaders')
					.text(header2 + ': ');
				filterDiv.append('br')
				
				for(var j = 0; j < checkboxValues.length; j++){ 
					var checkboxes = filterDiv.append('input')
						.attr('id',checkboxName)
						.attr('type', "checkbox")
						.attr('value', checkboxValues[j])
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
					checkboxArr[checkboxCount][0] = header;
					checkboxArr[checkboxCount][1] = checkboxesArr;
					checkboxesArr = [];
			
					checkboxCount++;
					filterDiv.append('br')
				}
				else if(containsString == true){
					//create dropdown box filter
					
					var set = new Set(column)
					//.entries(unique);
					let selectboxValues = Array.from(set);
					
					var span = filterDiv.append('span')
						.attr('class', 'filterHeaders')
						.text(header2 + ': ');
			 
					filterDiv.append('br')
								  
					var multiSelectDiv = filterDiv.append('div')
						.append('div')
						.attr("id", selectDiv)
					
					
					var search = multiSelectDiv.append('input')
						.attr('type', "text")
						.attr('id', searchboxName)
						.attr('placeholder', "Search")
						.on('keyup', filterBox);
						
	
					var span = multiSelectDiv.append('span')
						.attr('class', 'selectedOptions')
						.text('Selected Options');
						
					filterDiv.append('br')
			  
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
						
					var dropdownSelected = multiSelectDiv.append('select')
						.attr('id', selectboxSelected)
						.attr('size', 6)
						.attr('float', 'left')
						.attr('class', 'multiBox')
						.attr('multiple', true)
					
				
					searchboxes[selectCount] = searchboxName;
					
					selectboxes[selectCount] = header;
					selectCount++;
				
					searchboxName = "searchbox" + selectCount;

					selectboxName = "selectbox" + selectCount;
					
					selectboxSelected = "selectboxSelected" + selectCount;
				
					selectDiv = "multiSelect" + selectCount;
				
			   
				}
				else{
			 	console.log("win");
					var min = 0,
						max = Math.max.apply(null, column);
					var symbol = "";
					
					//for rounding the max, might be a better way but this is just for looks of the filters.
					if(!headerNames[i].match(/year/i)){
						if(max <= 9){
							max = Math.round(max/1)*1;
						}
						else if(max <= 99){
							max = Math.round(max/10)*10;
						}
						else if(max <= 999){
							max = Math.round(max/100)*100;
						}
						else if(max <= 9999){
							max = Math.round(max/10000)*10000;
						}
						else if(max <= 99999){
							max = Math.round(max/100000)*100000;
						}
					}	
					
					
						
					var snapBool = true;
					//create number filter
					var span = filterDiv.append('span')
						.attr("id", headerNames2[i])
						.attr('class', 'filterHeaders')
						.text(header2 + ': ')
				
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

					sliders[sliderCount] = header;	
					body.append('br')
					sliderCount++
					sliderName = "slider" + sliderCount;
					sliderTextMin = "slidertextmin" + sliderCount;
					sliderTextMax = "slidertextmax" + sliderCount;
					numberArr[i] = 1;
					filterDiv.append('br')
				}
		  
				
				filterDiv.append('br')
				
			}
		
	  

}
