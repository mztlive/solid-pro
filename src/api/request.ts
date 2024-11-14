// import toast from 'solid-toast'


export const defaultRequestInit = (): RequestInit => {
	return {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	}
}

const convertResponse = async <T>(response: Response): Promise<T> => {
	switch (response.status) {
		case 200: {
			const result: API.BaseResponse<T> = await response.json()

			if (result.meta.code === 401) {
				window.localStorage.removeItem("token")
				window.location.href = "/login"
				return
			}

			if (result.meta.code !== 200) {
				throw new Error(result.meta.msg)
			}

			return result.data
		}
		case 401: {
			window.localStorage.removeItem("token")
			window.location.href = "/login"
			return
		}
		case 403: {
			throw new Error("Permission denied")
		}
		case 404: {
			throw new Error("Api Not Found")
		}
		case 500: {
			const result: API.BaseResponse<T> = await response.json()

			throw new Error(result.meta.msg)
		}
		default: {
			const body: string = await response.text()
			throw new Error(body)
		}
	}
}

export const request = async <T>(
	url: string,
	method: string,
	body?: unknown,
): Promise<T> => {
	const requestInit = defaultRequestInit()
	requestInit.method = method
	if (body) {
		requestInit.body = JSON.stringify(body)
	}

	const response = await fetch(url, requestInit)

	return convertResponse<T>(response)
}

export const upload = async (file: File[], url: string) => {
	const formData = new FormData()
	for (let i = 0; i < file.length; i++) {
		formData.append(`file${i}`, file[i])
	}

	try {
		const response = await fetch(url, {
			method: "POST",
			body: formData,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})

		return convertResponse<string[]>(response)
	} catch (_error) {
		throw Error("Connection Reset")
	}
}
