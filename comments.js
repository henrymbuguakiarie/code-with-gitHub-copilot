// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// Create express app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Define port to listen for requests
const port = process.env.PORT || 4001;

// Create route handler for GET request at /posts/:id/comments
app.get('/posts/:id/comments', async (req, res) => {
  // Get comments from query service
  const comments = await axios.get(`http://localhost:4002/posts/${req.params.id}/comments`);

  // Return comments
  res.send(comments.data);
});

// Create route handler for POST request at /posts/:id/comments
app.post('/posts/:id/comments', async (req, res) => {
  // Get comment from request body
  const { content } = req.body;

  // Get comments from query service
  const comments = await axios.post(`http://localhost:4002/posts/${req.params.id}/comments`, {
    content
  });

  // Return comments
  res.send(comments.data);
});

// Listen for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});