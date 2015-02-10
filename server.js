/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://mpanysh:834FM1@ds041871.mongolab.com:41871/mp-blog');

app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


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

app.get('/api/posts', function(req, res){

    mongoose.set('debug', true);
    Post.find({         })
        .exec(
        function(err,items){
            res.json(items);
        })


});

app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
});



app.listen(8083);
