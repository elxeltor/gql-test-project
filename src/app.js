import {ApolloServer} from 'apollo-server';
import {seeds} from '../seed';
import {typeDefs, resolvers} from './schema';

const server = new ApolloServer({typeDefs, resolvers});

seeds().then(() => {
	server.listen().then(({url}) => {
		console.log(`Server ready at ${url}`);
	});
});
