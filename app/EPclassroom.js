var sql = require('mssql');
var config = {
    server: 'localhost',
    database: 'EdadminTest',
    user: 'sa',
    password: 'password123',
    port: 49683,
    instancename: 'SQLEXPRESS'
};

exports.saveClass = function(req, res){
	var classInfo = req.params.body['classInfo'];
	var transaction = new sql.Transaction();
	transaction.begin(function(err) {
		if(err) return;
	    var request = new sql.Request(transaction);
	    request.query('insert into EPARClassDetail (CID, Sort, Type, Pos, Bounding, TextBounding, Text, SizeOffset, SizeScale) values (12345,1,"11", "1", "2","2","3")', function(err, recordset) {
	        transaction.commit(function(err, recordset) {
	            console.log("Transaction committed.");
	        });
	    });
	});
}

exports.getStudentListByClassId = function(request, res){
	var classId = request.query.classId;
	var conn = new sql.Connection(config);
	conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT ARSID FROM ARSubject WHERE Class='" + classId + "'").then(function (ARSIDs) {
        	var result = [];
        	var allStudentList = [];
        	var tIndex = ARSIDs.length;
        	var zIndex = 0;
        	ARSIDs.forEach(function(item , index){
        		req.query("SELECT StudID FROM ARAcad1 WHERE ARSID='" + item['ARSID'] + "'").then(function (studentIds) {
        			var studentIdList = [];
        			studentIds.forEach(function(item, index){
        				if(studentIdList.indexOf(item['StudID']) == -1)
        					studentIdList.push(item['StudID']);
        			});
        			var ttIndex = studentIdList.length;
        			var zzIndex = 0;
        			studentIdList.forEach(function(item, index){
						req.query("SELECT StudentID, FirstName, LastName FROM Students WHERE StudentID='" + item + "'").then(function (studentInfo) {
							console.log(studentInfo)
							result.push(studentInfo);
							zzIndex ++;
							if((ttIndex -1) == zzIndex){
								console.log()
								zIndex++;
				        		if((tIndex - 1) == zIndex){
				        			conn.close();
						    		res.send(result);        			
				        		}
							}
				    	})
						.catch(function(err){
							console.log(err);
						});
		    		});
        		})
        		.catch(function (err){
        			console.log(err)
        		});
        	});
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