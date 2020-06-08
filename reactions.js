//Set the height of the container
var headHight = document.getElementById("header").offsetHeight;
var footHeight = document.getElementById("footer").offsetHeight;
var containerHeight = window.innerHeight - headHight - footHeight - 20;
var containerWidth = window.innerWidth - 40;

document.getElementById("container").style.height = containerHeight + "px";
document.getElementById("container").style.width = containerWidth + "px";


//position Go button
var goLeft = (containerWidth/2) - 50;
var goTop = (containerHeight/2) - 20;

document.getElementById("go").style.left = goLeft + "px";
document.getElementById("go").style.top = goTop + "px";

//Define the other variables
var wait = "";
var appear = "";
var gone = "";
var timeTaken = "";
var first = "-";
var second = "-";
var third = "-";



//Function to create the shape
function makeShape() {
			
	// Random size of shape
	var size = 80 + (Math.random()*170);
			
	// Circle or square??
	var cirSq = (Math.floor(Math.random()*2)) * 50;

	// Random colour picker
		function colourPick() {
		var letters = '0123456789ABCDEF';
		var hex = '#';
		for (var i = 0; i < 6; i++) {
			hex += letters[Math.floor(Math.random() * 16)];
		}
		
		if (hex == "#ffffff") {
			document.getElementById("container").style.background = "hotpink";
		}

		return hex;
	}


	// Random positioning
	
	var down = Math.random()*(containerHeight - size);
	var across = Math.random()*(containerWidth - size);

	// Create the shape using the random variables above
	document.getElementById("shape").style.height = size + "px";
	document.getElementById("shape").style.width = size + "px";
	document.getElementById("shape").style.background = colourPick();
	document.getElementById("shape").style.borderRadius = cirSq + "%";
	
	document.getElementById("shape").style.top = down + "px";
	document.getElementById("shape").style.left = across + "px";
	
	//Log the time that the shape appears
	appear = performance.now();
	
}

//Shape appears when go is clicked
document.getElementById("go").onclick = function() {
	document.getElementById("go").style.display = "none";
	makeShape();
}




	
//When the shape is clicked, the following runs
document.getElementById("shape").onclick = function() {
	//The time of the click is logged 
	gone = performance.now();
	//The shape disappears
	document.getElementById("shape").style.display = "none";
	//The time taken to click is calculated and displayed				
	timeTaken = ((gone - appear)/1000).toFixed(2);
	document.getElementById("time-taken").innerHTML = timeTaken;
	
	//The best times are calculated and displayed
	if (timeTaken < first || first == "-") {
		third = second;
		second = first;
		first = timeTaken;
		document.getElementById("one").style.color = "red";
		document.getElementById("two").style.color = "yellow";
		document.getElementById("three").style.color = "yellow";
	} else if (timeTaken < second || second == "-") {
		third = second;
		second = timeTaken;
		document.getElementById("one").style.color = "yellow";
		document.getElementById("two").style.color = "red";
		document.getElementById("three").style.color = "yellow";
	} else if (timeTaken < third || third == "-") {
		third = timeTaken;
		document.getElementById("one").style.color = "yellow";
		document.getElementById("two").style.color = "yellow";
		document.getElementById("three").style.color = "red";
	} else {
		document.getElementById("one").style.color = "yellow";
		document.getElementById("two").style.color = "yellow";
		document.getElementById("three").style.color = "yellow";
	}
	
	document.getElementById("first-place").innerHTML = first;
	document.getElementById("second-place").innerHTML = second;
	document.getElementById("third-place").innerHTML = third;
	
	//The wait time for the next shape to appear is generated
	wait = (Math.random() * 3000);
	
	//The function makeShape() is run again but this time with the wait time
	setTimeout(function(){
		makeShape()
		document.getElementById("shape").style.display = "block";
		}, wait);

}