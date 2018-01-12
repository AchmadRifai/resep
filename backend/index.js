var express = require('express');
var app = express();
var mysql=require('mysql');
const formatMysql={host:'localhost',user:'root',password:'',database:'resep'};

app.get('/', function(req, res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from resep',function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});
	c.end();
});
app.get('/bahan/:resep',function(req,res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from bahan where resep=:resep',{resep:req.params.resep},function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});
	c.end();
});
app.get('/langkah/:resep',function(req,res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from langkah where resep=:resep order by urut',{resep:req.params.resep},function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});
	c.end();
});
app.listen(2101);