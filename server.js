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
    miniature: { type: String},
    output: { type : String},
    state : { type : String}
});

var Post = mongoose.model('posts', PostSchema);

var CredentialSchema = new mongoose.Schema({
    login: { type : String},
    password: { type : String}
});

var Credential = mongoose.model('credentials', CredentialSchema);

var InfoSchema = new mongoose.Schema({
    output: { type : String}
});

var Info = mongoose.model('infos', InfoSchema);

var tokens = [];

function requiresAuthentication(request, response, next) {
    if (request.headers.access_token) {
        var token = request.headers.access_token;
            var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                response.send(401, "Your session has expired");
            }
    }
    response.send(401, "You don't have access");
}

app.get('/api/anon/posts', function(req, res){
    mongoose.set('debug', true);
    Post
        .where('state')
        .equals('visible')
        .sort('-date')
        .exec(
        function(err,items){
            res.json(items);
        })
});

app.get('/api/anon/info', function(req, res){
    mongoose.set('debug', true);
    Info.find()
        .exec(function(err, data){
            res.json(data);
        });

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
    var result = [];
   Post.find()
       .where('state')
       .equals('draft')
       .exec(function(err, items){
       result = items.slice();
           Post.find()
               .where('state')
               .ne('draft')
               .sort('-date')
               .exec(function(err, items){
                   result = result.concat(items.slice());
                   res.json(result)
               });
       });
});

app.delete('/api/admin/delete/:post_id', function(req, res){
    Post.findOneAndRemove({
        _id: req.params.post_id
    }, function(err, item){
        res.json(item);
    })
});

app.post('/api/admin/posts', function(req, res){
   Post.create({
       visible_id: req.body.visible_id,
       title: req.body.title,
       entry: req.body.entry,
       date: req.body.date,
       background: req.body.background,
       miniature: req.body.miniature,
       output: req.body.output,
       state : req.body.state
   }, function(err, item){
       res.send(200, 'ok');
   })
});

app.put('/api/admin/post/:id', function(req, res){
    Post.update({
        _id : req.params.id
    },
        {
            $set:{
                visible_id: req.body.visible_id,
                title: req.body.title,
                entry: req.body.entry,
                date: req.body.date,
                background: req.body.background,
                miniature: req.body.miniature,
                output: req.body.output,
                state: req.body.state
            }
        },
    function(err, post){
        res.json(post);
    })
});

app.get('/api/admin/post/:visible_id', function(req, res){
   var vis_id = req.params.visible_id;
   Post.find()
       .where('visible_id')
       .equals(vis_id)
       .exec(function(err, data){
           res.json(data);
       })
});


app.get('/api/admin/info', function(req, res){
    Info.find()
        .exec(function(err, data){
            res.json(data);
        })
});



app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
});



app.listen(8083);
