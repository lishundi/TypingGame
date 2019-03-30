const express=require('express');
// const common=require('../libs/common');
const mysql=require('mysql');

var db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'Learn'
   });

module.exports=function (){
  var router=express.Router();
    // 检查注册状态
    // router.get((req, res, next)=>{
    //   if(!req.session['admin_id'] && req.url!=='/register'){ //没有登录
    //     res.redirect('/register');
    //   }else{
    //     next();
    //   }
    // });
    router.get('/',(req,res)=>{
       res.render('manage/register.html',{});
    });
    router.get('/',(req,res) => {
        res.render('manage/register.html',{});
    })
    router.post('/',(req,res)=>{
       var username = req.body.username;
       var password = req.body.password;
       console.log(username,password);
       var str = "INSERT INTO register(username,password) VALUES(?,?);";
       var arr = [username,password];
       db.query(str,arr,function (err, data) {
           if(err){
               console.error(err);
           }else{
               console.log(data);
             res.redirect('/login');
           }
       });

    });
    router.post('/',(req,res) => {
        var username = req.body.username;
        var password = req.body.password;
        console.log(username,password);
        var str = "insert into register(username,password) values(?,?);";
        var arr = [username,password];
        db.query()
    })



  return router;
};
