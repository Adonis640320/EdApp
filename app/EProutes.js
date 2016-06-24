var classroom = require('./EPclassroom.js');
var proxy = require('./proxy.js');
module.exports = function(router) {

	// ROUTES FOR OUR API
	// =============================================================================

	// middleware to use for all requests
	router.use(function(req, res, next) {
		// do logging
		console.log('Something is happening.');
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
	router.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// proxy router
	router.route('/proxy')
		.get(proxy.getData)
	// ----------------------------------------------------

	router.route('/admin/assetment/classroom/save')
		.post(classroom.saveClassroom);
};