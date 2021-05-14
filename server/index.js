const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql');


const con = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "password",
	database: "medicine",
});

app.use(express.json());

app.use(cors({
	origin : ["http://localhost:3000"],
	methods: ["GET","POST"],
	credentials: true
}));


app.post("/insert",(req,res)=>{
	const fullName = req.body.fullName;
	const gender = req.body.gender;
	const emailName = req.body.emailName;
	const mobName = req.body.mobName;
	const userName = req.body.userName;
	const passwordName = req.body.passwordName;
	const dateName = req.body.dateName;


	var sqlInsert = "INSERT INTO user (name,password,dob,gender,mobile,email,username) VALUES (?, ?,?,?,?,?,?)";
	console.log("connected!");
	con.query(sqlInsert, [fullName,passwordName,dateName,gender,mobName,emailName,userName],(err, result)=>{
		if(err) {
		 res.send(err);
		 console.log(err);
		}
		else{
		res.send("Registration Successfull");
		console.log("1 record inserted!");
	}
		
		});	
	//});	
});

app.post("/get",(req,res) =>{
	const userName = req.body.userName;
	const passwordName = req.body.passwordName;
	console.log(userName);
	console.log(passwordName)
	
	con.query('SELECT * FROM user WHERE username = ?',[userName],async function (error, results){
    if (error) {
      return res.send(error);

    }else{
    	
        
      if(results.length >0){
      
        while(results!=0){
        	if (passwordName==results[0].password) {

        			res.json({status: "sucessfull", auth:true});
        		} 		 
       else{
          res.json({status: "Username and password does not match", auth:false});
        }
      }
  }

      else{
        res.json({status: "Username does not exits",auth:false});
      }
    }
    
});
});

app.listen(3001, () =>{
	console.log("running on port 3001");
}

);