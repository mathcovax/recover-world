export interface DataUserStore{
	isConnected: boolean,
	email?: string,
	pseudo?: string,
	models?: Record<string, number>,
	colors?: Record<string, string>,
}

export type UserInfoRequest = {
	email: string,
	pseudo: string,
	models: string,
	colors: string,
}
