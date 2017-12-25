
module.exports = function (app) {

	var pg = require('pg');
	//DB connect string
	//var connect = 'postgres://yuval:admin@localhost/assignmentdb';
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
	});

	app.post('/api/favorites', function (req, res) {
		console.log(req.body);	 
		pool.connect(function(err , client , done){
			if(err) {
				return console.error('error fetching client from pool', err);
			}			 
			client.query('INSERT INTO favorite_websites (name, url) VALUES ('+ req.body.name + ',' + req.body.url +')',  function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}			 
				res.send(result.rows);
				done();
			});
		});
		
	});
	app.put('/api/favorites/:id', function (req, res) {		 	 
		pool.connect(function(err , client , done){
			if(err) {
				return console.error('error fetching client from pool:', err);
			}			 
		 	client.query(' UPDATE favorite_websites  SET name = ($1), url=($2) WHERE id = ($3)' ,[req.body.name, req.body.url, req.body.id]  , function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}			 
				res.send(result.rows);
				done();
			});
		});
		
	});

	app.delete('/api/favorites/:id', function (req, res) {		 	 
		pool.connect(function(err , client , done){
			if(err) {
				return console.error('error fetching client from pool:', err);
			}			 
		 	client.query('DELETE FROM  favorite_websites  WHERE id = ($1)' ,[req.body.id]  , function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}			 
				res.send(result.rows);
				done();
			});
		});
		
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