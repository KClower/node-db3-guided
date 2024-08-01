const db = require('../../data/db-config.js')

module.exports = {
  find,
  findById,
  findPosts,
  update,
  add,
  remove
}

function find() {
  return db('users')
    .leftJoin('posts', 'users.id', 'posts.user_id')  // Adjust the table and column names as necessary
    .select('users.id as user_id', 'users.username')
    .count('posts.id as post_count')  // Adjust the post ID column name as necessary
    .groupBy('users.id', 'users.username')
    .orderBy('user_id');  // Optional: to order the results by user_id
  /*
    Improve so it resolves this structure:

    [
        {
            "user_id": 1,
            "username": "lao_tzu",
            "post_count": 6
        },
        {
            "user_id": 2,
            "username": "socrates",
            "post_count": 3
        },
        etc
    ]
  */
}

async function findById(id) {
  // Get user information
  const user = await db('users')
    .select('id as user_id', 'username')
    .where({ id })
    .first();

  if (!user) {
    return null; // or throw an error if user is not found
  }

  // Get user's posts
  const posts = await db('posts')
    .select('id as post_id', 'contents')
    .where({ user_id: id });

  // Combine results
  return {
    ...user,
    posts
  };
}
//return db('users').where({ id }).first()
/*
  Improve so it resolves this structure:

  {
    "user_id": 2,
    "username": "socrates"
    "posts": [
      {
        "post_id": 7,
        "contents": "Beware of the barrenness of a busy life."
      },
      
    ]
  }
*/


function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id)
    })
}

function findPosts(user_id) {
  return db('posts')
    .join('users', 'posts.user_id', 'users.id')  // Join the posts table with the users table
    .select('posts.id as post_id', 'posts.contents', 'users.username')  // Select the required fields
    .where('posts.user_id', user_id);  // Filter posts by the given user_id
  /*
    Implement so it resolves this structure:

    [
      {
          "post_id": 10,
          "contents": "Trusting everyone is...",
          "username": "seneca"
      },
      etc
    ]
  */
}





function add(user) {
  return db('users')
    .insert(user)
    .then(([id]) => { // eslint-disable-line
      return findById(id)
    })
}

function remove(id) {
  // returns removed count
  return db('users').where({ id }).del()
}
