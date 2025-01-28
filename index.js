const express = require("express");
const path = require("path");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const Signup = require("./models/signupSchema");
const app = express();
dotenv.config();
app.use(express.json());

mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("conntected");
  })
  .catch((e) => {
    console.log("not conntected");
  });
app.get("/static", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/", (req, res) => {
  res.send("Welcome to backend my friend...\n this is backend process area");
});
app.post("/signup", (req, res) => {
  var { firstname, lastname, email, password } = req.body;
  console.log(req.body);
  try {
    const newCustomer = new Signup({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    newCustomer.save();
    console.log(newCustomer);
    res.status(201).send("signup is successfull");
  } catch (error) {
    res.status(401).send("signup unsuccessful", error);
  }
});

app.get('/getssignupdet',async (req,res)=>{
    var signUpdet=await Signup.find();
    res.status(200).json(signUpdet);
})
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    if (user.password !== password) {
      return res.status(401).send("Invalid credentials!");
    }
    res.status(200).send("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error during login");
  }
});


app.listen(3001, () => {
  console.log("My Server Started");
});
