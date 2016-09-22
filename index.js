var express = require('express')
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')
var morgan = require('morgan')
var db = require('./models')
var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
var csurf = require('csurf')
var app = express()

// load local environment vars
require('dotenv').config({silent: true});

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(ejsLayouts)
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public/'))
app.use(session({
  secret: process.env.SESSION_SECRET || 'donttellanybody',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash()
  res.locals.currentUser = req.user
  next()
})

var isLoggedIn = function (req, res, next) {
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page')
    res.redirect('/auth/login')
  } else {
    next()
  }
}

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/users', function (req, res) {
  db.user.findAll({
    include: [db.taco]
  }).then(function (data) {
    res.render('users', {users: data})
  })
})

app.use('/tacos', isLoggedIn, require('./controllers/tacos'))

app.use('/auth', require('./controllers/auth'))

var server = app.listen(process.env.PORT || 3000)

module.exports = server
