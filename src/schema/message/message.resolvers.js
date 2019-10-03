import {getUserResolver} from '../user/user.resolvers';

// eslint-disable-next-line no-unused-vars
async function listForumMessagesResolver(parent, args, context) {
	return [{
		id: '',
		timestamp: '',
		userId: '',
		body: ''
	}];
}

// eslint-disable-next-line no-unused-vars
async function getMessageResolver(parent, {id}, context) {
	return {
		id,
		timestamp: '',
		userId: '',
		body: ''
	};
}

// eslint-disable-next-line no-unused-vars
async function postMessageResolver(parent, {input}, context) {
	return {
		id: '',
		timestamp: '',
		userId: input.author,
		body: input.body
	};
}

// eslint-disable-next-line no-unused-vars
async function deleteMessageResolver(parent, {id}, context) {
	return {
		id,
		timestamp: '',
		userId: '',
		body: ''
	};
}

async function messageAuthorResolver(parent, args, context) {
	return getUserResolver(parent, {id: parent.userId}, context);
}

export default {
	Query: {
		listForumMessages: listForumMessagesResolver,
		getMessage: getMessageResolver
	},
	Mutation: {
		postMessage: postMessageResolver,
		deleteMessage: deleteMessageResolver
	},
	Message: {
		author: messageAuthorResolver
	}
};
