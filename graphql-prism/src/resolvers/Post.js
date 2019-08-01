const  Post = {
  //author is defined above
  author(parent, args, {db}, info) {
    //post lives on the parent object posts
    return db.users.find((user) => {
      console.log('----->',parent.title)
      return user.id === parent.author
    })
  },
  comments ( parent, args, ctx, info) {
    return db.comments.filter((comment)=> {
      return comment.post === parent.id
    })
  }
}

export {Post as default}