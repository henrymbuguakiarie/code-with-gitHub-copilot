// create web server with express
const express = require('express');
const app = express();
// create body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// create mongoose
const mongoose = require('mongoose');
// connect to mongodb
mongoose.connect('mongodb://localhost:27017/comments');
// create schema
const CommentSchema = mongoose.Schema({ name: String, comment: String });
// create model
const Comment = mongoose.model('Comment', CommentSchema);
// create route
app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    try {
        await comment.save();
        res.send(comment);
    } catch (error) {
        res.sendStatus(500);
    }
    });