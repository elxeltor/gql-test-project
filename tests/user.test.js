import {createUser, getUser} from '../src/schema/user/user.helpers';
import {seeds} from '../seed';
import {ValidationError, StorageError} from '../src/utils/error';

describe('[User][Integration]', () => {
	beforeEach(async () => {
		// This is dirty but implementing a proper setup/teardown
		// didn't seem worth the time
		await seeds();
	});

	describe('[createUser]', () => {
		it('Should create a user and return it', async () => {
			const input = {
				displayName: 'toto',
				age: 36
			};
			const user = await createUser(input);
			expect(user).toEqual(expect.objectContaining({
				...input,
				id: expect.any(Number),
				forums: []
			}));
		});
		it('Should fail create a user with invalid name', async () => {
			const input = {
				displayName: 'fuuck',
				age: 36
			};
			let user;
			try {
				user = await createUser(input);
			} catch (error) {
				expect(error).toBeInstanceOf(ValidationError);
			}

			expect(user).toBeUndefined();
		});
	});

	describe('[getUser]', () => {
		it('Should find and return a user\'s iformation', async () => {
			const id = 1570071891533;
			const user = await getUser(id);
			expect(user).toEqual({
				id,
				displayName: 'Joe',
				forums: [],
				age: 42
			});
		});
		it('Should throw querying an invalid user', async () => {
			let user;
			try {
				user = await getUser(123);
			} catch (error) {
				expect(error).toBeInstanceOf(StorageError);
			}

			expect(user).toBeUndefined();
		});
	});
});
