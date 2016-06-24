// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app        = express();
var path        = require("path");
var morgan     = require('morgan');
require('./app/EPcommon.js')(process.argv); // set environment
// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use the session middleware
app.use(cookieParser());

//-------------
var port     = process.env.PORT || 8000; // set our port
// CREATE OUR ROUTER
var router = express.Router();
require('./app/EProutes.js')(router);
// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// POST method route
var sql = require('mssql');
var config = {
    server: 'localhost',
    database: 'EdadminTest',
    user: 'sa',
    password: 'password123',
    port: 49683,
    instancename: 'SQLEXPRESS'
};

app.post('/admin/assetment/classroom/save', function(req, res){
    var classInfo = req.body.classInfo;
    var classId = req.body.cid;
    var conn = new sql.Connection(config);
    console.log('ClassId' + classId);
    console.log('ClassInfo' + classInfo);
    conn.connect().then(function() {
        var req = new sql.Request(conn);
        classInfo.forEach(function(item, index){
            req.query("INSERT INTO EPClassDetail (Class) VALUES ('"+classId+"')");
        });       
        conn.close;
        res.send('success');
    })
    .catch(function (err) {
//        console.log(err);
    });
});

//    

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Connecting to server on port:' + port);
app.use(function(req, res, next) {
    
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }

});

app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header('Access-Control-Allow-Headers', 'Content-Type');
       next();
});

//select the rootPath
app.use(express.static(path.join(__dirname, "front")));