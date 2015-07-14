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
		var user = response.getUser();

		var thisUser = {};

		thisUser.contactName = user.contactName;
		thisUser.helperAccessPin = user.helperAccessPin;
		thisUser.givenName = user.givenName;
		thisUser.familyName = user.familyName;
		thisUser.email = user.email;
		thisUser.country = user.country;
		thisUser.gender = user.gender;
		thisUser.birthDate = user.birthDate;
		thisUser.preferredLanguage = user.preferredLanguage;
		thisUser.displayName = user.displayName;
		thisUser.personId = user.personId;
		thisUser.treeUserId	= user.treeUserId;

		fs.writeFile('user.json', JSON.stringify(thisUser, null, 4), function (err) {
			console.log('File successfully written.');
		})

	});
});

app.listen(8888);
