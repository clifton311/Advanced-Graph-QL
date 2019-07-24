import {GraphQLServer, PubSub} from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription';

const pubsub = new PubSub()

const server = new GraphQLServer({
  
  typeDefs :'graphql-basics/src/schema.graphql',
  resolvers : {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment
  },
//easy to share across all resolver methods
  context: {
      db:db,
      pubsub
  }
})

server.start(() => {
  console.log("The server is up")
})