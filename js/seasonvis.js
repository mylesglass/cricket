/**
	Visualisations for Netball in D3.JS
	Ewan Moshi & Myles Glass
**/

var svg, width, height, margin, tip, x, y, xAxis, yAxis, spacing, keyCounter;

$(function() {

	// Create Drawing Area for d3
	margin = 20;
	width = $('#vis').width() - (margin * 2);
	height = $('#vis').height();
	spacing = width / 17;

	svg = d3.select('#vis').append('svg')
		.attr('width', width)
		.attr('height', height);

	console.log("SVG Created");

	//tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });

	SeasonView();

});


/**
	Season View
		Displays teams progression throughout a season.
		Pretty dope tbh.
**/

function SeasonView () {

	x = d3.scale.linear()
		.range([0, width])
		.domain([0, 17]);

	y = d3.scale.linear()
		.range([height, 0])
		.domain([0, 20]);


	xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom');

	yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');

	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);

	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('transform', 'translate('+margin+', 0)')
		.attr('y', '6')
		.attr('dy', '.71em')
		.style('text-anchor', 'end');
}


function drawTeamSeason() {

	d3.selectAll("circle").remove();
	d3.selectAll("path").remove();
	d3.selectAll("div2").remove()

	//var i = 0;

    options.forEach(function(team, i) {
		getGamesForTeam(team);
		var wins = 0;

        console.log('team'+i);

		console.log('list of all games '+listOfAllGames.length);
		console.log('Games length '+GAMES.length);

		var nodes = svg.selectAll('team'+i).data(listOfAllGames, function(d) {
			return d.round;
		});

		 var lineData = [];
	     var x = 0;
	     var x = 0;
		 var spacing = (width - (margin * 2)) / listOfAllGames.length; // x axis lenght divided by number of games
		 var count = 0;
		 var dmain = 33;
		 var yRange = d3.scale.linear()
		 	.range([0,($('svg').height() / 2) - margin] )
		 	.domain([0, dmain]);

	    	listOfAllGames.forEach(function(game) {
	     	x = game.round * spacing;
	     	if(team === game.winner) {
		 		count++;
		 	}
		 	y = height - (count * spacing) - margin;
		 	 // create team object
	        var point = {
	             x : x,
	             y : y,
	         };
	        lineData.push(point);
	    	});

		 var lineFunction = d3.svg.line()
	                    .x(function(d) { return d.x; })
	                     .y(function(d) { return d.y; })
	                     .interpolate("linear");

	     var lineColor = getColorOfLine(options[i], i);

	     var lineGraph = svg.append("path")
	                        .attr("d", lineFunction(lineData))
	                        .attr("stroke", lineColor)
	                        .attr("stroke-width", 2)
	                        .attr("fill", "none")
	                        .transition()
		             			.duration(3000)
	     	        			.attrTween("stroke-dasharray", function() {
	         				        var len = this.getTotalLength();
	                 				return function(t) {
	                 					return (d3.interpolateString("0," + len, len + ",0"))(t)
	                 				};
	                 			});
		 nodes.enter()
		 	.append('circle')
		 	.attr('class', 'team'+i)
		 	.attr('cx', function(d) {
		 		var tmpx = d.round * spacing
		 		return tmpx;
		 	})
		 	.attr('cy', function(d) {
		 		if(d.winner === team) {
		 			wins ++;
		 		}

		 		var tmpy = height - (wins * spacing) - margin

		 		return tmpy;
		 	})
		 	.attr('r', 4)
		 	.style("stroke", "black")
		 	.style('fill', function(d){
		 		if(d.winner === team)
		 			return 'gold';
		 		else
		 			return '#444444';
		 	})
		 	.on("mouseover", function(d, i) {
				return tooltip.style("visibility", "visible")
						  .style("top", (d3.mouse(this)[1])+"px")
						  .style("left",(d3.mouse(this)[0])+"px")
						  .html("<strong>"+d.hometeam+": </strong>"+d.homescore +"<br/>"+
						  		"<strong>"+d.awayteam+": </strong>"+d.awayscore +"<br/>");
			})
			.on("mouseout", function(d, i) {
				return tooltip.style("visibility", "hidden");
			});

			var tooltip = d3.select("body")
							.append("div")
							.style("background-color", "lightblue")
							.style("border-radius", "8px")
							.style("padding", "3px")
							.style("position", "absolute")
							.style("z-index", "10")
							.style("visibility", "hidden");
		 	//i = i + 1;
		 	listOfAllGames = [];

     });
}

