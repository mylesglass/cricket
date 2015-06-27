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

var GAMES = [];

$(function() {

    console.log('-Netball Visualisation--');
    console.log('Ewan Moshi & Myles Glass');
    console.log('------------------------');

    var year = prompt('Enter a year bro', '2008'); //TODO change this

    if(year !== null) {
        var file = DATAPATH + year + '-Table1.csv';

        parseDataFile(file, year);
    }

    printTeams();


});

/**
 * Data Parser
 * Takes any csv files within the ./data/ directory and constructs usable
 * data structures from them.
 *
 * 	requires at least one data file, in correct syntax to be present
 *      file : string path to data file
 *      year : year of file.
 * 	syntax: Round Date Time(optional) HomeTeam Score AwayTeam Venue
 * */
function parseDataFile(file, year) {
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
            if($.inArray((d['Away Team']), TEAMS) == -1) {
                TEAMS.push(d['Away Team']);
            }

            //
            var score = d['Score'];
            var hscore, ascore;

            if(score.substr(0,4) === 'draw') {
                hscore = 'draw';
                ascore = 'draw';
            } else {
                hscore = parseInt(score.substr(0,2));
                ascore = parseInt(score.substr(3,5));
            }

            // Create game objects for each
            var game = {
                round : d['Round'],
                date : d['Date'],
                year : year,
                time : d['Time'],   // Note, time may be undefined
                hometeam : d['Home Team'],
                awayteam : d['Away Team'],
                homescore : hscore,    // I'm assuming no one scores over 100 lol
                awayscore : ascore,
                venue : d['Venue']
            };

            GAMES.push(game);


        });

        console.log(TEAMS);
        console.log(GAMES[0]);

    });
}

function printTeams() {
    TEAMS.forEach(function printTeam(value) {
        $('#vis').append('<h5>'+value'</h5>');
    });
}
