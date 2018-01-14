var express = require('express');
var app = express();
var mysql=require('mysql');
var fs=require('fs');
const fileUpload = require('express-fileupload');
const formatMysql={host:'localhost',user:'root',password:'',database:'resep',port:3306};

app.use(fileUpload());
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
}).get('/bahan/:resep',function(req,res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from bahan where resep=:resep',{resep:req.params.resep},function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});
	c.end();
}).get('/langkah/:resep',function(req,res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from langkah where resep=:resep order by urut',{resep:req.params.resep},function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});
	c.end();
}).get('/gbr/:resep',(req,res)=>{
	var c=mysql.createConnection(formatMysql);
	c.connect();
	c.query('select gbr from resep where kode=:resep',{resep:req.params.resep},(e,r,f)=>{
		if(e)console.log(e);
		res.download('data/'+req.params.resep+'/'+r.gbr);
	});c.end();
}).post('/add/resep',function(res,req){
	if(req.files.gbr!==null&&req.params.kode!==null&&req.params.jenis!==null&&req.params.nama!==null&&req.files.ket!==null){
		let ket=req.files.ket;
		ket.mv('data/'+req.params.kode+'/'+ket.name,function(e){
			if(e)console.log(e);
			var c=mysql.createConnection(formatMysql);
			var isi='';
			c.connect();
			fs.readFile('data/'+req.params.kode+'/'+ket.name,(e,d)=>{
				isi=d.toString();
			});c.query('insert into resep values(:kode,:nama,:jenis,:ket,:gbr)',
			{kode:req.params.kode,nama:req.params.nama,jenis:req.params.jenis,ket:isi,gbr:req.files.gbr.name},
			function(e,r,f){
				req.files.gbr.mv('data/'+req.params.kode+'/'+req.files.gbr.name,(e)=>{
					res.send(JSON.stringify({error:null}));
				});
			});c.end();
		});
	}else res.send(JSON.stringify({error:'tolong diisi semua'}));
});
let extIP = require("ext-ip")();
extIP.get().then(ip => {
	app.listen(2101,ip);
}).catch(err => {
	app.listen(2101);
});