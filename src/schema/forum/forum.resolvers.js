import {getForum, getForumsList, createForum, deleteForum, joinForum} from './forum.helpers';

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
async function deleteForumResolver(parent, {userId, forumId}, context) {
	return deleteForum(userId, forumId);
}

// eslint-disable-next-line no-unused-vars
async function joinForumResolver(parent, {userId, forumId}, context) {
	return joinForum(userId, forumId);
}

export default {
	Query: {
		getForum: getForumResolver,
		listForums: listForumsResolver
	},
	Mutation: {
		createForum: createForumResolver,
		deleteForum: deleteForumResolver,
		joinForum: joinForumResolver
	}
};
