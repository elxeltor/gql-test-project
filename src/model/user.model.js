import {USER_DB_STRING} from '../config';
import {StorageError} from '../utils/error';
import * as database from './storage';

// //////////
//   PUBLIC
// //////////
export async function create(data) {
	const userId = database.getUniqueId();
	const user = {
		...data,
		id: userId
	};
	await database.set(storageName(userId), user)
		.catch(error => {
			throw new StorageError({
				message: 'Couldn\'t create User.',
				details: error
			});
		});
	return user;
}

export async function get(userId) {
	return database.get(storageName(userId))
		.catch(error => {
			throw new StorageError({
				message: 'Couldn\'t get User.',
				details: error
			});
		});
}

export async function remove(userId) {
	return database.del(storageName(userId))
		.catch(error => {
			throw new StorageError({
				message: 'Couldn\'t delete User.',
				details: error
			});
		});
}

// ///////////
//   PRIVATE
// ///////////
function storageName(userId) {
	return `${USER_DB_STRING}${userId}`;
}
