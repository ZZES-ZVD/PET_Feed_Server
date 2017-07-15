var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
app = express();
app.use('/static',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//数据库配置
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'django',
	port:3306
});
//连接数据库
conn.connect();


//设置所有路由无限制访问，不需要跨域
app.all('*',function(req,res,next){
 	res.header("Access-Control-Allow-Origin","*");
 	res.header("Access-Control-Allow-Headers","X-Requested-With");
 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
 	res.header("X-Powered-By",'3.2.1');
 	res.header("Content-Type","application/json;charset=utf-8");
 	next();
})

 
//温度
app.post('/test',function(req,res){
	console.log(req.body);
	res.send(req.body);
})


//端口：3000
var server = app.listen(3000,function(){
 

	console.log("127.0.0.1:3000");
})
