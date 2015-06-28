/**
	Visualisations for Netball in D3.JS
	Ewan Moshi & Myles Glass
**/

var svg, width, height, margin;

$(function() {

	// Create Drawing Area for d3
	width = $('#vis').width();
	height = $('body').height();
	margin = width * 0.05;

	svg = d3.select('#vis').append('svg')
		.attr('width', width)
		.attr('height', height);

	console.log("SVG Created");

	TeamView();

});


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



	//TeamViewUpdate(prompt('Team', 'Northern Mystics'));

	

}

function TeamViewUpdate(team) {

	getGamesForTeam(team);

	var circles = svg.selectAll('circle').data(listOfAllGames, function(d) {

		return d.id;
	});

	circles.enter()
		insert("svg:circle")
	.attr("cx", function (d) { return d.value1; })
	.attr("cy", function (d) { return d.value2; })
	.style("fill", "red");

	circles.transition().duration(1000)
		.attr("cx", function (d) { return d.value1; })
		.attr("cy", function (d) { return d.value2; })
		.attr("r", function (d) { return d.value3; });

	circles.exit ()
		.transition().duration(1000)
		.attr("r", 0)
	.remove ();


	setTimeout (update, 2000);
}