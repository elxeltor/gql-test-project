import {FORUM_DB_STRING} from '../config';
import {StorageError} from '../utils/error';
import * as database from './storage';

export async function init() {
	const forums = database.get(FORUM_DB_STRING);
	if (forums === null) {
		await database.set(FORUM_DB_STRING, {});
	}
}

export async function create(data) {
	const forumId = database.getUniqueId();
	const forum = {
		...data,
		id: forumId,
		messages: [],
		participants: [data.ownerId]
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

/**
 * Retrives a sub-list (or all) forums
 * @param {String[]} [forumIds] Sub-list of forums to retrieve
 */
export async function getMany(forumIds) {
	const allForums = await database.get(FORUM_DB_STRING);
	if (Array.isArray(forumIds)) {
		return forumIds.reduce((acc, forumId) => {
			// @Warn: For now, we'll ignore the case where we're passed invalid forum IDs
			if (allForums[forumId]) {
				acc[forumId] = allForums[forumId];
			}

			return acc;
		}, {});
	}

	return allForums;
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

export async function addParticipant(userId, forumId) {
	return database.get(FORUM_DB_STRING)
		.then(async forums => {
			if (forums && forums[forumId]) {
				forums[forumId].participants.push(userId);
				await database.set(FORUM_DB_STRING, forums);
				return forums[forumId];
			}

			throw new StorageError({
				message: 'Forum does not exist'
			});
		});
}

export async function addMessage(forumId, message) {
	return database.get(FORUM_DB_STRING)
		.then(async forums => {
			if (forums && forums[forumId]) {
				forums[forumId].messages.push(message);
				await database.set(FORUM_DB_STRING, forums);
				return forums[forumId].messages;
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
