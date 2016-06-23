var sql = require('mssql');
//2.
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
    	var table = new sql.Table('ARClassDetail');
		table.create = true;
/*		table.columns.add('CID', sql.Int, {nullable: true, primary: true});
		table.columns.add('Sort', sql.Int, {nullable: false});
		table.columns.add('Type', sql.String, {nullable: false});
		table.columns.add('Pos', sql.String, {nullable: false});
		table.columns.add('Bounding', sql.String, {nullable: false});
		table.columns.add('TextBounding', sql.String, {nullable: false});
		table.columns.add('Text', sql.String, {nullable: false});
		table.columns.add('SizeOffset', sql.Float, {nullable: false});
		table.columns.add('SizeScale', sql.Float, {nullable: false});
		
        var request = new sql.Request(dbConn);
        request.query("select * from ARSubject").then(function (recordSet) {
            console.log(recordSet);
            dbConn.close();
        }).catch(function (err) {
            //8.
            console.log(err);
            dbConn.close();
        });*/
    }).catch(function (err) {
        console.log(err);
    });
}