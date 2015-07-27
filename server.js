var FamilySearch = require('familysearch-javascript-sdk'),
	request = require('request'),
	q = require('q'),
	fs = require('fs'),
	express = require('express'),
	bodyParser = require("body-parser");

var app = express();

app.use(express.static('static'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.post('/signedOn', function (req, res) {

	console.log(req.body.accessToken);

	var client = new FamilySearch({
		client_id: 'a02j0000007rShWAAU',
		environment: 'sandbox',
		access_token: req.body.accessToken,
		http_function: request,
		deferred_function: q.defer
	});

	client.getCurrentUser().then(function (response) {
		console.log("response : ");
		console.log(response);
		var user = response.getUser();

		var thisUser = {
			contactName: user.contactName,
			helperAccessPin: user.helperAccessPin,
			givenName: user.givenName,
			familyName: user.familyName,
			email: user.email,
			country: user.country,
			gender: user.gender,
			birthDate: user.birthDate,
			preferredLanguage: user.preferredLanguage,
			displayName: user.displayName,
			personId: user.personId,
			treeUserId: user.treeUserId
		};

		fs.writeFile(thisUser.personId + '.json', JSON.stringify(thisUser, null, 4), function (err) {
			console.log('File successfully written.');
		})

	});
});

console.log("Listening on port 8888");
app.listen(8888);
