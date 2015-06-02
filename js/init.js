"use strict";

/**
 * Initialisation for Netball Visualisation Application
 * Say that 10 times fast
 * 
 * Ewan Moshi & Myles Glass
 * 2015
 **/

var rawDataObjects;

$(function() {
    console.log("Big shout out to batman for being an above average super hero. Thanks man");

  
    // Parse Data
    parseData();
    
    
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
function parseData() {
  if( $( '#file' ).type() === 'undefined') {
    console.log('do nothing');
  }
  
  else {
    // for each data file in /data/
    var datafile = $('#file');
  
    rawDataObjects = $.csv.toObjects(datafile);
  }
};