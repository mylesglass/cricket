/**
 * Initialisation for Netball Visualisation Application
 * Say that 10 times fast
 *
 * Ewan Moshi & Myles Glass
 * 2015
 **/

var DATAPATH = 'data/';

var RAWDATA;

var TEAMS = [];

$(function() {

    console.log('-Netball Visualisation--');
    console.log('Ewan Moshi & Myles Glass');
    console.log('------------------------');

    var year = prompt('Enter a year bro', '2008');

    if(year !== null) {
        var file = DATAPATH + year + '-Table1.csv';

        parseDataFile(file);
    }


    // Parse Data



});

/**
 * Data Parser
 * Takes any csv files within the ./data/ directory and constructs usable
 * data structures from them.
 *
 * 	requires at least one data file, in correct syntax to be present
 *
 * 	syntax: Round Date Time(optional) HomeTeam Score AwayTeam Venue
 * */
function parseDataFile(file) {
    console.log('Parsing file '+file);

    // using d3's built in csv parsing
    d3.csv(file, function(data) {

        RAWDATA = data;

        RAWDATA.forEach(function(d) {

            // Check if Team is already in list, if not, add it
            console.log("Constructing Team List");
            if($.inArray((d['Home Team']), TEAMS) == -1) {
                TEAMS.push(d['Home Team']);
            }

        });

        console.log(TEAMS);

    });
}
