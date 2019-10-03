import {seed} from '../src/schema/user/user.helper';
import {users} from './fixtures.json';

export async function seeds() {
	await seed(users);
}
