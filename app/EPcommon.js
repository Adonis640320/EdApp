var sql = require('mssql');
var config = {
    server: 'localhost',
    database: 'EdadminTest',
    user: 'sa',
    password: 'password123',
    port: 49683,
    instancename: 'SQLEXPRESS'
};

module.exports = function(args){
var dbConn = new sql.Connection(config);	
    dbConn.connect().then(function() {
        console.log('Successfully connected to Ed-admin database');
    }).catch(function (err) {
        console.log(err);
    });
}