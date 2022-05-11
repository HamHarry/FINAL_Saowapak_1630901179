const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const { connect } = require('http2')
const Connection = require('mysql/lib/Connection')
const app = express()
const port = 1179

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "database"
})

var obj = {}
var obj2 = {}
var obj3 = {}
app.set('view engine','ejs')
app.use(express.static('ALLCSS'))
app.use(bodyParser.urlencoded({extended: false}))

app.get("/profile.ejs",(req,res)=>{
    res.render('profile')
})

app.get("/add.ejs",(req,res)=>{
    res.render('add')
})

app.get('/',(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        console.log("connected id: ",connection.threadId)

        connection.query('SELECT * FROM march16',(err,rows)=>{
        
        connection.release();
            if(err){
                console.log(err)
            }
            else{
                obj = {Error: err,march16: rows}
                res.render('index',obj)
            }
        })
    })
})

app.get('/',(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        console.log("connected id: ",connection.threadId)
        connection.query('SELECT * FROM march16',(err,rows)=>{
        connection.release();
            if(err){
                console.log(err)
            }
            else{
                obj = {Error: err,march16: rows}
                res.render('index',obj)
            }
        })

        connection.query('SELECT * FROM april1',(err,rows)=>{
        connection.release();
            if(err){
                 console.log(err)
            }
            else{
                obj = {Error: err,april1: rows}
                res.render('index',obj2)
            }
        })
         
        connection.query('SELECT * FROM april16',(err,rows)=>{
        connection.release();
            if(err){
                console.log(err)
            }
            else{
                obj = {Error: err,april16: rows}
                res.render('index',obj3)
            }
        })
    })
})

app.listen(port,()=>{
    console.log("Server is on port: ",port)
})
