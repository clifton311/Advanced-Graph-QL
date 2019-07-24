const Subscription = {
  count : {
    subscribe (parent, args, {pubsub}, info) {
      let count = 0;

      setInterval(() => {
        count++
        pubsub.publish('count', {
          //match subscription name
          count:count
        })
      }, 1000)
      return pubsub.asyncIterator('count')
    }
  },

  comment: {
    subscribe(parent, {postID}, {db, pubsub}, info) {
      //see postID is real
   
      const post = db.posts.find((post)=> {
        return post.id === postID && post.published
      })

      console.log("post", post.id, postID)
      if (!post) {
        throw new Error('Post not found')
      }
      return pubsub.asyncIterator(`comment ${postID}`) //commment 44
    }
  }
}

export {Subscription as default}