const  Comment = {
  //each comment has an author and a post
  author (parent, args, {db}, info) {
     return db.users.find((user) => {
       return user.id === parent.author
     })
  },
  posts (parent, args, ctx, info) {
    return db.posts.find((post) => {
      console.log('post',post)
      return post.id === parent.post
    })
  }
}

export {Comment as default}