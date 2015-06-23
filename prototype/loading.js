var textFile=[];
var arrayFile=[]; //if you want the variable to be global, remove "var"
store("data/2008-Table1.csv");


function store(text){
    var csvFile= new XMLHttpRequest();
    csvFile.open("GET", text, false);
    csvFile.onreadystatechange= function()
    {
     if(csvFile.readyState === 4){
         if(csvFile.statue === 200 || csvFile.status == 0){
           textFile = csvFile.responseText;
           document.getElementById("textSection").innerHTML = allText;
         }
     }
   };


    csvFile.send(null);


    //only include in the file everything after venue
    var n = textFile.search("Venue");
    textFile=textFile.slice(n+6,textFile.length+n+6);

    //replace all new lines with commas (because the CSV file is not actually a real CSV file
    textFile=textFile.replace(/\n/g, ",");

    //convert the text to elements in an array
    arrayFile=textFile.split(',');

    //systematically remove each of the "bye" lines
    for(i=0; i<arrayFile.length; i++){
     //if the string contains byes
     if(arrayFile[i].indexOf("BYES") != -1){
         //remove previous string(that is the round number
         arrayFile.splice((i-1),1);
         //remove empty string containing byes
         arrayFile.splice((i-1),1);
     }
    }
    //this leaves several empty values which need to be removed also
    arrayFile = arrayFile.filter(Boolean);
    //jsonify();
}




function jsonify(){
    for(i=0; i<arrayFile.length; i=i+7){
     var toPush = {
         "round" : arrayFile[i],
         "date" : arrayFile[i+1],
         "time" : arrayFile[i+2],
         "team1" : arrayFile[i+3],
         "score" : arrayFile[i+4],
         "team2" : arrayFile[i+5],
         "location" : arrayFile[i+6]
     };
     arrayJson.push(toPush);
    }
    myJson = JSON.stringify({arrayJson: arrayJson});
}
