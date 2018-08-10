// ============================
// LOAD DATA
// Link routes to a series of "data" sources. 
// Holds arrays of info for friends
// ============================

var friends 		= require('../data/friends.js');


// ============================
// ROUTING
// ============================

module.exports = function(app){

	// API GET Requests
	// Below code handles when users "visit" a page. 
	// -------------------------

	app.get('/api/friends', function(req, res){
		res.json(friends);
	});


	// API POST Requests
	// Handles form submit
	// User submits JSON and it is pushed to array
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){

		// loop through all options 
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

		// Result of survey POST and parse it.
		var userData 	= req.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		// This var calculates difference of scores
		var totalDifference = 0;

		// Loop through friend possibilities
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// Loop through scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// Difference of scores
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If sum is less than difference best match
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}


		// return users best friend
		friends.push(userData);

		// Return JSON best match
		res.json(bestMatch);

	});

}