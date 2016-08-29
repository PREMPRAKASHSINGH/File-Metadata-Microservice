var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var multer=require('multer');
var upload=multer({dest:"./uploads"});

var app=express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public')))

app.use(function(req,res,next){
	console.log(req.path);
	next();
})

app.get('/',function(req,res){
	res.render("index");
});

app.post('/result',upload.single('userfile'),function(req,res){
	console.log('file is '+JSON.stringify(req.file));
	console.log('file size is '+req.file.size);
	console.log('req body is '+JSON.stringify(req.body));
	res.json({size:req.file.size});
});

app.use(function(req,res){
	res.send("404 not found");
});
var port=process.env.PORT || 8080;
app.listen(port,function () {
	console.log("listening to port "+port);
});
