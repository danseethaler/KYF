var FS = require('familysearch-javascript-sdk'),
	request = require('request'),
	q = require('q');

var client = new FamilySearch({
	client_id: 'YOUR_CLIENT_ID_GOES_HERE',
	environment: 'sandbox',
	access_token: 'SOME_ACCESS_TOKEN',
	http_function: request,
	deferred_function: q.defer
});

client.getCurrentUser().then(function (response) {
	// now you have the response
});
