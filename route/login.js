const express=require('express');
const common=require('../libs/common');
const mysql=require('mysql');

var db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'Learn'});

module.exports=function (){
  var router=express.Router();

  // 检查登录状态
  // router.use((req, res, next)=>{
  //   if(!req.session['admin_id'] && req.url!=='/login'){ //没有登录
  //     res.redirect('/admin/login');
  //   }else{
  //     next();
  //   }
  // });

  //
  router.get('/', (req, res)=>{
    res.render('manage/login.html', {});
  });
  router.post('/', (req, res)=>{
    var username=req.body.username;
    // var password=common.md5(req.body.password+common.MD5_SUFFIX);
    var password = req.body.password;
    db.query(`SELECT * FROM register WHERE username='${username}' AND password='${password}'`, (err, data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else if(data.length === 0) {
          res.status(400).send('no this admin').end();
      }else if(data[0].username===username && data[0].password===password){
            //成功
            req.session['admin_id']=data[0].ID;
            res.redirect('/web/');
          }else{
            res.status(400).send('this password is incorrect').end();
          }
    });
  });

  // router.get('/admin/index', (req, res)=>{
  //   res.render('admin/index.ejs', {});
  // });

  // router.get('/banners', (req, res)=>{
  //   res.render('admin/banners.ejs', {})
  // });

  return router;
};
