const express = require('express')
const db = require('../data/db-config.js');

const UserRouter = require('./users/user-router.js')

const server = express()

server.use(express.json())
server.use('/api/users', UserRouter)

server.get('/api/posts', (req, res) => {

  // select posts.contents as Quote, users.username as PostedBy
  // from posts
  // join users on posts.user_id = users.id;

  db('posts')
    .join('users', 'posts.user_id', 'users.id')
    .select('posts.contents as Quote', 'users.username as PostedBy')
    .then(posts => {
      return res.status(200).json({ data: posts })
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ error: error.message })
    })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message })
})

module.exports = server
