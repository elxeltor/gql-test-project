import * as UserModel from '../../model/user.model';
import {validateUserInput} from './user.validation';

export async function getUser(userId) {
	return UserModel.get(userId)
		.then(formatUserOutput);
}

export async function getUsers(userIds) {
	return UserModel.getMany(userIds);
}

export async function createUser(input) {
	validateUserInput(input);
	return UserModel.create(input)
		.then(formatUserOutput);
}

export async function deleteUser(userId) {
	await UserModel.remove(userId);
	return {id: userId};
}

export async function addUserForum(userId, forumId) {
	return UserModel.addJoinedForum(userId, forumId);
}

export async function seed(users) {
	if (!Array.isArray(users)) {
		throw new TypeError('Invalid Users seed, the seed needs to be a list');
	}

	for (const user of users) {
		if (isNaN(parseInt(user.id, 10)) || user.id <= 0) {
			throw new Error('Invalid Users seed, the ID is required and must be greater than zero');
		}

		validateUserInput(user);
	}

	UserModel.seed(users);
}

function formatUserOutput(userData) {
	return userData;
}
