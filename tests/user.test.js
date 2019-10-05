import {createUser} from '../src/schema/user/user.helpers';
import {seeds} from '../seed';

describe('[User][Integration]', () => {
	beforeEach(async () => {
		// This is dirty but implementing a proper setup/teardown
		// didn't seem worth the time
		await seeds();
	});

	it('createUser pass', async () => {
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
});
