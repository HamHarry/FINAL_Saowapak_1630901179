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
var obj1 = {}
app.set('view engine','ejs')
app.use(express.static('ALLCSS'))
app.use(bodyParser.urlencoded({extended: false}))

app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/profile.ejs",(req,res)=>{
    res.render('profile')
})

app.get("/addall.ejs",(req,res)=>{
    res.render('addall')
})

app.get("/add.ejs",(req,res)=>{
    res.render('add')
})

app.get("/add1.ejs",(req,res)=>{
    res.render('add1')
})

app.get("/add2.ejs",(req,res)=>{
    res.render('add2')
})

app.get('/March.ejs',(req,res)=>{
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
                res.render('March',obj)
            }
        })
    })
})

app.get('/April.ejs',(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        console.log("connected id: ",connection.threadId)
        connection.query('SELECT * FROM april1',(err,rows)=>{
        connection.release();
            if(err){
                console.log(err)
            }
            else{
                obj = {Error: err,april1: rows}
                res.render('April',obj)
            }
        })
    })
})

app.get('/April2.ejs',(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        console.log("connected id: ",connection.threadId)
        connection.query('SELECT * FROM april16',(err,rows)=>{
        connection.release();
            if(err){
                console.log(err)
            }
            else{
                obj = {Error: err,april16: rows}
                res.render('April2',obj)
            }
        })
    })
})

app.post('/add.ejs',(req, res) => {
    con.getConnection((err, connection) => { 
        if(err) throw err
            const params = req.body

                con.getConnection((err, connection) => {
                            connection.query(`INSERT INTO march16 SET ?`, params, (err, rows) => {
                                connection.release()
                                if(!err){
                                    obj1 = {Error:err, mesg : `Success Complete`}
                                    res.render('add', obj1)
                                }else {
                                    console.log(err)
                                    }
                                })
                })
    })
})

app.post('/add1.ejs',(req, res) => {
    con.getConnection((err, connection) => { 
        if(err) throw err
            const params = req.body

                con.getConnection((err, connection) => {
                            connection.query(`INSERT INTO april1 SET ?`, params, (err, rows) => {
                                connection.release()
                                if(!err){
                                    obj1 = {Error:err, mesg : `Success Complete`}
                                    res.render('add1', obj1)
                                }else {
                                    console.log(err)
                                    }
                                })
                })
    })
})

app.post('/add2.ejs',(req, res) => {
    con.getConnection((err, connection) => { 
        if(err) throw err
            const params = req.body

                con.getConnection((err, connection) => {
                            connection.query(`INSERT INTO april16 SET ?`, params, (err, rows) => {
                                connection.release()
                                if(!err){
                                    obj1 = {Error:err, mesg : `Success Complete`}
                                    res.render('add2', obj1)
                                }else {
                                    console.log(err)
                                    }
                                })
                })
    })
})

app.listen(port,()=>{
    console.log("Server is on port: ",port)
})
