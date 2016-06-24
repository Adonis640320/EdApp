var sql = require('mssql');

exports.saveClassroom = function(req, res){
	var classInfo = req.params.body['classInfo'];
	var transaction = new sql.Transaction();
	transaction.begin(function(err) {
		if(err) return;
	    var request = new sql.Request(transaction);
	    request.query('insert into ARClassDetail (CID, Sort, Type, Pos, Bounding, TextBounding, Text, SizeOffset, SizeScale) values (12345,1,"11", "1", "2","2","3")', function(err, recordset) {
	        transaction.commit(function(err, recordset) {
	            console.log("Transaction committed.");
	        });
	    });
	});
}