
// eslint-disable-next-line no-unused-vars
async function getForumResolver(parent, {id}, context) {
	return {
		id,
		title: '',
		messages: []
	};
}

// eslint-disable-next-line no-unused-vars
async function listForumsResolver(parent, args, context) {
	return [{
		id: '',
		title: '',
		messages: []
	}];
}

// eslint-disable-next-line no-unused-vars
async function createForumResolver(parent, {input}, context) {
	return {
		id: '',
		title: input.title,
		messages: []
	};
}

// eslint-disable-next-line no-unused-vars
async function deleteForumResolver(parent, {id}, context) {
	return {id};
}

// eslint-disable-next-line no-unused-vars
async function joinForumResolver(parent, {id}, context) {
	return {
		id,
		title: '',
		messages: []
	};
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
