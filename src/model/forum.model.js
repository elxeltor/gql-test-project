import {FORUM_DB_STRING} from '../config';
import {StorageError} from '../utils/error';
import * as database from './storage';

export async function create(data) {
	const forumId = database.getUniqueId();
	const forum = {
		...data,
		id: forumId,
		messages: []
	};
	const forums = await database.get(FORUM_DB_STRING)
		.then(resp => resp || {});

	forums[forumId] = forum;
	await database.set(FORUM_DB_STRING, forums);
	return forum;
}

export async function get(forumId) {
	return database.get(FORUM_DB_STRING)
		.then(forums => {
			if (forums && forums[forumId]) {
				return forums[forumId];
			}

			throw new StorageError({
				message: 'Forum does not exist'
			});
		});
}

export async function remove(forumId) {
	return database.get(FORUM_DB_STRING)
		.then(forums => {
			if (forums && forums[forumId]) {
				delete forums[forumId];
				return database.set(FORUM_DB_STRING, forums);
			}

			throw new StorageError({
				message: 'Forum does not exist'
			});
		});
}

export async function addMessage(forumId, messageId) {
	return database.get(FORUM_DB_STRING)
		.then(forums => {
			if (forums && forums[forumId]) {
				forums.forumId.messages.push(messageId);
				return database.set(FORUM_DB_STRING, forums);
			}

			throw new StorageError({
				message: 'Forum does not exist'
			});
		});
}

/**
 * @typedef {Object} Forum
 * @prop {Number} id Forum's ID
 * @prop {String} title Forum's name
 */

/**
 * Seeds the Forums table and clears any previously
 * existing data
 * @param {Forum[]} Forum
 */
export async function seed(forumsList) {
	const forums = forumsList.reduce((acc, forum) => {
		acc[forum.id] = forum;
		return acc;
	}, {});
	return database.set(FORUM_DB_STRING, forums);
}
