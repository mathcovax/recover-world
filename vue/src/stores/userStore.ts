import {defineStore} from "pinia";
import {DataUserStore, UserInfoRequest} from "./types";

export const userStore = defineStore(
	"userStore",
	() => {
		const token = ref(localStorage.getItem("access_token"));
		const getToken = () => token.value;
		const setToken = (value: string) => {
			token.value = value;
			localStorage.setItem("access_token", value);
		};

		const data = reactive<DataUserStore>({isConnected: false});
		const getInfo = async() => {
			await dt.get<UserInfoRequest>("/user", undefined, {disabledToast: true})
			.info("user.info", ({email, pseudo, models, colors}) => {
				data.isConnected = true;
				data.email = email;
				data.pseudo = pseudo;
				data.models = JSON.parse(models);
				data.colors = JSON.parse(colors);
			})
			.result;
			
			return data.isConnected;
		};

		return {
			token,
			data, 
			getInfo,
			getToken,
			setToken
		};
	}
);

