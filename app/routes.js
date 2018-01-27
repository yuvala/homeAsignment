
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
	 	getfromDb(res);
	});
	app.get('/api/actionlog', function (req, res) {	
		getActionLogfromDb(res);
   });

	app.post('/api/favorites', function (req, res) {
		var success = true;	
		//'console.log('POST',req.body);	 
		pool.connect(function(err , client , done){
			if(err) {
				return console.error('error fetching client from pool', err);
			}	
		 	 
			client.query('INSERT INTO favorite_websites (name, url) VALUES (($1),($2))',[req.body.name , req.body.url],  function(err, result){				 
				if(err) {
					success = false;
					return console.error('error running query', err, result);
				}			 
				res.send(result.rows);
				done();
				 
			});
			if(success){
				logIt(client, 'insert', req.body.name , req.body.url);
			}
			
		});
		
	});
	app.put('/api/favorites/:id', function (req, res) {		
		var success = true;	 	 
		pool.connect(function(err , client , done){
			if(err) {
				success = false;
				return console.error('error fetching client from pool:', err);
			}			 
		 	client.query(' UPDATE favorite_websites  SET name = ($1), url=($2) WHERE id = ($3)' ,[req.body.name, req.body.url, req.body.id]  , function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}			 
				res.send(result.rows);
				done();
			});
			if(success){
				logIt(client, 'update', req.body.name , req.body.url);
			}
		});
		
	});

	app.delete('/api/favorites/:id', function (req, res) {			
		var success = true;	
		var name='ss',url='sss';
		pool.connect(function(err , client , done){
			if(err) {
				success = false;
				return console.error('error fetching client from pool:', err);
			}	
			client.query(' SELECT name, url FROM  favorite_websites  WHERE id = ($1)' ,[req.params.id]  , function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}			 
				   name = result.rows[0].name;
				   url = result.rows[0].url;				 
			});

			client.query('DELETE FROM  favorite_websites  WHERE id = ($1)' ,[req.params.id]  , function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}	
				res.send(result.rows);
				done();				
			});
			if(success){
				logIt(client, 'delete', name ,url);
			}
						
		});
		
	});
	

	function logIt(client, action ,name, url) {
		client.query('INSERT INTO action_logs_table (action, web_name, url) VALUES (($1),($2),($3))', 
		[action ,name,url], 
		function (err, result) {
			if (err) {
				return console.error('error running query', err);
			}			 		 
		});
	}
	 
	/* APPLICATION */
	app.get('*', function (req, res) {	
	res.sendFile(__dirname + '/index.html');
	});
	 


	function getfromDb(res){
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

	};
	function getActionLogfromDb(res){
		pool.connect(function(err , client , done){			 
			if(err) {
				return console.error('error fetching client from pool', err);
			}			 
			client.query('SELECT * FROM action_logs_table',  function(err, result){				 
				if(err) {
					return console.error('error running query', err, result);
				}	
				res.send(result.rows);
				done();
			});
		});	

	};
};