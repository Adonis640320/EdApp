var sql = require('mssql');
var config = {
    server: 'localhost',
    database: 'EdadminTest',
    user: 'sa',
    password: 'password123',
    port: 49683,
    instancename: 'SQLEXPRESS'
};

exports.getStudentListByClassId = function(request, res){
	var classId = request.query.classId;
	var conn = new sql.Connection(config);
	conn.connect().then(function () {
        var req = new sql.Request(conn);

        req.query("SELECT C.FirstName, C.LastName FROM Students AS C RIGHT JOIN (SELECT B.StudID FROM ARSubject AS A RIGHT JOIN ARAcad1 AS B ON A.ARSID = B.ARSID WHERE A.Class='"+
        	classId+
        	"') AS t ON C.StudentID = t.StudID").then(function(nameList){
        		res.send(nameList);
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });        
    })
    .catch(function (err) {
        console.log(err);
    });
}

exports.getClassList = function(req, res){
	var conn = new sql.Connection(config);
	conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT Class FROM ARSubject").then(function (recordset) {
        	var result = [];
        	recordset.forEach(function(item, index){
        		if(result.indexOf(item['Class']) == -1) result.push(item['Class']);
        	});
            conn.close();
			res.send(result);
        })
        .catch(function (err) {
            console.log(err);
            conn.close();
        });        
    })
    .catch(function (err) {
        console.log(err);
    });
}