import * as ForumModel from '../../model/forum.model';
import {ValidationError} from '../../utils/error';

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

	throw new ValidationError({
		message: 'Forum input is invalid'
	});
}

export async function deleteForum(userId, forumId) {
	const isOwner = await isForumOwner(userId, forumId);
	if (isOwner) {
		await ForumModel.remove(forumId);
		return {id: forumId};
	}

	throw new ValidationError({
		message: 'Cannot delete a forum you don\'t manage'
	});
}

export async function joinForum(userId, forumId) {
	return ForumModel.addParticipant(userId, forumId);
}

export async function addForumMessage(forumId, input) {
	return ForumModel.addMessage(forumId, input);
}

export async function seed(forums) {
	if (!Array.isArray(forums)) {
		throw new TypeError('Invalid Forums seed, the seed needs to be a list');
	}

	for (const forum of forums) {
		if (isNaN(parseInt(forum.id, 10)) || forum.id <= 0) {
			throw new TypeError('Invalid Forums seed, the ID is required and must be greater than zero');
		}

		if (!isForumInputValid(forum)) {
			throw new TypeError('Invalid Forum seed data');
		}

		for (const message of forum.messages) {
			if (!isMessageDataValid(message)) {
				throw new TypeError('Invalid Message seed');
			}
		}
	}

	return ForumModel.seed(forums);
}

function isMessageDataValid(message) {
	if (isNaN(parseInt(message.timestamp, 10))) {
		throw new ValidationError({
			message: 'Invalid Message ID'
		});
	}

	if (isNaN(parseInt(message.author, 10))) {
		throw new ValidationError({
			message: 'Invalid Message author'
		});
	}

	if (typeof message.body !== 'string' || message.body === '') {
		throw new ValidationError({
			message: 'Invalid Message body'
		});
	}

	return true;
}

function isForumInputValid(input) {
	// Should also check if the ownerId exists in the User table
	// That would be traitforwat on an SQL DB using a foreign key reference
	if (isNaN(parseInt(input.ownerId, 10))) {
		throw new ValidationError({
			message: 'Invalid Owner ID'
		});
	}

	if (typeof input.title !== 'string' || input.title === '') {
		throw new ValidationError({
			message: 'Invalid Forum title'
		});
	}

	return true;
}

async function isForumOwner(userId, forumId) {
	return ForumModel.get(forumId)
		.then(forum => {
			return forum.ownerId === userId;
		});
}

export async function isForumParticipant(userId, forumId) {
	return ForumModel.get(forumId)
		.then(forum => {
			return forum.participants.includes(userId);
		});
}
