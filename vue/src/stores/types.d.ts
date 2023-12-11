export interface DataUserStore{
	isConnected: boolean,
	email?: string,
	pseudo?: string,
}

export type UserInfoRequest = {
	email: string,
	pseudo: string,
}
