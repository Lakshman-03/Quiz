import express from "express";
import bodyParser from "body-parser";
const app = express();
import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "MyQuiz",
    password: "Lakshman@123",
    port: 5432,
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended :true}));
db.connect();
let quiz = []
let score = 0
db.query("select * from quiz",(err,res)=>{
    if(err){
        console.log("error bro chusko",err.stack);
    }else{
        quiz = res.rows;
    }
});
const a={
    val : []
}
app.get("/",(req,res)=>{
    var random = Math.floor(Math.random()*quiz.length);
    // const search = quiz.find((quizzo)=> quizzo.id == random)
    const search = quiz[random]
    console.log(search.answer)
     a.val.push(search.answer) 
    res.render("index.ejs",{
        question:search.question,
        answer:search.answer,
        option1 :search.option1,
        option2:search.option2,
        option3 : search.option3,
        option4 : search.option4,
        score : score
    });
});
app.post("/options",(req,res)=>{
    if(req.body.option == a.val[a.val.length-1]){
        score = score+10
        console.log("correct answer")
    }else{
        score = score-10
        console.log("wrong answer")
    }
    res.redirect("/");
});

app.listen("3000",()=>{
    console.log("http://localhost:3000");
});