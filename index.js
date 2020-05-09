const express = require('express')
const bodyParser = require("body-parser") 
const allInfo = require("./api")
const app = express()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine","ejs");
app.use(express.static("views"));

const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    if(!req.query.lang){
        res.render("bot.ejs",{lang:"eng"})
    }else if(req.query.lang=="hin"){
        res.render("bot1.ejs",{lang:"hin"})
    }else if(req.query.lang=="kan"){
        res.render("bot2.ejs",{lang:"kan"})
    }
    
})


app.get("/chat",(req,res)=>{
    console.log(req.query.url+",,,"+req.query.input)
    if(!req.query.chain){
        req.query.prev_q= -1
    }
    allInfo(req.query.url,req.query.input,req.query.firstno,req.query.lang,req.query.chain,req.query.prev_q,(err, {totalInfo}) => {
        if (err) throw new error();
        console.log(totalInfo);
        res.send({totalInfo:totalInfo})
      });
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})