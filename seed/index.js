import {seed as seedUsers} from '../src/schema/user/user.helpers';
import {seed as seedForums} from '../src/schema/forum/forum.helpers';
import {users, forums} from './fixtures.json';

export async function seeds() {
	console.log('- Seeding DB');
	await seedUsers(users);
	console.log('-- Users seed Done');
	await seedForums(forums);
	console.log('-- Forums seed Done');
	console.log('- Seeding DONE!');
}
