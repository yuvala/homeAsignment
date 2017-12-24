// set up ======================================================================
var express  = require('express');

var app      = express(); 	
var path  = require('path');						// create our app w/ express
var port  	 = process.env.PORT || 9090;

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)

var cons = require('consolidate');
var dust = require('dustjs-helpers');
var pg = require('pg');

//DB connect string
var connect = 'postgres://yuval:admin@localhost/assignmentdb';

//assign Dust Engine to .Dust files
app.engine('dust', cons.dust);

//Set Default Ext .dust
app.set('view engine', 'dust');

app.use(express.static(path.join(__dirname , '/public/app'))); 				// set static path
//app.use(express.static(__dirname + '/public/app')); 				// set static path
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json




// routes 
require('./app/routes.js')(app);


app.get('a/api/favorites', function (req, res) {
    console.log('00000000000000000');
    pg.connect(connect,function(err , client , done){
        console.log('1');
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        console.log('2');
        client.query('SELECT * FROM favorite_websites',  function(err){
            if(err) {
                return console.error('error running query', err, result);
            }
            res.render({list:result.rows});
            done();
        });
    });
    res.send('get /api/contacts');
});

app.listen(port);
console.log("App listening on port " + port);
 