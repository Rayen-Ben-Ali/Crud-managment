const express = require("express");
const bcrypt = require('bcrypt');
const router = express.Router();

const jwt=require('jsonwebtoken')

const user = require("../models/user");

//account creation

router.post("/createaccount", async (req, res) => {
    data = req.body;
    usr = new user(data);
    salt = bcrypt.genSaltSync(10)
    cryptedPass = await bcrypt.hashSync(data.password, salt)
    usr.password=cryptedPass

  usr
    .save()
    .then((saveduser) => {
      res.status(200).send(saveduser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

//account login

router.post("/login", async (req, res) => {
  data = req.body
  usr = await user.findOne({ email: data.email })
  if (!usr) {
    res.status(404).send('email or password invalid !')
  }
  else {
    validpassword = bcrypt.compareSync(data.password, usr.password)
    if (!validpassword) {
      res.status(404).send('email or password  !')
    }
    else {
      payload = {
        _id: usr._id,
        email: usr.email,
        name:usr.name
      }
      token = jwt.sign(payload, '1234567')
      res.status(200).send({mytoken:token});

      
    }
  }

});



//user crud




router.delete("/delete/:id", async (req, res) => {
  try {
    id = req.params.id;
    deleteduser = user.findOneAndDelete({ _id: id });
    res.send(deleteduser);
  } catch (error) {
    res.send(error);
  }
});

router.post("/add", (req, res) => {
  data = req.body;
  console.log(data);

  usr = new user(data);

  usr
    .save()
    .then((saveduser) => {
      res.send(saveduser);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/create", async (req, res) => {
  try {
    data = req.body;

    usr = new user(data);

    saveduser = await usr.save();

    res.send(saveduser);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getall", async (req, res) => {
  try {
    const users = await user.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getbyid/:id", async (req, res) => {
  try {
    myid = req.params.id;
    user = await user.findOne({ _id: myid });
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    id = req.params.id;
    newdata = req.body;
    userupdated = await user.findByIdAndUpdate({ _id: id }, newdata);
    res.send(userupdated);
  } catch (error) {
    res.send(error);
  }
});


module.exports = router;