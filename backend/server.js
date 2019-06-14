const express = require('express')

const bodyParser = require('body-parser')
const pry = require('pryjs')
const User = require('./models/User.js')
const Pet = require('./models/Pet.js')
const Food = require('./models/Food.js')
const Health = require('./models/Health.js')
const Toy = require('./models/Toy.js')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express()
app.use(bodyParser.json())


//////////////////////////////////////////////////////
// TODO: CATCH BLOCKS                               //
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// TODO: SECRET ENV VAR                             //
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// TODO: UPDATE USER PASSWORD                       //
//////////////////////////////////////////////////////

const SECRET = "secret"//TODO:FIXME


function getToken(req) {
    return req.headers.token;
}

function isAdmin(userId) {
    return false;//TODO:fixme
}


//-------------------------------------------
// Authentication and authorization fundamental
//-------------------------------------------



app.post('/users', function(req,res) {
  bcrypt.hash(req.body.password, 10, function(err,hash)
  {
    if(err){
      return res.status(500).json({error:"error creating hash"});
    } else {
      const user = new User({
        name: req.body.name,
        passwordhash: hash,
        money: 100,
        admin: req.body.admin
      });
      user.save().then(
        function(result) {
          res.status(200).json({success:'New user created'});
        }
      ).catch( error => {
        res.status(500).json({error:"error creating user"});
      });
    }
  });
});

app.post('/login',function(req,res) {
  User.findAll({where: {name:req.body.name}})
  .then(
    function(user) {
      bcrypt.compare(req.body.password, user[0].dataValues.passwordhash, 
        function(err,result) {
          if(err) {
            return res.status(401).json({failed:'Unauthorized Access'});
          }

          if(result) {
            const token = jwt.sign({
              name:user[0].dataValues.name,
              id:user[0].dataValues.id  //////////////////////////////////////////////////
            }, SECRET,                  /// SET SECRET ENV VARIABLE //////////////////////
            { expiresIn: '2h' });       //////////////////////////////////////////////////
            return res.status(200).json({success:'Approved',token:token});
          }
          return res.status(401).json({failed:'Unauthorized Access'});
        }
      );
    }
  ).catch(error => {
    res.status(500).json({error:"could not complete request"});
  });
});



function authorizeUser(req,res,id,successCallback) {
    jwt.verify(getToken(req),SECRET,
      (err,results) => {
          if(err) {
            res.status(401).json({failed:'Unauthorized Access'})
          } else {
              if(isAdmin(parseInt(results.id)) || (id===parseInt(results.id))) {
                  successCallback();
              } else {
                res.status(401).json({failed:'Unauthorized Access'})
              }
          }
    });
}

function authorizeAdmin(req,res,successCallback) {
    jwt.verify(getToken(req),SECRET,
      (err,results) => {
          if(err) {
            res.status(401).json({failed:'Unauthorized Access'})
          } else {
              if(isAdmin(parseInt(results.id))) {
                  successCallback();
              } else {
                res.status(401).json({failed:'Unauthorized Access'})
              }
          }
    });
}


//-------------------------------------------
//Get request methods for ALL of a model
//-------------------------------------------


