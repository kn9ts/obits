
/**
 * Module dependencies.
 */
var routes = require('./routes');
var application = require('./routes/application');

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000); //sets the port eg. http://localhost/8000
app.set('views', __dirname + '/views'); //where all the html jade files will be found
app.set('view engine', 'jade'); //jade will be our templating engine
app.use(express.favicon()); //use express favicon
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('JheneKnights'));
app.use(express.session());
app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// we are specifying the html directory as another public directory
app.use(express.static(path.join(__dirname, 'application/www')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/* ------- Define App routes here ------- */
app.get('/', routes.index);
app.get('/users', application.users);
app.get('/feeds', application.feeds);
app.get('/createpage', application.createpage);
app.get('/viewpage', application.viewpage);
app.get('/followpage', application.followpage);
app.get('/createpost', application.createpost);
app.get('/following', application.following);

// a convenient variable to refer to the HTML directory
var static_html_dir = './application/';

// routes to serve the static HTML files
app.get('/application', function(req, res) {
    res.sendfile(static_html_dir + 'www/index.html');
})

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});