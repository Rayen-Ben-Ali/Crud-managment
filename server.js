const express = require("express");
const mongoose = require("./config/connect");

const prodroute = require("./routes/prodroute");

const userroute = require("./routes/userroute");

const app = express();
app.use(express.json());


//http://localhost:3000/product/kedha   

app.use("/product", prodroute)




//http://localhost:3000/user/kedha
app.use("/user",userroute)




app.use('/getimage',express.static('./uploads'))



app.listen(3000, () => {
  console.log("server works");
  ("");
});
