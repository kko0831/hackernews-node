const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
    info: String!
}
`;

const resolvers = {
  Query: {
    info: () => `Hackernews Clone의 API입니다`
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`http://localhost:4000에서 서버 가동 중`));