app.get('/users', (req, res) => {
  User.findAll()
  .then( user => {
    authorizeAdmin(req,res, () => {
      res.json(user);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/pets', (req, res) => {
  Pet.findAll()
  .then( pet => {
    authorizeAdmin(req,res, () => {
      res.json(pet);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/foods', (req, res) => {
  Food.findAll()
  .then( food => {
    authorizeAdmin(req,res, () => {
      res.json(food);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})
app.get('/healths', (req, res) => {
  Health.findAll()
  .then( health => {
    authorizeAdmin(req,res, () => {
      res.json(health);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/toys', (req, res) => {
  Toy.findAll()
  .then( toy => {
    authorizeAdmin(req,res, () => {
      res.json(toy);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})


//--------------------------------------
// Get request methods for one user's records
//--------------------------------------


app.get('/users/:id/pets', (req, res) => {
  Pet.findAll({where:{user_id:req.params.id}})
  .then( pet => {
    authorizeUser(req,res,parseInt(req.params.id), () => {
      res.json(pet);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/users/:id/foods', (req, res) => {
  Food.findAll({where:{user_id:req.params.id}})
  .then( food => {
    authorizeUser(req,res,parseInt(req.params.id), () => {
      res.json(food);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
});

app.get('/users/:id/healths', (req, res) => {
  Health.findAll({where:{user_id:req.params.id}})
  .then( health => {
    authorizeUser(req,res,parseInt(req.params.id), () => {
      res.json(health);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/users/:id/toys', (req, res) => {
  Toy.findAll({where:{user_id:req.params.id}})
  .then( toy => {
    authorizeUser(req,res,parseInt(req.params.id), () => {
      res.json(toy);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})


//--------------------------------------
// Get request methods for ONE record
//--------------------------------------


app.get('/users/:id', (req, res) => {
  User.findByPk(req.params.id)
  .then(user => {
    authorizeUser(req,res,parseInt(req.params.id),
      () => res.json(user) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})


app.get('/pets/:id', (req, res) => {
  Pet.findByPk(req.params.id)
  .then(pet => {
    authorizeUser(req,res,parseInt(pet["user_id"]),
      () => res.json(pet) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})
app.get('/foods/:id', (req, res) => {
  Food.findByPk(req.params.id)
  .then(beans => {
    authorizeUser(req,res,parseInt(beans["user_id"]),
      () => res.json(beans) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/healths/:id', (req, res) => {
  Health.findByPk(req.params.id)
  .then(health => {
    authorizeUser(req,res,parseInt(health["user_id"]),
      () => res.json(health) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/toys/:id', (req, res) => {
  Toy.findByPk(req.params.id)
  .then(toy => {
    authorizeUser(req,res,parseInt(toy["user_id"]),
      () => res.json(toy) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})



//-----------------
//Post to API (!!! Persisting Data !!!)
//-----------------

app.post('/pets', (req, res) => {
    authorizeUser(req,res,parseInt(req.body["user_id"]),async () => {
      let pet = await Pet.create(req.body);
      res.json(pet)
    });
})

app.post('/foods', (req, res) => {
  authorizeUser(req,res,parseInt(req.body["user_id"]),async () => {
    let bean = await Food.create(req.body)
    res.json(bean)
  }); 
})
app.post('/healths', (req, res) => {
  authorizeUser(req,res,parseInt(req.body["user_id"]),async () => {
    let health = await Health.create(req.body)
    res.json(health)
  });
    
})
app.post('/toys', (req, res) => {
  authorizeUser(req,res,parseInt(req.body["user_id"]),async () => {
    let toy = await Toy.create(req.body)
    res.json(toy)
  });  
})

//----------------------------------------------
// Updating API (!!! Persisting Data !!!)
//----------------------------------------------


// app.patch('/users/:id', async (req, resp) => {
//     let user = await User.findByPk(req.params.id)
//     await user.update(req.body)
//     resp.json(user)
// })

app.patch('/pets/:id', (req, resp) => {
  Pet.findByPk(req.params.id)
  .then( pet => {
    if(req.body["user_id"] && (parseInt(pet["user_id"]) !== parseInt(req.body["user_id"]))) {
      resp.json({"error":"invalid input"})
    } else {
      authorizeUser( req, resp, pet["user_id"],
        () => {
          pet.update(req.body)
          .then( () => resp.json(pet) )
          .catch( () => resp.json({"error":"could not update pet"}) );
      });
    }
  })
  .catch(()=> resp.json({"error":"could not find pet"}));



    // let pet = await (Pet.findByPk(req.params.id).catch(()=>{resp.json({"error":"could not find pet"})}));
    // if(req.body["user_id"] && (parseInt(pet["user_id"]) !== parseInt(req.body["user_id"]))) {
    //   resp.json({"error":"invalid input"})
    // } else {
    //   authorizeUser( req, resp, pet["user_id"],
    //     async () => {
    //       await pet.update(req.body)
    //       resp.json(pet)
    //   });
    // }
})

//---------------------------------------------
//Delete info from API (CANNOT DELETE PET!!!)
//---------------------------------------------


app.delete('/users/:id', async (req, res) => {
  let user = await User.findByPk(req.params.id)
  authorizeUser( req, res, req.params.id,
    () => {
      user.destroy();
  });
})

app.delete('/foods/:id', async (req, res) => {
  let food = await Food.findByPk(req.params.id)
  authorizeUser( req, res, food["user_id"],
    () => {
      food.destroy()
  });
})

app.delete('/healths/:id', async (req, res) => {
  let health = await Health.findByPk(req.params.id)
  authorizeUser( req, res, health["user_id"],
     () => {
      health.destroy()
  });
    
})

app.delete('/toys/:id', (req, res) => {
  // let toy = await Food.findByPk(req.params.id)
  // authorizeUser( req, res, toy["user_id"],
  //   () => {
  //     toy.destroy()
  // });
  Toy.findByPk(req.params.id)
  .then(toy=>
    authorizeUser( req, res, toy["user_id"],
      () => {
        toy.destroy();
        res.json({"status":"success"});
    })
  );
})



const port = 8000

app.listen(port, () => {console.log("I am listening at " + port)})

