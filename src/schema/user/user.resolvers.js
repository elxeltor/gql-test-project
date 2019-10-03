import {getUser, createUser, deleteUser} from './user.helpers';

async function userMeResolver(parent, params, context) {
	return getUser(context.user.id);
}

export async function getUserResolver(parent, {id}, _) {
	return getUser(id);
}

async function createUserResolver(parent, {input}, _) {
	return createUser(input);
}

async function deleteUserResolver(parent, {id}, _) {
	return deleteUser(id);
}

export default {
	Query: {
		me: userMeResolver,
		getUser: getUserResolver
	},
	Mutation: {
		createUser: createUserResolver,
		deleteUser: deleteUserResolver
	}
};
