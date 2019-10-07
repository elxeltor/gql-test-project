import {getUsers, addUserForum} from '../user/user.helpers';
import {getForum, getForumsList, createForum, joinForum} from './forum.helpers';

// eslint-disable-next-line no-unused-vars
async function getForumResolver(parent, {id}, context) {
	return getForum(id);
}

// eslint-disable-next-line no-unused-vars
async function listForumsResolver(parent, args, context) {
	return getForumsList();
}

// eslint-disable-next-line no-unused-vars
async function createForumResolver(parent, {userId, input}, context) {
	return createForum({
		...input,
		ownerId: userId
	});
}

// eslint-disable-next-line no-unused-vars
async function joinForumResolver(parent, {userId, forumId}, context) {
	await addUserForum(userId, forumId);
	return joinForum(userId, forumId);
}

// eslint-disable-next-line no-unused-vars
async function forumUsersResolver(parent, args, context) {
	return getUsers(parent.participants);
}

export default {
	Query: {
		getForum: getForumResolver,
		listForums: listForumsResolver
	},
	Mutation: {
		createForum: createForumResolver,
		joinForum: joinForumResolver
	},
	Forum: {
		participants: forumUsersResolver
	}
};
