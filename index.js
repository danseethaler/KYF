var FS = require('familysearch-javascript-sdk'),
	request = require('request'),
	q = require('q'),
	express = require('express'),
	bodyParser = require("body-parser");

var app = express();

app.use(express.static('static'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.post('/signedOn', function (req, res) {

	console.log(req.body.accessToken);

	var client = new FS({
		client_id: 'a02j0000007rShWAAU',
		environment: 'sandbox',
		access_token: req.body.accessToken,
		http_function: request,
		deferred_function: q.defer
	});

	client.getCurrentUser().then(function (response) {
		var user = response.getUser();
		console.log('Hellooo0o ');
		console.log(user);
	});
});

app.listen(8888);
