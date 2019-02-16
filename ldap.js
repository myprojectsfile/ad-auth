var express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');

var OPTS = {
    server: {
        url: 'ldap://10.1.1.110:389',
        bindDN: 'cn=root',
        bindCredentials: 'Www.bpm0.ir',
        searchBase: 'ou=passport-ldapauth',
        searchFilter: '(uid={{username}})'
    }
};

var app = express();

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.post('/login', passport.authenticate('ldapauth', { session: false }), function (req, res) {
    res.send({ status: 'ok' });
});

app.listen(8080);