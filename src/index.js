const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

let links = [
  {
    id: "link-0",
    description: "Fullstack tutorial for GraphQL",
    url: "www.howtographql.com"
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone.`,
    feed: () => links
  },

  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});
server.start(() => console.log(`http://localhost:4000에서 서버 가동 중`));
