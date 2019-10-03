import {seed} from '../src/schema/user/user.helpers';
import {users} from './fixtures.json';

export async function seeds() {
	console.log('Seeding DB');
	await seed(users);
	console.log('Users seed Done');
}