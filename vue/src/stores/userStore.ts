import {defineStore} from "pinia";
import {dt} from "../plugins/duploTo";
import {reactive, ref} from "vue";
import {DataUserStore, UserInfoRequest} from "./types";

export const userStore = defineStore(
	"userStore",
	() => {
		const token = ref(localStorage.getItem("access_token"));
		const data = reactive<DataUserStore>({isConnected: true});

		const getInfo = async() => {
			await dt.get<UserInfoRequest>("/user")
			.s(({email, pseudo}) => {
				data.isConnected = true;
				data.email = email;
				data.pseudo = pseudo;
			})
			.result;
			
			return data.isConnected;
		};

		return {
			token,
			data, 
			getInfo,
		};
	}
);
