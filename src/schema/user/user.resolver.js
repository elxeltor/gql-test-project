import {getUser, createUser, deleteUser} from './user.helper';

async function userMeResolver(parent, params, context) {
	return getUser(context.user.id)
}

async function getUserResolver(parent, {id}, context) {
	return getUser(id);
}

async function createUserResolver(parent, {inupt}, context) {
	return createUser(input);
}

async function deleteUserResolver(parent, {id}, context) {
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
}
