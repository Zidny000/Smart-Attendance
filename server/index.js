require('dotenv').config();

const { ApolloServer, PubSub } = require('apollo-server');

const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');

const pubsub = new PubSub();

const PORT = process.env.PORT || 4000;

var env = process.env.NODE_ENV || 'development';

const server = new ApolloServer({
  cors: {
    origin: ['http://localhost:3000'] ,
    credentials: true
  },
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose
  .connect('mongodb://Zidny:Talukdar@cluster0-shard-00-00.kziux.mongodb.net:27017,cluster0-shard-00-01.kziux.mongodb.net:27017,cluster0-shard-00-02.kziux.mongodb.net:27017/SmartAttendance?ssl=true&replicaSet=atlas-dp76xx-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
