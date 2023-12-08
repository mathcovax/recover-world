import {defineStore} from "pinia";
import {taob} from "src/taob";
import {reactive, ref} from "vue";

export interface DataUserStore{
	isConnected: boolean,
	email?: string,
	pseudo?: string,
}

export const userStore = defineStore(
	"userStore",
	() => {
		const token = ref(localStorage.getItem("access_token"));
		const data = reactive<DataUserStore>({isConnected: true});

		const getInfo = async() => {
			const result = await taob.get("/user", {}, {})
			.s(({email, pseudo}) => {
				data.isConnected = true;
				data.email = email;
				data.pseudo = pseudo;
			})
			.result;
			
			return !result.error;
		};

		return {
			token,
			data, 
			getInfo,
		};
	}
);
