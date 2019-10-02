
const DEFAULT_STORAGE_ERROR = '101';

export class StorageError extends Error {
	constructor(args) {
		super('StorageError');
		this.name = this.constructor.name;

		this.code = args.code || DEFAULT_STORAGE_ERROR;
		this.message = args.message || 'Undefined storage error.';

		// @TODO: Use proper Logger in real project
		console.error(`[StorageError] details: ${args.details}`);
	}
}
