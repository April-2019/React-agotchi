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
// TODO: SECRET ENV VAR                             //
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// TODO: UPDATE USER PASSWORD                       //
//////////////////////////////////////////////////////

const SECRET = "secret"//TODO:FIXME


function getToken(req) {
    if(req.headers.authorization) {
      var arr = req.headers.authorization.split(" ");
      if((arr.length===2) && (arr[0]==="Bearer")) {
        return arr[1];
      }
    }
}

async function isAdmin(userId) {
  var admin = false;
  await User.findByPk(userId)
  .then(user => {
    admin = user.admin;
  })
  .catch(() => {console.log("could not find user")});
  return admin;
}

async function getId(name) {
  var id = -1;
  await User.findAll({where:{name:name}})
  .then(
    users => {
      if(users.length > 0) {
        id = users[0].id
      }
    }
  ).catch( () => {console.log("could not find user")});
  return id;
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
        admin: false
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

app.post('/login',async function(req,res) {
  var id = await getId(req.body.name);
  User.findByPk(id)
  .then(
    function(user) {
      bcrypt.compare(req.body.password, user.passwordhash, 
        function(err,result) {
          if(err) {
            return res.status(401).json({failed:'Unauthorized Access'});
          }

          if(result) {
            const token = jwt.sign({
              name:user.name,
              id:user.id                //////////////////////////////////////////////////
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
      async (err,results) => {
          if(err) {
            res.status(401).json({failed:'Unauthorized Access'})
          } else {
              var admin = await isAdmin(parseInt(results.id));
              if(admin || (id===parseInt(results.id))) {
                  successCallback();
              } else {
                res.status(401).json({failed:'Unauthorized Access'})
              }
          }
    });
}

function authorizeAdmin(req,res,successCallback) {
    jwt.verify(getToken(req),SECRET,
      async (err,results) => {
          if(err) {
            res.status(401).json({failed:'Unauthorized Access'})
          } else {
              var admin = await isAdmin(parseInt(results.id));
              if(admin) {
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
  .then( users => {
    authorizeAdmin(req,res, () => {
      res.json(
        users.map(
          user => {
            return {
              "id":user.id,
              "name":user.name,
              "money":user.money,
              "admin":user.admin,
              "createdAt":user.createdAt,
              "updatedAt":user.updatedAt
            };
          }
        )
      );
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


app.get('/users/:name/pets', async (req, res) => {
  var userId = await getId(req.params.name);
  Pet.findAll({where:{userId:userId}})
  .then( pet => {
    authorizeUser(req,res,userId, () => {
      res.json(pet);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/users/:name/foods', async (req, res) => {
  var userId = await getId(req.params.name);
  Food.findAll({where:{userId:userId}})
  .then( food => {
    authorizeUser(req,res,userId, () => {
      res.json(food);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
});

app.get('/users/:name/healths', async (req, res) => {
  var userId = await getId(req.params.name);
  Health.findAll({where:{userId:userId}})
  .then( health => {
    authorizeUser(req,res,userId, () => {
      res.json(health);
    });
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/users/:name/toys', async (req, res) => {
  var userId = await getId(req.params.name);
  Toy.findAll({where:{userId:userId}})
  .then( toy => {
    authorizeUser(req,res,userId, () => {
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


app.get('/users/:name', async (req, res) => {
  var userId = await getId(req.params.name);
  User.findByPk(userId)
  .then(user => {
    authorizeUser(req,res,userId,
      () => {
        res.json({
          "id":user.id,
          "name":user.name,
          "money":user.money,
          "admin":user.admin,
          "createdAt":user.createdAt,
          "updatedAt":user.updatedAt
        });
    })
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})


app.get('/pets/:id', (req, res) => {
  Pet.findByPk(req.params.id)
  .then(pet => {
    authorizeUser(req,res,parseInt(pet["userId"]),
      () => res.json(pet) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})
app.get('/foods/:id', (req, res) => {
  Food.findByPk(req.params.id)
  .then(beans => {
    authorizeUser(req,res,parseInt(beans["userId"]),
      () => res.json(beans) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/healths/:id', (req, res) => {
  Health.findByPk(req.params.id)
  .then(health => {
    authorizeUser(req,res,parseInt(health["userId"]),
      () => res.json(health) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})

app.get('/toys/:id', (req, res) => {
  Toy.findByPk(req.params.id)
  .then(toy => {
    authorizeUser(req,res,parseInt(toy["userId"]),
      () => res.json(toy) )
  })
  .catch(
    () => { res.json({failed:"Could not complete request"}) }
  );
})



//-----------------
//Post to API (!!! Persisting Data !!!)
//-----------------

app.post('/pets', async (req, res) => {
  var userId = await getId(req.body["name"]);
  authorizeUser(req,res,userId,async () => {
    try {
      let pet = await Pet.create(req.body.data);
      let user = await User.findByPk(userId);
      await pet.setUser(user);
      res.json(pet)
    } catch (err) {
      res.json({"error":"could not create pet"});
    }
  });
})

app.post('/foods', async (req, res) => {
  var userId = await getId(req.body["name"]);
  authorizeUser(req,res,userId,async () => {
    try {
      let bean = await Food.create(req.body.data)
      let user = await User.findByPk(userId);
      await bean.setUser(user);
      res.json(bean)
    } catch(err) {
      res.json({"error":"could not create food item"});
    }
  }); 
})
app.post('/healths', async (req, res) => {
  var userId = await getId(req.body["name"]);
  authorizeUser(req,res,userId,async () => {
    try {
      let health = await Health.create(req.body.data);
      let user = await User.findByPk(userId);
      await health.setUser(user);
      res.json(health)
    } catch (err) {
      res.json({"error":"could not create health item"});
    }
  });
    
})
app.post('/toys', async (req, res) => {
  var userId = await getId(req.body["name"]);
  authorizeUser(req,res,userId,async () => {
    try {
      let toy = await Toy.create(req.body.data);
      let user = await User.findByPk(userId);
      await toy.setUser(user);
      res.json(toy)
    } catch (err) {
      res.json({"error":"could not create toy item"});
    }
  });  
})

//----------------------------------------------
// Updating API (!!! Persisting Data !!!)
//----------------------------------------------


app.patch('/pets/:id', async(req, resp) => {
  var userId = await getId(req.body.name);
  Pet.findByPk(req.params.id)
  .then( async pet => {
    if(parseInt(pet["userId"]) !== userId) {
      resp.json({"error":"invalid input"})
    } else {
      authorizeUser( req, resp, pet["userId"],
        () => {
          pet.update(req.body.data)
          .then( () => resp.json(pet) )
          .catch( () => resp.json({"error":"could not update pet"}) );
      });
    }
  })
  .catch(()=> resp.json({"error":"could not find pet"}));
})

//---------------------------------------------
//Delete info from API (CANNOT DELETE PET!!!)
//---------------------------------------------


app.delete('/users/:name', async (req, res) => {
  var userId = await getId(req.params.name);
  User.findByPk(userId)
  .then(
    user => authorizeUser(req,res,userId,
      () => {
        user.destroy();
        res.json({"status":"success"});
      }
    )
  ).catch(
    () => res.json({"error":"could not delete user"})
  );
});

app.delete('/foods/:id', (req, res) => {
  Food.findByPk(req.params.id)
  .then(
    food => authorizeUser(req,res,food["userId"],
    () => {
      food.destroy();
      res.json({"status":"success"});
    })
  ).catch(
    () => res.json({"error":"could not delete food item"})
  );
})

app.delete('/healths/:id', (req, res) => {
  Health.findByPk(req.params.id)
  .then( health =>
    authorizeUser( req, res, health["userId"],
    () => {
      health.destroy();
      res.json({"status":"success"});
    })
  ).catch( () => res.json({"error":"could not delete health item"}) );
})

app.delete('/toys/:id', (req, res) => {
  Toy.findByPk(req.params.id)
  .then(toy=>
    authorizeUser( req, res, toy["userId"],
      () => {
        toy.destroy();
        res.json({"status":"success"});
    })
  )
  .catch( () => res.json({"error":"could not delete toy"}) );
})



const port = 8000

app.listen(port, () => {console.log("I am listening at " + port)})

