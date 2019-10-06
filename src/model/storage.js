import {LocalStorage} from 'node-localstorage';
const localStorage = new LocalStorage('./storage');

export async function get(key) {
	const data = localStorage.getItem(key);
	if (data === null || data === undefined) {
		return null;
	}

	return JSON.parse(data);
}

export async function set(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export async function del(key) {
	localStorage.removeItem(key);
}

export function reset() {
	localStorage.clear();
}

export function getUniqueId() {
	// Sufficient for test purposes
	return (new Date()).getTime().toString();
}
