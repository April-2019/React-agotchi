// require('dotenv').config();
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// router.post('/signup', function(req,res) {
//   bcrypt.hash(req.body.password, 10, function(err,hash)
//   {
//     if(err){
//       return res.status(500).json({error:err});
//     } else {
//       const user = new User({
//         name: req.body.name,
//         passwordhash: hash,
//         money: 0
//       });
//       user.save().then(
//         function(result) {
//           res.status(200).json({success:'New user created'});
//         }
//       ).catch( error => {
//         res.status(500).json({error:err});
//       });
//     }
//   });
// });

// router.post('/login',function(req,res) {
//   User.findOne({name: req.body.name})
//   .exec()
//   .then(
//     function(user) {
//       bcrypt.compare(req.body.password, user.passwordhash, 
//         function(err,result) {
//           if(err) {
//             return res.status(401).json({failed:'Unauthorized Access'});
//           }

//           if(result) {
//             const token = jwt.sign({
//               name:user.name,
//               id:user.id
//             }, process.env.SECR,
//             { expiresIn: '2h' });
//             return res.status(200).json({success:'Approved',token:token});
//           }
//           return res.status(401).json({failed:'Unauthorized Access'});
//         }
//       );
//     }
//   ).catch(error => {
//     res.status(500).json({error:error});
//   });
// });

// module.exports = router;
