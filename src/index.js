const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

async function main() {
  const newLink = await prisma.createLink({
    url: "www.prisma.io",
    description: "Prisma replaces traditional ORMs"
  });
  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);
  const allLinks = await prisma.links();
  console.log(allLinks);
}
main().catch(e => console.error(e));

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone.`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`http://localhost:4000에서 서버 가동 중`));
