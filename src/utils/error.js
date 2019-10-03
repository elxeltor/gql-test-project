
const DEFAULT_STORAGE_ERROR = '101';
const DEFAULT_MUTATION_ERROR = '201';

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

export class MutationError extends Error {
	constructor(args) {
		super('MutationError');
		this.name = this.constructor.name;

		this.code = args.code || DEFAULT_MUTATION_ERROR;
		this.message = args.message || 'Undefined mutation error.';

		// @TODO: Use proper Logger in real project
		console.error(`[MutationError] details: ${args.details}`);
	}
}
