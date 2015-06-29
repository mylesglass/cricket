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

	parseDataFile('data/2008-Table1.csv', '2008');


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

var selected_Season;

function drawTeamSeason() {

	update();

	listOfAllGames = [];
	
	d3.selectAll("circle").remove();

	var i = 0;
    options.forEach(function(team, i) {
		getGamesForTeam(team);

		var wins = 0;

		var nodes = svg.selectAll('team'+i).data(listOfAllGames, function(d) {
			return d.round;
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
			i = i + 1;
     });
}