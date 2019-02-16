var ActiveDirectory = require('activedirectory');

var config = {
    url: 'ldap://10.1.1.110:389',
    baseDN: 'dc=domain,dc=com',
    username: 'root',
    password: 'Www.bpm0.ir'
}

var ad = new ActiveDirectory(config);

var username = 'Ahmadi.Mohammad';
var password = 'reset.56';

ad.authenticate(username, password, function (err, auth) {
    if (err) {
        console.log('ERROR: ' + JSON.stringify(err));
        return;
    }

    if (auth) {
        console.log('Authenticated!');
    }
    else {
        console.log('Authentication failed!');
    }
});