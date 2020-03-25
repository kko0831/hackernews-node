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
    feed: () => links
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`http://localhost:4000에서 서버 가동 중`));
