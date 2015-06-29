/**
	Visualisations for Netball in D3.JS
	Ewan Moshi & Myles Glass
**/

var svg, width, height, margin, tip, x, y, xAxis, yAxis, spacing;

$(function() {

	// Create Drawing Area for d3
	margin = 20;
	width = $('#vis').width() - (margin * 2);
	height = 500;
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

	     var lineGraph = svg.append("path")
	                        .attr("d", lineFunction(lineData))
	                        .attr("stroke", "blue")
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
		 	.attr('r', 3)
		 	.style('fill', function(d){
		 		if(d.winner === team)
		 			return 'gold';
		 		else
		 			return '#444444';
		 	});
		 	//i = i + 1;
		 	listOfAllGames = [];

     });
}