
module.exports = function (app) {

	var pg = require('pg');
	//DB connect string
	var connect = 'postgres://yuval:admin@localhost/assignmentdb';
	var pool = new pg.Pool({
		user: 'yuval',
		host: 'localhost',
		database: 'assignmentdb',
		password: 'admin',
		port: 5432,
	});
	/* API */

	// get all contacts
	app.get('/api/favorites', function (req, res) {
		 
		pool.connect(function(err , client , done){
			if(err) {
				return console.error('error fetching client from pool', err);
			}
			 
			client.query('SELECT * FROM favorite_websites',  function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}
			 
				res.send(result.rows);
				done();
			});
		});
		//res.send('get /api/contacts');
	});

	// get all contacts
	app.get('/api/contacts', function (req, res) {

		res.send('get /api/contacts');
	});

	// get contact form data and do someething ...
	app.post('/api/contact', function (req, res) {

		res.send('post /api/contacts');
	});


	/* APPLICATION */
	app.get('*', function (req, res) {
		// load index.html otherwise
		res.sendfile('./public/app/index.html');
	});
};