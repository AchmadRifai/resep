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
	});c.end();
}).get('/bahan/:resep',function(req,res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from bahan where resep=:resep',{resep:req.params.resep},function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});c.end();
}).get('/langkah/:resep',function(req,res){
	var c=mysql.createConnection(formatMysql);
	c.connect();
	var result=[];
	c.query('select*from langkah where resep=:resep order by urut',{resep:req.params.resep},function(e,r,f){
		if(e)console.log(e);
		result=r;
		res.send(JSON.stringify(result));
	});c.end();
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
}).post('/add/bahan',(res,req)=>{
	if(!req.params.resep&&!req.params.nama&&!req.params.jum&&!req.params.satuan){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('insert into bahan values(:resep,:nama,:jum,:satuan)',
		{resep:req.params.resep,nama:req.params.nama,jum:req.params.jum,satuan:req.params.satuan},
		(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});c.end();
	}else res.send(JSON.stringify({error:'isilah semua'}));
}).post('/add/langkah',(res,req)=>{
	if(!req.params.resep&&!req.params.ket&&!req.params.urut){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('insert into langkah values(:resep,:ket,:urut)',{resep:req.params.resep,ket:req.params.ket,urut:req.params.urut},(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});c.end();
	}else res.send(JSON.stringify({error:'isilah semua'}));
}).post('/update/resep',(res,req)=>{
	if(req.files.gbr!==null&&req.params.kode!==null&&req.params.jenis!==null&&req.params.nama!==null&&req.files.ket!==null&&null!==req.params.kode1){
		let ket=req.files.ket;
		ket.mv('data/'+req.params.kode+'/'+ket.name,function(e){
			if(e)console.log(e);
			var c=mysql.createConnection(formatMysql);
			var isi='';
			c.connect();
			fs.readFile('data/'+req.params.kode+'/'+ket.name,(e,d)=>{
				isi=d.toString();
			});c.query('update resep set kode=:kode,nama=:nama,jenis=:jenis,ket=:ket,gbr=:gbr where kode=:kode1',
			{kode:req.params.kode,nama:req.params.nama,jenis:req.params.jenis,ket:isi,gbr:req.files.gbr.name,kode1:req.params.kode1},
			function(e,r,f){
				req.files.gbr.mv('data/'+req.params.kode+'/'+req.files.gbr.name,(e)=>{
					res.send(JSON.stringify({error:null}));
				});
			});c.end();
		});
	}else res.send(JSON.stringify({error:'tolong diisi semua'}));
}).post('/update/bahan',(res,req)=>{
	if(!req.params.resep&&!req.params.nama&&!req.params.jum&&!req.params.satuan&&!req.params.nama1){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('update bahan set nama:nama,jum=:jum,satuan=:satuan where resep=:resep and nama=:nama1',
		{resep:req.params.resep,nama:req.params.nama,jum:req.params.jum,satuan:req.params.satuan,nama1:req.params.nama1},
		(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});c.end();
	}else res.send(JSON.stringify({error:'isilah semua'}));
}).post('/update/langkah',(res,req)=>{
	if(!req.params.resep&&!req.params.ket&&!req.params.urut&&!req.params.urut1){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('update langkah set ket=:ket,urut=:urut where resep=:resep and urut=:urut1',{resep:req.params.resep,ket:req.params.ket,urut:req.params.urut,urut1:req.params.urut1},(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});c.end();
	}else res.send(JSON.stringify({error:'isilah semua'}));
}).post('/delete/resep',(res,req)=>{
	if(!req.params.kode){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('delete from resep kode=:kode',{kode:req.params.kode},(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});c.end();
	}else res.send(JSON.stringify({error:'error'}));
}).post('/delete/bahan',(res,req)=>{
	if(!req.params.resep&&!req.params.nama){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('delete from bahan where resep=:resep and nama=:nama',{nama:req.params.nama,resep:req.params.resep},(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});
		c.end();
	}else res.send(JSON.stringify({error:'isilah semua'}));
}).post('/delete/langkah',(res,req)=>{
	if(!req.params.resep&&!req.params.urut){
		var c=mysql.createConnection(formatMysql);
		c.connect();
		c.query('delete from langkah where resep=:resep and urut=:urut',{urut:req.params.urut,resep:req.params.resep},(e,r,f)=>{
			if(e)console.log(e);
			res.send(JSON.stringify({error:null}));
		});
		c.end();
	}else res.send(JSON.stringify({error:'isilah semua'}));
});
var ip = require('ip');
if(ip.address()!==null)app.listen(2101,ip.address());
else app.listen(2101);
