// @login & register
const express = require("express"); //引入express
const router = express.Router();
const User = require("../../models/User");
//引入password加密处理
const bcrypt = require("bcrypt");
//引入jsonwebtoken
const jwt = require('jsonwebtoken')
//引入passport
const passport = require('passport')
const keys = require('../../config/keys')
//引入gravatar
const gravatar = require("gravatar");
//@route GET api/users/test
//@desc 返回的json数据
//@access public
// router.get("/test", (req, res) => {
//   res.json({ msg: "login works" });
// });
//@route POST api/users/register
//@desc 返回的json数据
//@access public
router.post("/register", (req, res) => {
  //   console.log(req.body);
  //查询数据库中是否存在了邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json( "邮箱已经被注册！" );
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        identity:req.body.identity
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
//@route POST api/users/login
//@desc 返回token jwt passport
//@access public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //查询数据库
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json( "用户不存在！" );
    }
    //密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //jwt.sign("规则","加密名字","过期时间","箭头函数")
        const  rule={
          id:user.id,
          name:user.name,
          avatar:user.avatar,
          identity:user.identity
        }
        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) => {
          if(err) throw err
          res.json({
            success:true,
            token:"Bearer " + token
          })
        })
      } else {
        return res.status(400).json("密码错误!");
      }
    });
  });
});
//@route GET api/users/current
//@desc 返回 current user
//@access private
router.get('/current',passport.authenticate("jwt",{session:false}),(req,res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    identity:req.user.identity,
  })
})
module.exports = router;
