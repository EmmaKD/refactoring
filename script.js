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
	
	gDataTable.addColumn('string', UNEMPDATA.columns[0]); //only works because it is a google.visualization object
	
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);
	
	gDataTable.addRows(UNEMPDATA.rows);//only works because this is a google.visualization object
	

		
	//create options object to actually customize the look if the chart
	
	var chartOptions = {
          title: 'Unemployment since 1980'
        };

	
	//tell it to create a line chart, and give it the 
	var myChart = new google.visualization.LineChart(document.getElementById("MyChart"));
	
	//tell it to show the title
	myChart.draw(gDataTable, chartOptions);
}

var stem = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1I1IanRhd9RKxe1emSFkg2LgRFIa2GTqcKSntGhBN+WHERE+DATE%3E%27";
var key = "&key=AIzaSyBJWD4UulDQQMtDdtacaCD03MInkDsb61g";


function googleLoaded() {
	
	console.log("googleLoaded");
	
	//Instead of loading data from a static json file,
	//I'm going to load it from a Google Fusion Table

	$.get(stem+"1979-01-01%27+"+key, dataLoaded, "json");


}

function setNav() {
	$(".btn-success").on("click", function(event) {
		console.log(event.target.id);	
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
	

	//

	

}


$(document).ready(pageLoad);

