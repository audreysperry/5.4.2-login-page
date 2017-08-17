const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middleware
app.use(session({
  secret: "petmydog",
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));


const logins = [
  {username: "imaudrey", password: "pwd"},
  {username: "imjoel", password: "pass"},
  {username: "imdan", password: "word"}
]

app.get('/', (req, res) => {
  const loggedIn = req.session.login;
  if (!loggedIn) {
    res.render('login');
  }
  res.render('Index');
});

app.listen(3000);
