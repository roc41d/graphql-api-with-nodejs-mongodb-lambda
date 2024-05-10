import { ApolloServer as DevServer } from "apollo-server";
import { ApolloServer as ProdServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
    const server = new DevServer({
        typeDefs,
        resolvers,
    });

    server.listen().then(({ url }: { url: string }) => {
        console.log(`Server ready at ${url}`);
    });
} else {
    const server = new ProdServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    exports.handler = server.createHandler();
}


