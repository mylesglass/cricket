var selectedText;
var teamData = {};

$('#2008').on('click', function (e) {
  file = "2008-Table1.csv";
  readData();
});

/*When a drop down menu is selected, store the selected value*/
$(".dropdown-menu li").click(function(event){
  selectedText = $(this).text();
  $(this).parents('.btn-group').find('.dropdown-toggle').html(selectedText+' <span class="caret"></span>');
});

/*This doesn't work for our one but it's just an example from the bootstrap tutorials*/
$(".dropdown").on("show.bs.dropdown", function(event){
    var x = $(event.relatedTarget).text(); // Get the text of the element
    alert(x);
});

function readData() {

  //Get the value of the each checked button
  var checkedYearValue = '2008';
  var checkedCountryValue = 'nz';
  var checkedSeasonValue = 'regular';

  //map to get the names of the data files
  var yearToFilename = {
    2008: "data/2008-Table1.csv",
    2009: "data/2009-Table1.csv",
    2010: "data/2010-Table1.csv",
    2011: "data/2011-Table1.csv",
    2012: "data/2012-Table1.csv",
    2013: "data/2013-Table1.csv"
  };

  //A list showing which team belong to which country
  var teamToCountry = {
    nz: ["Central Pulse", "Northern Mystics", "Waikato Bay of Plenty Magic", "Southern Steel", "Canterbury Tactix"],
    aus: ["New South Wales Swifts", "Adelaide Thunderbirds", "Melbourne Vixens", "West Coast Fever", "Queensland Firebirds"],
    both: ["Central Pulse", "Northern Mystics", "Waikato Bay of Plenty Magic", "Southern Steel", "Canterbury Tactix", "New South Wales Swifts", "Adelaide Thunderbirds", "Melbourne Vixens", "West Coast Fever", "Queensland Firebirds"]
  };

  //A list showing which round corresponds to regular, finals and both
  var seasonToRound = {
    bothSeasons: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
    regular: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
    finals: ["15", "16", "17"]
  }

  //Get the filename given the year
  var fileName = "data/2008-Table1.csv";

  d3.csv(fileName, function (data) {
       //Gather all data for each team depending on which country is seleceted
       teamToCountry[checkedCountryValue].forEach(function (element) {
           var d = [];
           data.forEach(function (row) {
               //Add rows based on round number
               if (row["Home Team"] === element || row["Away Team"] === element) {
                   seasonToRound[checkedSeasonValue].forEach(function (round) {
                       if (row["Round"] === round) {
                           d.push(row);
                       }
                   });
               }
           });
           teamData[element] = d;
       });
   });
}
