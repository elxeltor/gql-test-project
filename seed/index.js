import {seed as seedUsers} from '../src/schema/user/user.helpers';
import {seed as seedForums} from '../src/schema/forum/forum.helpers';
import {users, forums} from './fixtures.json';

export async function seeds() {
	await seedUsers(users);
	await seedForums(forums);
}
