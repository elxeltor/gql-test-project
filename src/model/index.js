import * as ForumModel from './forum.model';
import * as UserModel from './user.model';

export async function init() {
	await ForumModel.init();
	await UserModel.init();
}
