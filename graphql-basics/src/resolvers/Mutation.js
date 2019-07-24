import uuidv4 from 'uuid/v4';

 //Mutations are used for creating, updating data
const Mutation = {
  createUser(parent, args, {db}, info) {
    //args gives access
    const emailTaken = db.users.some((user) => user.email === args.data.email)
    if (emailTaken) {
      throw new Error('Email Taken');
    }

    const user = {
      id: uuidv4(),
      // name: args.name,
      // email: args.email,
      // age: args.age
      ...args.data
    };

    db.users.push(user)
    return user
  },

  deleteUser (parent, args, {db}, info) {
    //find the index of the user that is suppose to be deleted
      const userIndex = db.users.findIndex((user) => {
        console.log('args', args)
        return user.id === args.id
      });

     //if no user of index throws -1, throw user
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const deleted = db.users.splice(userIndex, 1)
    console.log(deleted)

    //remove all associated comments and posts
    db.posts = db.posts.filter((post) => {
      console.log("args", args)
      const match = post.author === args.id;

      if (match) {
        //if posts a match, remove comments
        db.comments = db.comments.filter((comment) => comment.post !== post.id)
      }

       return !match;
    })

    db.comments = db.comments.filter((comment) => comment.author !== args.id);

    return deleted[0];
  },

  updateUser (parent, args, {db}, info) {

    const {data, id} = args;
    
    const user = db.users.find((user) => {
      console.log("args", args)
      return user.id === args.id
    })

    if (!user) {
      throw new Error("User Not Found")
    }

    //check the type is correct
    if (typeof data.email === "string") {
      //verify no other email
      const emailTaken = db.users.some((user) => {
        return user.email === data.email
      })

      if (emailTaken) {
        throw new Error ("Email Taken")
      }
      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }

    return user
  },

  createPost (parent, args, {db}, info) {
    //make sure author ID matches users
    const userExists = db.users.some((user) => user.id === args.data.author)

    if (!userExists) {
     throw new Error('User Not Found');
    }

    const post = {
      id: uuidv4(),
      // title: args.title,
      // body: args.body,
      // published: args.published,
      // author: args.author
      ...args.data
    }

    db.posts.push(post)
    return post
  },

  deletePost (parent, args, {db}, info) {
    //check if post exists
    const postIndex = db.posts.findIndex((post) => {
      console.log("args",args, post.author)
      return post.id === args.id
    })
    console.log(postIndex)
    //if post does not exist, throw error
    if (postIndex === -1) {
      throw new Error('Post does not exist')
    }
    //if exists, delete
    const deleted = posts.splice(postIndex,1);
    console.log("deleted", deleted)

    //delete comment associated with post
    db.comments = db.comments.filter((comment) => {
     return comment.post !== args.id  
    })
    return deleted[0]
  },

  updatePost (parent, args, {db}, info) {
    const {data, id} = args;
    //find returns the post element
    const post = db.posts.find((post) => post.id === id)
    console.log(post)

    if (!post) {
      throw new error('Post does not exist')
    }

    if (typeof data.title === "string") {
      console.log(post)
      post.title = data.title
    }

    if (typeof data.body === "string") {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published
    }
  
    return post
  },
 
  createComment (parent, args, {db, pubsub}, info) {
    const userExists = db.users.some((user) => {
      return user.id === args.data.author
    })
    const postExists = db.posts.some((post) =>  {
      return post.id === args.data.post && post.published === true
    })

    if (!userExists || !postExists) {
        throw new Error('User or Post Does not Exist')
    }
    const comment = {
      id: uuidv4(),
      // text: args.text,
      // author: args.author,
      // post: args.post
      ...args.data
    }

    db.comments.push(comment)

    pubsub.publish(`comment ${args.data.post}`, {comment: comment})

    return comment
  },

  deleteComment(parent,args,{db}, info) {
    const commmentIndex = db.comments.findIndex((comment) => {
      return comment.id === args.id   
    })

    if (commmentIndex === -1) {
      throw new error('no comment')
    }

    let deleted = db.comments.splice(commmentIndex,1)

    return deleted[0]
  },

  updateComment (parent, args, {db}, info){

    const {data, id} = args;
    console.log('args', args)
    
    const comment = db.comments.find((comment) => comment.id === id)

    console.log('comment', comment)

    if (!comment) {
      throw new error ('COmment not found')
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    return comment
  }
}

export {Mutation as default}
