/**
	Visualisations for Netball in D3.JS
	Ewan Moshi & Myles Glass
**/

var svg, width, height, margin, tip;

$(function() {

	// Create Drawing Area for d3
	width = $('#vis').width();
	height = $('body').height();
	margin = width * 0.05;

	svg = d3.select('#vis').append('svg')
		.attr('width', width)
		.attr('height', height);

	console.log("SVG Created");

	tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });

	TeamView();

});


/**
	Season View
		Displays teams progression throughout a season.
		Pretty dope tbh.
**/
function SeasonView () {
	
}


/* 
Team View
	This right here is the team view mode. 
	It shows a teams progress thorughout a season or seasons
	Mainly it displays wins and losses.
*/
function TeamView() {
	// Set Axii, and labels

	// x axis line
	svg.append('line')
		.attr('x1', margin)
		.attr('y1', height / 2)
		.attr('x2', width - margin)
		.attr('y2', height / 2)
		.attr('class', 'graph-line');
	svg.append('text') // label
		.attr('x', width / 2)
		.attr('y', height - margin)
		.text('games');

	// y axis line
	svg.append('line')
		.attr('x1', margin)
		.attr('y1', margin)
		.attr('x2', margin)
		.attr('y2', height - margin)
		.attr('class', 'graph-line');
	svg.append('text') //label
		.attr('x', margin)
		.attr('y', height / 2)
		.attr('transform', function() {
			return 'rotate(-90,' + (margin) + ',' + (height/2 + 5) + ')';
		})
		.text('win/loss');

}

function TeamViewUpdate(team) {

	update();

	

	getGamesForTeam(team);

	// Bind nodes to date
	var circles = svg.selectAll('circle').data(listOfAllGames, function(d) {
		return d.date;
	});

	// 
	var spacing = (width - (margin * 2)) / listOfAllGames.length; // x axis lenght divided by number of games
	var count = 0;
	var range = 25;
	var yRange = d3.scale.linear()
		.range([0,($('svg').height() / 2) - margin] )
		.domain([0, range]);

	circles.enter()
		.append("circle")
		.attr("cx", function (d) { 
			count++;
			return margin + (count * spacing);
		})
		.attr("cy", function (d) { 

			var goalDiff = Math.abs(d.homescore - d.awayscore);

			if(team === d.winner) {
				console.log('winner!');

				return (height / 2) - yRange(goalDiff);

				
			} else if (d.winner === 'draw') {
				return (height / 2);
			} else {
				return (height / 2) + yRange(goalDiff);
			}
			
		})
		.attr('r', 5)
		.style("fill", "#003399")
		.on("mouseover", function(d) {
			var selectedNode = d3.select(this)
				.style({opactiy: '0.5'});
		});


}