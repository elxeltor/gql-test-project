
const DEFAULT_STORAGE_ERROR = '101';
const DEFAULT_MUTATION_ERROR = '201';
const DEFAULT_INTERNAL_ERROR = '301';
const DEFAULT_VALIDATION_ERROR = '401';

export class StorageError extends Error {
	constructor(args) {
		super('StorageError');
		this.name = this.constructor.name;

		this.code = args.code || DEFAULT_STORAGE_ERROR;
		this.message = args.message || 'Undefined storage error.';

		if (process.env.NODE_ENV !== 'test') {
			// @TODO: Use proper Logger in real project
			console.error(`[${this.name}] details: ${args.details || this.message}`);
		}
	}
}

export class MutationError extends Error {
	constructor(args) {
		super('MutationError');
		this.name = this.constructor.name;

		this.code = args.code || DEFAULT_MUTATION_ERROR;
		this.message = args.message || 'Undefined mutation error.';

		if (process.env.NODE_ENV !== 'test') {
			// @TODO: Use proper Logger in real project
			console.error(`[${this.name}] details: ${args.details || this.message}`);
		}
	}
}

export class ValidationError extends Error {
	constructor(args) {
		super('ValidationError');
		this.name = this.constructor.name;

		this.code = args.code || DEFAULT_VALIDATION_ERROR;
		this.message = args.message || 'Undefined validation error.';

		if (process.env.NODE_ENV !== 'test') {
			// @TODO: Use proper Logger in real project
			console.error(`[${this.name}] details: ${args.details || this.message}`);
		}
	}
}

export class InternalError extends Error {
	constructor(args) {
		super('InternalError');
		this.name = this.constructor.name;

		this.code = args.code || DEFAULT_INTERNAL_ERROR;
		this.message = args.message || 'Undefined internal error.';

		if (process.env.NODE_ENV !== 'test') {
			// @TODO: Use proper Logger in real project
			console.error(`[${this.name}] details: ${args.details || this.message}`);
		}
	}
}
