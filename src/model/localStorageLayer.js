import {LocalStorage} from 'node-localstorage';
const localStorage = new LocalStorage('./storage');

export function get(key) {
	return JSON.parse(localStorage.getItem(key));
}
export function set(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}
export function del(key) {
	localStorage.removeItem(key);
}
export function reset() {
	localStorage.clear();
}
export function getUniqueId() {
	// Sufficient for test purposes
	return (new Date()).getTime();
}