/**
 * A method that returns a color
 * based on which team is currently selected
 */
function getColorOfLine(team, i) {
		 if(team == "Central Pulse") {
	     	lineColor = "yellow";
	     	displayKeys(team, i);
	     }
	     else if (team == "Melbourne Vixens") {
	     	lineColor = "cyan";
	     	displayKeys(team, i);
	     }
	     else if (team == "Queensland Firebirds") {
	     	lineColor = "purple";
		    displayKeys(team, i);
	     }
	     else if (team == "West Coast Fever") {
	     	lineColor = "green";
	     	displayKeys(team, i);
	     }
	     else if (team == "Canterbury Tactix") {
	     	lineColor = "gray";
	     	displayKeys(team, i);
	     }
	     else if (team == "Northern Mystics") {
	     	lineColor = "blue";
	     	displayKeys(team, i);
	     }
	     else if (team == "Waikato Bay of Plenty Magic") {
	     	lineColor = "black";
	     	displayKeys(team, i);
	     }
	     else if (team == "New South Wales Swifts") {
	     	lineColor = "red";
	     	displayKeys(team, i);

	     }
	     else if (team == "Southern Steel") {
	     	lineColor = "lightblue";
	     	displayKeys(team, i);

	     }
	     else if (team == "Adelaide Thunderbirds") {
	     	lineColor = "pink";
	     	displayKeys(team, i);

	     }
	     return lineColor;
}

function displayKeys(team, i) {
	/*make sure i is never 0 (on the first one)*/
	i = i + 1;

	/*For the first one, set offsetY to 100*/
	if(i === 1) {
		keyCounter = i;
		offsetY = 100;
		offsetX = margin + 40;
	}
	else if(i === 5) { //once there are 4 things selected, move x over and reset offsetY to 100
		keyCounter = 1;
	 	offsetY = 100;
	 	offsetX = margin + 350;
	}
	else {
		keyCounter = keyCounter + 1;
		offsetY = 65;
	}

	/*Debugging*/
	console.log(i);
	console.log(offsetY);
	console.log(offsetX);

	if(team === "Central Pulse") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=yellow><strong>Yellow Line</font></strong> = <strong>'+team);
	}
	else if(team === "Melbourne Vixens") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=cyan><strong>Cyan Line</font></strong> = <strong>'+team);
	}
	else if(team === "Queensland Firebirds") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter)) +"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=purple><strong>Purple Line</font></strong> = <strong>'+team);
	}
	else if(team === "West Coast Fever") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=green><strong>Green Line</font></strong> = <strong>'+team);
	}
	else if(team === "Canterbury Tactix") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=gray><strong>Gray Line</font></strong> = <strong>'+team);
	}
	else if(team === "Northern Mystics") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=blue><strong>Blue Line</font></strong> = <strong>'+team);
	}
	else if(team === "Waikato Bay of Plenty Magic") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=black><strong>Black Line</font></strong> = <strong>'+team);
	}
	else if(team === "New South Wales Swifts") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=red><strong>Red Line</font></strong> = <strong>'+team);
	}
	else if(team === "Southern Steel") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=lightblue><strong>LightBlue Line</font></strong> = <strong>'+team);
	}
	else if(team === "Adelaide Thunderbirds") {
		 keyTip1 = d3.select("body")
						.append("div2")
						.style("background-color", "gray")
						.style("border-radius", "8px")
						.style("padding", "3px")
						.style("position", "absolute")
						.style("z-index", "10")
						.style("top", (height + (offsetY * keyCounter))+"px")
						.style("left", (offsetX)+"px")
						.html('<font size="2" color=pink><strong>Pink Line</font></strong> = <strong>'+team);
	}
}
