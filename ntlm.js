var express = require('express'),
    ntlm = require('express-ntlm');

var app = express();

app.use(ntlm({
    debug: function() {
        var args = Array.prototype.slice.apply(arguments);
        console.log.apply(null, args);
    },
    domain: 'bpmo.local',
    domaincontroller: 'ldap://10.1.1.110:389',

}));

app.all('*', function(request, response) {
    response.end(JSON.stringify(request.ntlm)); // {"DomainName":"MYDOMAIN","UserName":"MYUSER","Workstation":"MYWORKSTATION"}
});

app.listen(8080);