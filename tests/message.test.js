import {seeds} from '../seed';
import {addForumMessage} from '../src/schema/forum/forum.helpers';
import {StorageError} from '../src/utils/error';

describe('[Message][Integration]', () => {
	beforeEach(async () => {
		await seeds();
	});

	describe('[postMessage]', () => {
		it('Should post a message to a forum and return the list of messages', async () => {
			const forumId = '1570132109586';
			const input = {
				author: '1570072212473',
				body: 'a test message'
			};
			const msgList = await addForumMessage(forumId, input);
			expect(msgList.length).toBe(5);
		});
		it('Should fail post a message to an invalid forum', async () => {
			const forumId = '123';
			const input = {
				author: '1570072212473',
				body: 'a test message'
			};
			await addForumMessage(forumId, input)
				.catch(error => {
					expect(error).toBeInstanceOf(StorageError);
				})
				.then(res => {
					expect(res).toBeUndefined();
				});
		});
	});
});
