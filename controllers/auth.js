var express = require('express')
var router = express.Router()
var db = require('../models')
var passport = require('../config/passport')
var csrfProtection = require('csurf')()

router.get('/signup', csrfProtection, function (req, res) {
  res.render('auth/signup', { csrfToken: req.csrfToken() })
})
router.post('/signup', csrfProtection, function (req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: { name: req.body.name, password: req.body.password }
  }).spread(function (user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res)
    } else {
      req.flash('error', 'Email already exists')
      res.redirect('/auth/signup')
    }
  }).catch(function (error) {
    req.flash('error', error.message)
    res.redirect('/auth/signup')
  })
})

router.get('/login', function (req, res) {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}))

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}))
router.get('/logout', function (req, res) {
  req.logout()
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

module.exports = router
