var fsClient = new FamilySearch({
	client_id: 'a02j0000007rShWAAU',
	environment: 'sandbox',
	redirect_uri: 'http://localhost:8888/',
	http_function: $.ajax,
	deferred_function: $.Deferred,
	save_access_token: true,
	auto_expire: true,
	auto_signin: true
});

function run() {
	fsClient.getCurrentUser().then(function (response) {
		console.log(fsClient.settings.accessToken);
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8888/signedOn',
			data: {
				accessToken: fsClient.settings.accessToken
			}
		});

		for (var property in response.getUser()) {
			if (response.getUser().hasOwnProperty(property)) {
				console.log(property, " : ", response.getUser()[property]);
			}
		}

		$('#homeContent').append('Hello ' + response.getUser().givenName.toLowerCase() + ' ' + response.getUser().familyName.toLowerCase());
	});
};

$('#getStarted').on('click', run)
