// JavaScript Document
var http = require('http');
var url = require('url');
var jaknum = 0;
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb+srv://pharrington:potatopotato@cluster0.tjx7u.mongodb.net/?retryWrites=true&w=majority";
client =new MongoClient(mongoUrl,{ useUnifiedTopology: true });


http.createServer(function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
var qobj = url.parse(req.url, true).query;
var searchTerm = qobj.x; //  assume x is querystring parameter
var cOrT = qobj.cOrT;
var result = "";
	res.write("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">");
	res.write("<meta charset=\"utf-8\"><title>Company Sort</title>");
//	"<link href=\"StockStyle.css\" type=\"text/css\" rel=\"stylesheet\">");
    res.write("</head><body><h1>Results<h1>")
	//res.write("the value is: " + searchTerm +  " and " + cOrT);
	 MongoClient.connect(mongoUrl,{ useUnifiedTopology: true }, function(err, db) {
		//res.write("<h3>MicCHeck</h3>")
		var result = "";
		if(err) { 
			console.log("Connection err: " + err); return; 
		}
		var dbo = db.db("HW11");
		var coll = dbo.collection('companies');
		jaknum+=1;
		if (cOrT== "comp"){
			res.wriste("<p>You wanted the Ticker that matches company: " + searchTerm +"</p>");
    		coll.find({company:searchTerm}).toArray(function(err, items){
				if (err) {
					console.log("Error: " + err);
				} 
				else if (items.length == 0){
					res.write("<p>Unfortuantely we have no results in our database</p>");
				}
				else {
					res.write("<p>"+ items[0].company + " has the ticker " + items[0].ticker + "</p>");
					if (items.length>1){
					for (var i=1; i<items.length; i++){
						//console.log(i + ": " + items[i].company + " by: " + items[i].ticker); 
						//result +=items[i].ticker; console.log("result is "+ result);
						res.write("<p>"+ items[i].company + " also has the ticker " + items[i].ticker+"</p>");
						}
				 }
					}
				db.close();
				//return result;
		 });
		
		
		}
		else{
			res.write("<p>You wanted the company that matches ticker: " + searchTerm +"</p>");
			coll.find({ticker:searchTerm}).toArray(function(err, items) {
				if (err) {
					console.log("Error: " + err);
		  		} 
				else if (items.length == 0){
					res.write("<p>Unfortuantely we have no results in our database</p>");
				}
				else {
					res.write("<p>" +items[0].company + " has the ticker " + items[0].ticker +"</p>");
					if (items.length >1){
					for (var i=1; i<items.length; i++){
						//console.log(i + ": " + items[i].company + " by: " + items[i].ticker); 
						//result +=items[i].ticker; console.log("result is "+ result);
						res.write("<p>"+ items[i].company + " also has the ticker " + items[i].ticker+"</p>");
						}
				 }
					}
				db.close();
				//return result;
				
		 });
			
		}
		 res.write("</body>")
		});  //end find	


//res.end();
}).listen(8080);


