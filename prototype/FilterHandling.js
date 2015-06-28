  /**
   * Initialisation for Netball Visualisation Application
   * Say that 10 times fast
   *
   * Ewan Moshi & Myles Glass
   * 2015
   **/

var selectedTeam;
var selectedLocation;
var selectedOpponent;

$('.btn-season').on('click', function (e) {
    /*Check state of buttons to see if they are being clicked or unclicked
      If they are being clicked, store the year and read that file, else don't read*/
    if($(this).text() === "2008" && (!($(this).hasClass('active')))) {
      var year = 2008;
      SEASONS.push(year);
    }
    else if($(this).text() === "2009" && (!($(this).hasClass('active')))) {
      var year = 2009;
      SEASONS.push(year);
    }
    else if($(this).text() === "2010" && (!($(this).hasClass('active')))) {
      var year = 2010;
      SEASONS.push(year);
    }
    else if($(this).text() === "2011" && (!($(this).hasClass('active')))) {
      var year = 2011;
      SEASONS.push(year);  
    }
    else if($(this).text() === "2012" && (!($(this).hasClass('active')))) {
      var year = 2012;
      SEASONS.push(year);
    }
    else if($(this).text() === "2013" && (!($(this).hasClass('active')))) {
      var year = 2013;
      SEASONS.push(year);
    }


    /*Check if the button is being unclicked. If true, remove this year from the array of seasons selected*/
    if($(this).text() === "2008" && $(this).hasClass('active')) {
      var index = SEASONS.indexOf(2008); //find index of this year "2008"
        if (index > -1) { 
          SEASONS.splice(index, 1); //remove from array this year and return new array with items shuffled down
        }
    }
    else if($(this).text() === "2009" && $(this).hasClass('active')) {
      var index = SEASONS.indexOf(2009); 
        if (index > -1) { 
          SEASONS.splice(index, 1); 
        }
    }
    else if($(this).text() === "2010" && $(this).hasClass('active')) {
      var index = SEASONS.indexOf(2010); 
        if (index > -1) { 
          SEASONS.splice(index, 1); 
        }
    }
    else if($(this).text() === "2011" && $(this).hasClass('active')) {
      var index = SEASONS.indexOf(2011); 
        if (index > -1) { 
          SEASONS.splice(index, 1); 
        }
    }
    else if($(this).text() === "2012" && $(this).hasClass('active')) {
      var index = SEASONS.indexOf(2012); 
        if (index > -1) { 
          SEASONS.splice(index, 1); 
        }
    }
    else if($(this).text() === "2013" && $(this).hasClass('active')) {
      var index = SEASONS.indexOf(2013);
        if (index > -1) { 
          SEASONS.splice(index, 1); 
        }
    }

    /*Set the array of GAMES to be empty, then fill it with the games of all the seasons currently selected*/
    GAMES = [];
    SEASONS.forEach(function(season) { //for each season
        var file = DATAPATH + season + '-Table1.csv';
         parseDataFile(file, season); //parse current season in SEASONS
    });
 });


 /*When a drop down menu is selected, store the selected value and update the drop down menu to display selected item
  ========EVENT HANDLER FOR TEAM SELECT==============**/
$(".teamselectdropdown li").click(function(event) {
  selectedText = $(this).text(); //store the selected text in a variable
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selectedText+' <span class="caret"></span>'); //update the drop down menu's text
});

 /*========EVENT HANDLER FOR SEASON SELECT==============**/
$(".locationselectdropdown li").click(function(event) {
  selectedText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selectedText+' <span class="caret"></span>');
});

 /*========EVENT HANDLER FOR OPPONENT SELECT==============**/
$(".opponentselectdropdown li").click(function(event) {
  selectedText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selectedText+' <span class="caret"></span>');
});

