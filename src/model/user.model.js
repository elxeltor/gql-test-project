import {USER_DB_STRING} from '../config';
import {StorageError} from '../utils/error';
import * as database from './storage';

export async function init() {
	const forums = database.get(USER_DB_STRING);
	if (forums === null) {
		await database.set(USER_DB_STRING, {});
	}
}

export async function create(data) {
	const userId = database.getUniqueId();
	const user = {
		...data,
		id: userId
	};
	const users = await database.get(USER_DB_STRING);

	users[userId] = user;
	await database.set(USER_DB_STRING, users);
	return user;
}

export async function get(userId) {
	return database.get(USER_DB_STRING)
		.then(users => {
			if (users && users[userId]) {
				return users[userId];
			}

			throw new StorageError({
				message: 'User does not exist'
			});
		});
}

export async function remove(userId) {
	return database.get(USER_DB_STRING)
		.then(users => {
			if (users && users[userId]) {
				delete users[userId];
				return database.set(USER_DB_STRING, users);
			}

			throw new StorageError({
				message: 'User does not exist'
			});
		});
}

/**
 * @typedef {Object} User
 * @prop {Number} id User's ID
 * @prop {String} displayName User's public name
 * @prop {Number} [age] User's age
 */

/**
 * Seeds the Users table and clears any previously
 * existing data
 * @param {User[]} users
 */
export async function seed(usersList) {
	const users = usersList.reduce((acc, user) => {
		acc[user.id] = user;
		return acc;
	}, {});
	return database.set(USER_DB_STRING, users);
}
