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
const cors = require('cors');
const SECRET = process.env.SECRET


const app = express()
app.use(bodyParser.json())

const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true, // false
  "optionsSuccessStatus": 200, // 204
  "credentials":true,
  "allowedHeaders":"Content-Type,*"
}
app.use(cors(corsOptions))

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



// Create a new user
// request format:
// headers: {"Content-Type":"application/json"}
// body: {"name":<username>,"password":"<password>"}
app.post('/users', function(req,res) {
  bcrypt.hash(req.body.password, 10, async function(err,hash)
  {
    if(err){
      return res.status(500).json({error:"error creating hash"});
    } else {
      const user = await new User({
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


// Login a user
// request format:
// headers: {"Content-Type":"application/json"}
// body: {"name":<username>,"password":"<password>"}
app.post('/login', cors(corsOptions), async function(req,res) {
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
              id:user.id
            }, SECRET,
            { expiresIn: '2h' });
            return res.status(200).json({success:'Approved',token:token,money:user.money});
          }
          return res.status(401).json({failed:'Unauthorized Access'});
        }
      );
    }
  ).catch(error => {
    res.status(500).json({error:"could not complete request"});
  });
});

app.get("/loggedin",cors(corsOptions),async function(req,res) {
  jwt.verify(getToken(req),SECRET,
  async (err,results) => {
      if(err) {
        res.json({failed:'Not logged in'})
      } else {
        res.json({user:results.name});
      }
    });
});





// Change user password
// steps:
// 1. authorize user via JWT token
// 2. authorize user via "curent password" input box
// 3. if both succeed, change the password
// request format:
// headers: {"Content-Type":"application/json"}
// body: {"currentpassword":"<current password>", "newpassword":"<new password>"}
app.patch('/users/:name/password', async function(req,res) {
  var id = await getId(req.params.name);
  User.findByPk(id)
  .then(
    user => authorizeUser(req,res,id,()=>{
      bcrypt.compare(req.body.currentpassword, user.passwordhash,
        (err,result) => {
          if(err) {
            return res.status(401).json({failed:'Unauthorized Access'});
          }
          if(result) {
            bcrypt.hash(req.body.newpassword,10,(err,hash)=>{
              if(err) {
                return res.status(500).json({error:"error creating hash"});
              } else {
                return !!user.update({passwordhash:hash})
                .then( () => res.json({success:"operation completed"}))
                .catch(() => res.json({failed:"operation failed"}));
              }
            });
          } else {
            return res.status(401).json({failed:'Unauthorized Access'});
          }
      })
    })
  ).catch(() => {
    res.json({error:"could not complete request"});
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
// the user must be an admin or request will fail
//-------------------------------------------

app.get('/exists/:user', async (req,res) => {
  var id = await getId(req.params.user);
  if(id === -1) {
    res.json({message: "user not found"})
  } else {
    res.json({message: "user exists"})
  }
})

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
// Either user must be admin, or user must be the owner of the requested resource
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
// Either user must be admin, or user must be the owner of the requested resource
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
// Request format:
// headers: {"Content-Type":"application/json"}
// body: {"name":"<username>", 
//    "data": { <created resource key/value pairs> } } 
// Note that the username must be the currently logged in user (i.e.
// coincide with the JWT token), and will become the owner of the
// created resource.
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
app.post('/healths',async (req, res) => {
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

// patch the money only
// {"data": { "money": <new total money> } } 
app.patch('/users/:name', async (req,res) => {
  var userId = await getId(req.params.name);
  authorizeUser(req,res,userId, () => {
    User.findByPk(userId)
    .then(
      user => {
        user.update({money: req.data.money})
        .then(() => res.json({status:"success"}))
        .catch(() => res.json({status:"failed"}));
      }
    ).catch(() => res.json({status:"failed"}));
  });
});

// Update a pet
// Request format:
// headers: {"Content-Type":"application/json"}
// body: {"name":"<username>", 
//    "data": { <updated pet key/value pairs> } } 
// The username must be the currently logged in user (coincides with the
// JWT token), and must be the owner of the pet.
app.patch('/pets/:id', async(req, resp) => {
  var userId = await getId(req.body.name);
  Pet.findByPk(req.params.id)
  .then( async pet => {
    if( (parseInt(pet["userId"]) !== userId) || 
      (req.body.data.userId && (parseInt(req.body.data.userId) !== userId))) {
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
// request format:
// headers: {"Content-Type":"application/json"}
// Either user must be admin, or user must be the owner of the requested resource
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

app.delete('/toys/:id',(req, res) => {
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

