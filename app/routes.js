

module.exports = function(app) {
	/* API */
	
	// get all contacts
	app.get('/api/contacts', function(req, res) {

		res.send('get /api/contacts');
	});
	
	// get contact form data and do someething ...
	app.post('/api/contact', function(req, res) {

        res.send('post /api/contacts');
	});
	

	/* APPLICATION */
	app.get('*', function(req, res) {
		// load index.html otherwise
		res.sendfile('./public/app/index.html');
	});
};