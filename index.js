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

const error = "invalid login credentials. Please try again.";

app.get('/', (req, res) => {
  loggedIn = req.session.login !== undefined;
  if (loggedIn) {
  res.render('index');
} else {
  res.redirect('/login');
}
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  console.log(username);
  let password = req.body.password;
  console.log(password);

  for (var i = 0; i < logins.length; i++) {
    let login = logins[i];
    if (login.username === username && login.password === password) {
      res.render('index', {username : username});
      return;
    }
  }
  res.render('login', {error: error});
});

// app.post('/login', (req, res) => {
//   req.session.username = req.body.username;
//   req.session.login = req.body.true;
//
//   res.redirect('/xw');
// });

app.listen(3000);
