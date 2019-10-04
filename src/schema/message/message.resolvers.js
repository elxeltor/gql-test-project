import {getUser} from '../user/user.helpers';
import {getForum, addForumMessage, isForumParticipant} from '../forum/forum.helpers';
import {MutationError} from '../../utils/error';

// eslint-disable-next-line no-unused-vars
async function listForumMessagesResolver(parent, {id}, context) {
	return getForum(id)
		.then(forum => {
			return forum.messages.reverse();
		});
}

// eslint-disable-next-line no-unused-vars
async function postMessageResolver(parent, {userId, forumId, input}, context) {
	if (await isForumParticipant(userId)) {
		return addForumMessage(userId, forumId, input)
			.then(forum => {
				return forum.messages.reverse();
			});
	}

	throw new MutationError({
		message: 'You must be part of the forum in order to post in it'
	});
}

// eslint-disable-next-line no-unused-vars
async function messageAuthorResolver(parent, args, context) {
	return getUser(parent.author);
}

export default {
	Query: {
		listForumMessages: listForumMessagesResolver
	},
	Mutation: {
		postMessage: postMessageResolver
	},
	Message: {
		author: messageAuthorResolver
	}
};
