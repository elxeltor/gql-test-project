import * as UserModel from '../../model/user.model';
import {validateUserInput} from './user.validation';

export async function getUser(userId) {
	return UserModel.get(userId)
		.then(formatUserOutput);
}

export async function createUser(input) {
	validateUserInput(input);
	return UserModel.create(input)
		.then(formatUserOutput);
}

export async function deleteUser(userId) {
	await UserModel.remove(userId)
	return {id: userId};
}

function formatUserOutput(userData) {
	return userData;
}
