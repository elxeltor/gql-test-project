import {ValidationError} from '../../utils/error';

export function validateUserInput(input) {
	nameRequirements(input.displayName);
	nameProfanityFilter(input.displayName);
	ageRequirements(input.age);
	return input;
}

function nameRequirements(name) {
	if (name.length < 3) {
		throw new ValidationError({
			message: 'Name is too short (3 chanracters minimum).'
		});
	}
}

function nameProfanityFilter(name) {
	const myFilter = /f[aeiou]+[ck]+/;
	if (myFilter.test(name.toLowerCase())) {
		throw new ValidationError({
			message: 'You cannot use profanities in your username'
		});
	}
}

function ageRequirements(age) {
	if (!isNaN(parseInt(age, 10)) && age < 18) {
		throw new ValidationError({
			message: 'You must be an adult to register.'
		});
	}
}
