const Subscription = {
  comment: {
    subscribe(parent, args, {db, pubsub}, info) {
      //see postID is real
      const post = db.posts.find((post)=> {
        return post.id === args.postId && post.published
      })

      // console.log("post", post, postId)
      if (!post) {
        throw new Error('Post not found')
      }
      return pubsub.asyncIterator(`comment ${args.postId}`) //commment 44
    }
  },

  post: {
    subscribe(parent, args, {db, pubsub}, info) {
      return pubsub.asyncIterator(`post`)
    }
  }
}

export {Subscription as default}