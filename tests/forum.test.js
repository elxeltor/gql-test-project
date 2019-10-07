import {seeds} from '../seed';
import {createForum, joinForum, getForum} from '../src/schema/forum/forum.helpers';
import {ValidationError, StorageError} from '../src/utils/error';

describe('[Forum][Integration]', () => {
	beforeEach(async () => {
		await seeds();
	});

	describe('[createForum]', () => {
		it('Should create a Forum and return it', async () => {
			const input = {
				title: 'test name',
				ownerId: '1570071807674'
			};
			const forum = await createForum(input);
			expect(forum).toEqual(expect.objectContaining({
				title: input.title,
				id: expect.any(String),
				messages: [],
				participants: [input.ownerId]
			}));
		});
		it('Should fail create a Forum without an owner', async () => {
			const input = {
				title: 'test name'
			};
			let forum;

			try {
				forum = await createForum(input);
			} catch (error) {
				expect(error).toBeInstanceOf(ValidationError);
			}

			expect(forum).toBeUndefined();
		});
	});

	describe('[joinForum]', () => {
		it('A valid User should be able to join a valid forum', async () => {
			const userId = '1570071807674';
			const forumId = '1570156963807';

			const forum = await joinForum(userId, forumId);
			expect(forum.participants).toEqual(['1570072194806', '1570071807674']);
		});

		it('A valid User should fail to join an invalid forum', async () => {
			const userId = '1570071807674';
			const forumId = '123';

			await joinForum(userId, forumId)
				.catch(error => {
					expect(error).toBeInstanceOf(StorageError);
				})
				.then(res => {
					expect(res).toBeUndefined();
				});
		});

		// @Warn: This test doesn't work as expected since the user validity is checked
		// in the resolver, not in the helper. So the end-2-end test
		// would end up in a failing call (as expected)
		it.skip('An invalid User should fail to join a valid forum', async () => {
			const userId = '123';
			const forumId = '1570156963807';

			await joinForum(userId, forumId)
				.catch(error => {
					expect(error).toBeInstanceOf(StorageError);
				})
				.then(res => {
					expect(res).toBeUndefined();
				});
		});
	});

	describe('[getForum]', () => {
		it('Should retrieve and return a single forum', async () => {
			const forumId = '1570156963807';
			const forum = await getForum(forumId);
			expect(forum).toEqual({
				title: 'FAQ',
				ownerId: '1570072194806',
				id: '1570156963807',
				messages: [],
				participants: ['1570072194806']
			});
		});
		it('Should fail retrieve a forum that doesn\'t exist', async () => {
			const forumId = '234';
			await getForum(forumId)
				.catch(error => {
					expect(error).toBeInstanceOf(StorageError);
				})
				.then(res => {
					expect(res).toBeUndefined();
				});
		});
	});
});
