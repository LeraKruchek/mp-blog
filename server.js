/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jwt = require('jwt-simple');

mongoose.connect('mongodb://mpanysh:834FM1@ds041871.mongolab.com:41871/mp-blog');

app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.set('jwtTokenSecret', 'ABCD1234QWER');

var PostSchema = new mongoose.Schema({
    visible_id: { type : String},
    title: { type : String},
    entry: { type : String},
    date: { type : Date},
    background: { type : String},
    output: { type : String},
    posted : { type : Boolean}
});

var Post = mongoose.model('posts', PostSchema);

var CredentialSchema = new mongoose.Schema({
    login: { type : String},
    password: { type : String}
});

var Credential = mongoose.model('credentials', CredentialSchema);

var tokens = [];

function requiresAuthentication(request, response, next) {
//    console.log(request.headers);
    if (request.headers.access_token) {
        var token = request.headers.access_token;
//        if (tokens.indexOf(token) > -1) {
            var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
//                removeFromTokens();
                response.end(401, "Your session has expired");
            }
//        }
    }
    response.end(401, "You don't have access");
}

function removeFromTokens(token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}

app.get('/api/anon/posts', function(req, res){
    mongoose.set('debug', true);
    Post
        .where('posted')
        .equals(true)
        .exec(
        function(err,items){
            res.json(items);
        })
});

app.post('/api/login', function(req, res){
    var userName = req.body.name;
    var password = req.body.password;
    Credential
        .where('login')
        .equals(userName)
        .where('password')
        .equals(password)
        .exec(function(err,items){
            if (items.length > 0){
                var expires = new Date();
                expires.setDate((new Date()).getDate() + 5);
                var token = jwt.encode({
                    userName: userName,
                    expires: expires
                }, app.get('jwtTokenSecret'));
                tokens.push(token);

                res.send(200, {access_token: token, userName: userName});
            }
            else{
                res.send(401, 'Invalid credentials');
            }

        })
});

app.all('/api/admin/*', requiresAuthentication);

app.get('/api/admin/posts', function(req, res){
   Post.find().exec(function(err, items){
       res.json(items);
   })
});



app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
});



app.listen(8083);
