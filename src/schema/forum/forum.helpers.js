import * as ForumModel from '../../model/forum.model';
import {MutationError} from '../../utils/error';

export async function getForum(forumId) {
	return ForumModel.get(forumId);
}

export async function getForumsList(forumIds) {
	return ForumModel.getMany(forumIds)
		.then(forums => {
			return Object.values(forums);
		});
}

export async function createForum(input) {
	if (isForumInputValid(input)) {
		return ForumModel.create(input);
	}

	throw new MutationError({
		message: 'Forum input is invalid'
	});
}

export async function deleteForum(userId, forumId) {
	const isOwner = await isForumOwner(userId, forumId);
	if (isOwner) {
		await ForumModel.remove(forumId);
		return {id: forumId};
	}

	throw new MutationError({
		message: 'Cannot delete a forum you don\'t manage'
	});
}

export async function joinForum(userId, forumId) {
	return ForumModel.addParticipant(userId, forumId);
}

export async function seed(forums) {
	if (!Array.isArray(forums)) {
		throw new TypeError('Invalid Forums seed, the seed needs to be a list');
	}

	for (const form of forums) {
		if (isNaN(parseInt(form.id, 10)) || form.id <= 0) {
			throw new TypeError('Invalid Forums seed, the ID is required and must be greater than zero');
		}

		if (!isForumInputValid(form)) {
			throw new TypeError('Invalid seed data');
		}
	}

	return ForumModel.seed(forums);
}

function isForumInputValid(input) {
	return input.title.length > 0;
}

async function isForumOwner(userId, forumId) {
	return ForumModel.get(forumId)
		.then(forum => {
			return forum.ownerId === userId;
		});
}
