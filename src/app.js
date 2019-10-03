import {ApolloServer} from 'apollo-server';
import {seeds} from '../seed';
import {init} from './model';
import {typeDefs, resolvers} from './schema';

const server = new ApolloServer({typeDefs, resolvers});

init().then(seeds)
	.then(() => {
		server.listen().then(({url}) => {
			console.log(`Server ready at ${url}`);
		});
	});
