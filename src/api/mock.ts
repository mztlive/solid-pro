import type { LoginFunction } from "./contract"

export const fakeLogin: LoginFunction = async (
	authRequest: API.Login.Request,
): Promise<string> => {
	// 模拟一个登录请求
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (
				authRequest.account === "admin" &&
				authRequest.password === "password"
			) {
				resolve("fake-token")
			} else {
				reject(new Error("用户名或密码错误"))
			}
		}, 1000)
	})
}
