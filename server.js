const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose');
const url = "mongodb+srv://hannaouimohamed:1234AZERwaccaw@cluster0.envyuon.mongodb.net/Contact"
mongoose.connect(url)
    .then(()=>{ console.log('connected');
    }).catch(err => console.log(err))

const contactsRoutes = require("./routes/route")

const axios = require("axios");

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine({ defaultLayout : "main" }));
app.set("view engine", "handlebars");


app.use("/", contactsRoutes)

app.get("/", async function(req, res) {
  const result = await axios.get('http://localhost:5000/contacts')
   res.render("home", { contacts : result.data.contacts})
})

app.get("/add",  function(req, res) {
   res.render("addContact")
})

app.post("/add",  function(req, res) {
   axios.post('http://localhost:5000/contacts/add', req.body)
   .then(response => {
    if (!response.data.error) {
      res.redirect("/")
    }
   }).catch(err => console.log(err))
})

app.get("/update/:id", async (req, res) => {
  try {
    const result = await axios.get(`http://localhost:5000/contacts/${req.params.id}`);
    res.render("updateContact", { contact: result.data.contact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/update/:id", async (req, res) => {
  try {
    const result = await axios.put(`http://localhost:5000/contacts/${req.params.id}`, req.body);
    if (!result.data.error) {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/delete/:id", (req, res) => {
  axios.delete(`http://localhost:5000/contacts/${req.params.id}`)
    .then(response => {
      if (!response.data.error) {
        res.redirect("/");
      }
    })
    .catch(err => console.log(err));
});

app.listen(port, () => { console.log(`Example app listening on port ${port}`)})