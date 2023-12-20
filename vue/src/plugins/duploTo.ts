import DuplojsTo from "@duplojs/to";
import {fixedStore} from "@SRC/fixed/fixedStore";

interface InterceptorParams{
	loader?: ReturnType<ReturnType<typeof fixedStore>["pushLoader"]>,
	disabledLoader?: boolean,
	disabledToast?: boolean,
}

export const dt = new DuplojsTo<InterceptorParams>({
	prefix: "/duplojs",
});

export function setupDuploTo(){
	const {pushLoader, pushToast} = fixedStore();
	const {getToken} = userStore();

	//add access_token header for all request
	dt.setDefaultHeaders({
		get access_token(){
			return getToken() ?? undefined;
		}
	});

	dt.setRequestInterceptor((request, params) => {
		if(params.disabledLoader !== true){
			params.loader = pushLoader();
		}
		return request;
	});

	dt.setResponseInterceptor((resposne, request, params) => {
		if(params.loader){
			params.loader.close();
		}
		if(
			params.disabledToast !== true && 
			resposne.response &&
			resposne.info
		){
			const message = i18n.global.t(resposne.info);
			if(message !== resposne.info){
				pushToast(resposne.response.ok ? "success" : "error", message);
			}
		}
		
		return resposne;
	});
}
