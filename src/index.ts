import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";

const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }: { url: string }) => {

    console.log(`Server ready at ${url}`);
});