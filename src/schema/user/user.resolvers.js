import {getForumsList} from '../forum/forum.helpers';
import {getUser, createUser} from './user.helpers';

async function userMeResolver(parent, params, context) {
	return getUser(context.user.id);
}

export async function getUserResolver(parent, {id}, _) {
	return getUser(id);
}

async function createUserResolver(parent, {input}, _) {
	return createUser(input);
}

async function userForumsResolver(parent) {
	return getForumsList(parent.forums || []);
}

export default {
	Query: {
		me: userMeResolver,
		getUser: getUserResolver
	},
	Mutation: {
		createUser: createUserResolver
	},
	User: {
		forums: userForumsResolver
	}
};
