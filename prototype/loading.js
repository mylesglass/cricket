var Table2008 = []; //array containing 2008 results

Table2008.push(new instance("1","Saturday 5 April", "2:30 pm","Central Pulse","33–50","Melbourne Vixens","TSB Bank Arena, Wellington"));
Table2008.push(new instance("1", "Sunday 6 April", "1:00 pm", "Queensland Firebirds", "48–46", "West Coast Fever", "Brisbane Convention & Exhibition Centre"));


function instance (round, date, Time, homeTeam, score, awayTeam, venue) {
    this.round = round;
    this.date = date;
    this.Time = Time;
    this.homeTeam = homeTeam;
    this.score = score;
    this.awayTeam = awayTeam;
    this.venue = venue;
}
