/*
{"Red_Led":0,
"Green_Led":0,
"Yellow_Led":0,
"Blue_Led":0,"beep":0,
"temperature":20.000000,
"humidity":42.000000,
"Xg":0.936000,
"Yg":0.963300,
"Zg":0.003900,
"errType":2}
 */

var net = require('net')
var mysql = require('mysql');
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'django',
	port:3306
});

conn.connect();

net.createServer(function(socket){
	socket.on('data',function(data){
		// console.log('got:',data.toString());
		
		conn.query('SELECT * FROM mysite_status',function(err,rows,fields){
			if (rows[rows.length-1].num == 1) {
				socket.write("open");
				time = new Date().toLocaleString();
				conn.query('INSERT INTO mysite_status SET ?',{"num":"0","time":time},function(error,result,fields){
					if (error) throw error;
				})
			}else{
				socket.write("close");
			}
		})		
		var text =JSON.parse(data.toString());
		console.log(text);
		var arr = {};
		arr.tem = text.tem;
		arr.hum = text.hum;
		arr.feng = text.feng;
		arr.indoor = text.indoor;
		arr.time = new Date().toLocaleString();
		conn.query('INSERT INTO mysite_iotdata SET ?', arr, function(error,result,fields){
			if (error) throw error;
		});

	});
	socket.on('end',function(data){
		console.log('end');
	});

	
	 
}).listen(4001);

