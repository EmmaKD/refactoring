/**
 * @author
 */
console.log("hi there");

//UNEMDATA is the local name of the json file I just loaded
function dataLoaded(UNEMPDATA) {

	console.log("data loaded");

	var gDataTable = new google.visualization.DataTable();

	//when I add columns, the first parameter is the data type in the column
	//the second parameter is the name of the columns

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	//only works because it is a google.visualization object

	gDataTable.addColumn('number', UNEMPDATA.columns[1]);

	gDataTable.addRows(UNEMPDATA.rows);
	//only works because this is a google.visualization object

	//create options object to actually customize the look if the chart

	var chartOptions = {
		title : 'Unemployment since 1980'
	};

	//tell it to create a line chart, and give it the
	var myChart = new google.visualization.LineChart(document.getElementById("MyChart"));

	//tell it to show the title
	myChart.draw(gDataTable, chartOptions);
}

var myTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1I1IanRhd9RKxe1emSFkg2LgRFIa2GTqcKSntGhBN+WHERE+DATE>";
var myKey = "&key=AIzaSyBJWD4UulDQQMtDdtacaCD03MInkDsb61g";

function googleLoaded(e) {

	console.log("googleLoaded");

	//Instead of loading data from a static json file,
	//I'm going to load it from a Google Fusion Table

	$.get(myTableURL + "'1979-01-01'+" + myKey, dataLoaded, "json");

	setNav();
}

function setNav() {

	$(".btn-success").on("click", function(e) {

		//$("#year_1980").click();

		var myID = e.target.id;
		//e.g. "year 2000"

		var myNameArray = myID.split("_");
		//splits into an array, "2000" will be the second item.

		var myYear = myNameArray[1];
		//grab the year

		console.log(myYear);

		$.get(myTableURL + "'" + myYear + "-01-01'" + myKey, dataLoaded, "json");
		//$.get(stem+"'1979-01-01'+"+key, dataLoaded, "json");

		History.pushState({
			year : myYear
		}, "Unemployment from -" + myYear, "?year=" + myYear);

	});

}

console.log("google loaded");

function pageLoad() {

	console.log("go to page loaded");

	//load the google visualization library
	google.load("visualization", '1', {
		packages : ["corechart"],
		callback : "googleLoaded"
	});

}


$(document).ready(pageLoad);

