/**
 * Initialisation for Netball Visualisation Application
 * Say that 10 times fast
 *
 * Ewan Moshi & Myles Glass
 * 2015
 **/

var DATAPATH = 'data/';
var RAWDATA;
var TEAM_NAMES = [];
var TEAMS = [];
var GAMES = [];
var SEASONS = []; //array of seasons that are selected

var NZ = [
    'Central Pulse',
    'Northern Mystics',
    'Canterbury Tactix',
    'Waikato Bay of Plenty Magic',
    'Southern Steel'
]

var AUS = [
    'Melbourne Vixens',
    'Queensland Firebirds',
    'Adelaide Thunderbirds',
    'New South Wales Swifts',
    'West Coast Fever'
]

$(function() {

    console.log('-Netball Visualisation--');
    console.log('Ewan Moshi & Myles Glass');
    console.log('------------------------');
/*
   var year = '2008';

    if(year !== null) {
        var file = DATAPATH + year + '-Table1.csv';

        parseDataFile(file, year);

        year = '2009';
        file = DATAPATH + year + '-Table1.csv';
        parseDataFile(file, year);

        year = '2010';
        file = DATAPATH + year + '-Table1.csv';
        parseDataFile(file, year);

        year = '2011';
        file = DATAPATH + year + '-Table1.csv';
        parseDataFile(file, year);

        year = '2012';
        file = DATAPATH + year + '-Table1.csv';
        parseDataFile(file, year);

        year = '2013';
        file = DATAPATH + year + '-Table1.csv';
        parseDataFile(file, year);

        buildTeams();

      
        

    }*/
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

            // Byes
            if(d['Date'].substr(0,4) === 'BYES') {
                // do nothing
            } else {

            // Check if Team is already in list, if not, add it
            if($.inArray((d['Home Team']), TEAM_NAMES) == -1) {
                TEAM_NAMES.push(d['Home Team']);
            }
            if($.inArray((d['Away Team']), TEAM_NAMES) == -1) {
                TEAM_NAMES.push(d['Away Team']);
            }

            // calc scores
            var score = d['Score'];
            var hscore, ascore;
            // if draw, fuck it
            if(score.substr(0,4) === 'draw') {
                hscore = 'draw';
                ascore = 'draw';
            } else {    // split string, and parse for int
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

                GAMES.push(game); // add to array of games

            }
        });

    });

    console.log("Data File Parsed.")
}

function buildTeams() {

    // for each unique team we found on file
    TEAM_NAMES.forEach(function(team) {

        // create a bunch of variables
        var venue, country;
        var wins = 0;
        var losses = 0;
        var draws = 0;
        var points = 0;

        // TODO points

        if($.inArray(team, NZ) != -1) {
            country = 'NZ';
        } else if($.inArray(team, AUS) != -1) {
            country = 'AUS';
        } else {
            console.log(team+" is not currently in the ANZ Championship.");
        }

        // for each game
        GAMES.forEach(function(game) {
            // find home pitch if not already found
            if(venue === undefined && team === game.hometeam) {
                venue = game.venue;
            }
            // add wins, losses, draws, and points
            if (game.hometeam === team && game.homescore > game.awayscore) {
                wins++;
                points += 2;
            } else if(game.awayteam == team && game.awayscore > game.homescore) {
                wins++;
                points += 2;
            } else if(game.hometeam === team && game.homescore < game.awayscore ||
                        game.awayteam === team && game.awayscore < game.homescore){
                losses++;
            }
        });

        if(team === 'West Coast Fever' || team === 'Central Pulse') {
            draws = 1;
        }

        // create team object
        var tempTeam = {
            name : team,
            venue : venue,
            country : country,
            wins : wins,
            losses : losses,
            draws : draws,
            points : points
        };

        // add to team list.
        TEAMS.push(tempTeam);
    });

    console.log('Team Objects Constructed');
}

function gamesInYear(year) {
    var gameCount = 0;

    GAMES.forEach(function(game) {
        if(game.year === year) {
            gameCount++;
        }
    });

    console.log('Year '+year+' contains '+gameCount+ ' games.');
}


function getGamesForTeam(teamName) {
    GAMES.forEach(function(game) {
      //if the team we are looking for is involved in this game as home or away, add this game to team's list of games
      if(game.hometeam === teamName || game.awayteam === teamName) { 
        listOfAllGames.push(game); //push this game object/instance to array
      }
    });
}