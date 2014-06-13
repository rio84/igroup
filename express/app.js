
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');


var routes = require('./routes');
var user = require('./api/user');
var talk = require('./api/talk');
var team = require('./api/team');


var app = express();

// all environments
app.set('port', process.env.PORT || 8008);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use('/assets',express.static(__dirname+'/assets'));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/demo', routes.demo);
app.get('/demo/*', routes.demo);
app.get('/test', routes.test);

app.get('/api/user/login', user.login);
app.get('/api/user/register', user.register);
app.get('/api/user/query', user.query);

app.get('/api/talk/*', talk.distribute);
app.get('/api/team/*', team.distribute);
//app.get('/api/talk/register', login.register);


app.get(/\/*/, routes.s404);




var server=http.createServer(app);
server.timeout=0;
console.log('server.timeout',server.timeout)
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port')+' since '+(new Date));
});
