const Query = {
    users (parent, args, {db}, info){
      if (!args.query) {
        return db.users
      }
      return db.users.filter((user)=> {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },

    posts (parent, args, {db}, info) {
      if (!args.query) {
        return db.posts
      }
      return db.posts.filter((post) => {
          return post.title.toLowerCase().includes(args.query.toLowerCase()) ||
                 post.body.toLowerCase().includes(args.query.toLowerCase()) 
        // return isTitleMatch || isBodyMatch
      })
    },

    comments (parent, args, {db}, info) {
      return db.comments
    },

    me() {
      return {
        id: "1232",
        name: "Book",
        email: "cliftonho311@",
        published: 1999
      }
    },
  }

  export {Query as default}
