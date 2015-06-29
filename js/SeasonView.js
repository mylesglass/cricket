var options = [];
var selectedSeason, selectedText;

$( document ).ready(function() {
    options = [];
});

$( '.dropdown-menu-seasons a' ).on( 'click', function( event ) {

   var $target = $( event.currentTarget ),
       val = $target.attr( 'data-value' ),
       $inp = $target.find( 'input' ),
       idx;

   if ( ( idx = options.indexOf( val ) ) > -1 ) {
      options.splice( idx, 1 );
      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
   } else {
      options.push( val );
      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
   }

   $( event.target ).blur();
      
   console.log( options );
   return false;
});

// Season Select
$('.dropdown-season li').click(function(event) {
    selectedSeason = $(this).text();
    selectedText = $(this).text();
    console.log(selectedText);
    // Change toggle to name of selected season
    $(this).parents('.btn-group').find('.dropdown-toggle').html(selectedText+' <span class="caret"></span>');
});


// Season View Update button
$('.btn-update-season').click(function(event) {
    if(options.length === 0) {
        alert("Please Select a Team");
    } else if (selectedText === null) {
        alert("Please Select a Season");
    } else {
        console.log("Season chosen: " + selectedSeason);
        parseDataFile(DATAPATH + selectedSeason + '-Table1.csv');
        // update();
        // options.forEach(function(team) {
        //     drawTeamSeason(team, selectedSeason);
        // });
      drawTeamSeason();
       GAMES.length = 0;
       listOfAllGames.length = 0;
    }
});
