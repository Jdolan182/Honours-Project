

var filterData = [];
var filterNum = 0;
var numberArr = []

function makeFilters(data, header, num, ){
	
	filterData[filterNum] = [];
	numberArr[filterNum] = num;
	filterData[filterNum][0] = header;
	filterData[filterNum][1] = data;
	filterNum++;

}
