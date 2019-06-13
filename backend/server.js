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

const SECRET = "secret"


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
        money: 0
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

app.post('/users/login',function(req,res) {
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
            }, SECRET, /// SET SECRET ENV VARIABLE **********************
            { expiresIn: '2h' }); //////////////////////////////////////////
            return res.status(200).json({success:'Approved',token:token});
          }
          return res.status(401).json({failed:'Unauthorized Access'});
        }
      );
    }
  ).catch(error => {
    res.status(500).json({error:error});
  });
});



function authorizeUser(req,res,successCallback) {
    jwt.verify(getToken(req),SECRET,
      (err,results) => {
          if(err) {
            res.status(401).json({failed:'Unauthorized Access'})
          } else {
              if(isAdmin(req.params.id) || (parseInt(req.params.id)===parseInt(results.id))) {
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
              if(isAdmin(req.params.id)) {
                  successCallback();
              } else {
                res.status(401).json({failed:'Unauthorized Access'})
              }
          }
    });
}


//-------------------------------------------
//Get request methods for ALL of a model
// TODO: authorized these only for admin!!!!
//-------------------------------------------


app.get('/users', (req, res) => {
    authorizeAdmin(req,res, () => {
        User.findAll()
        .then(user => res.json(user))
    });
    
})
app.get('/pets', (req, res) => {
    //console.log(req.headers.token)
    //jwt.verify(req.headers.token,"secret",(err,res) => {console.log(res)})
    Pet.findAll()
    .then(pet => res.json(pet))
})
app.get('/foods', (req, res) => {
    Food.findAll()
    .then(food => res.json(food))
})
app.get('/healths', (req, res) => {
    Health.findAll()
    .then(health => res.json(health))
})
app.get('/toys', (req, res) => {
    Toy.findAll()
    .then(toy => res.json(toy))
})



//--------------------------------------
//Get request methods for ONE model
// TODO: authorize resource for admin or belonging to logged-in user
//--------------------------------------


app.get('/users/:id', (req, res) => {
    authorizeUser(req,res, () => {
        User.findByPk(req.params.id)
        .then(user => res.json(user))
    });
})


app.get('/pets/:id', (req, res) => {
    // eval(pry.it)
    Pet.findByPk(req.params.id)
    .then(pet => res.json(pet))
})
app.get('/foods/:id', (req, res) => {
    // eval(pry.it)
    Food.findByPk(req.params.id)
    .then(beans => res.json(beans))

})

app.get('/healths/:id', (req, res) => {
    // eval(pry.it)
    Health.findByPk(req.params.id)
    .then(health => res.json(health))

})

app.get('/toys/:id', (req, res) => {
    // eval(pry.it)
    Toy.findByPk(req.params.id)
    .then(toy => res.json(toy))

})



//-----------------
//Post to API (!!! Persisting Data !!!)
// todo: can only post if logged in, user_id always equal to id of logged in user
//-----------------

app.post('/pets', async (req, res) => {
    // eval(pry.it)
    let pet = await Pet.create(req.body)
    res.json(pet)
})
app.post('/foods', async (req, res) => {
    // eval(pry.it)
    let bean = await Food.create(req.body)
    res.json(bean)
})
app.post('/healths', async (req, res) => {
    // eval(pry.it)
    let health = await Health.create(req.body)
    res.json(health)
})
app.post('/toys', async (req, res) => {
    // eval(pry.it)
    let toy = await Toy.create(req.body)
    res.json(toy)
})

//----------------------------------------------
// Updating API (!!! Persisting Data !!!)
// TODO: only authorize if it belongs to the user logged in (or admin)
//----------------------------------------------


app.patch('/users/:id', async (req, resp) => {
    let user = await User.findByPk(req.params.id)
    await user.update(req.body)
    resp.json(user)
})

app.patch('/pets/:id', async (req, resp) => {
    let pet = await Pet.findByPk(req.params.id)
    await pet.update(req.body)
    resp.json(pet)
})

//---------------------------------------------
//Delete info from API (CANNOT DELETE PET!!!)
// TODO: only authorize of admin or belongs to the user logged in
//---------------------------------------------


app.delete('/users/:id', async (req, res) => {
    let user = await User.findByPk(req.params.id)
    user.destroy()
})

app.delete('/foods/:id', async (req, res) => {
    let food = await Food.findByPk(req.params.id)
    food.destroy()
})

app.delete('/healths/:id', async (req, res) => {
    let health = await Health.findByPk(req.params.id)
    health.destroy()
})

app.delete('/toys/:id', async (req, res) => {
    let toy = await Toy.findByPk(req.params.id)
    toy.destroy()
})



const port = 8000

app.listen(port, () => {console.log("I am listening at " + port)})

