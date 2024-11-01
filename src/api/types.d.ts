declare namespace API {
	export interface BaseResponse<T> {
		meta: {
			code: number
			msg: string
		}
		data: T
	}

	export interface Collection<T> {
		total: number
		items: T[]
	}

	interface BaseEntity {
		id: string
		created_at: number
		deleted_at: number
		updated_at: number
		version: number
	}

	export interface IdentityRequest {
		id: string
	}

	export namespace Login {
		export interface Request {
			account: string
			password: string
		}

		export interface Response extends BaseResponse<string> {}
	}
}
