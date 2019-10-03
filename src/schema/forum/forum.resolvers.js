import {getUsers, getUser} from '../user/user.helpers';
import {MutationError} from '../../utils/error';
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
	await getUser(userId)
		.then(user => {
			if (user === null) {
				throw new MutationError({
					message: 'Cannot add an invalid user to a Forum'
				});
			}
		});
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
		deleteForum: deleteForumResolver,
		joinForum: joinForumResolver
	},
	Forum: {
		participants: forumUsersResolver
	}
};
