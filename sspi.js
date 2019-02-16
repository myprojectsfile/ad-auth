'use strict'

var express = require('express')
var app = express()
var server = require('http').createServer(app)
app.use(function (req, res, next) {
  var nodeSSPI = require('node-sspi')
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true
  })
  nodeSSPIObj.authenticate(req, res, function (err) {
    res.finished || next()
  })
})
app.use(function (req, res, next) {
  var out =
    'username: ' +
    req.connection.user +
    '<hr/>' +
    'sid:' +
    req.connection.userSid +
    '<hr/>' +
    ' and you belong to following groups: </br>'
  const groups = JSON.stringify(req.connection.userGroups)
  out += groups
  res.send(out)
})
// Start server
var port = process.env.PORT || 3000
server.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'))
})