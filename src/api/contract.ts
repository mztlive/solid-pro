export type ApiFunction<T, R> = (request: T) => Promise<R>

export type CollectionApiFunction<T, R> = (
    request: T
) => Promise<API.Collection<R>>

export type LoginFunction = (authRequest: API.Login.Request) => Promise<string>
