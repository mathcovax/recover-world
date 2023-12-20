import {defineStore} from "pinia";

interface Toast{
	id: number,
	timeout: NodeJS.Timeout,
	status: "error" | "success",
	message: string,
	close(): void,
}

interface Loader{
	show: boolean,
	queue: LoaderQueue[],
	timeout?: NodeJS.Timeout,
	interval?: NodeJS.Timeout
}

interface LoaderQueue{
	id: number,
	close(): void,
}

export const fixedStore = defineStore(
	"fixedStore",
	() => {
		const toasts = ref<Toast[]>([]);
		const pushToast = (status: Toast["status"], message: Toast["message"]) => {
			const findedToats = toasts.value.find(v => v.message === message);
			if(findedToats){
				clearTimeout(findedToats.timeout);
				findedToats.timeout = setTimeout(() => findedToats.close(), 8000);
				return findedToats;
			}

			const toast: Toast = {
				id: Math.random(),
				message,
				status,
				timeout: setTimeout(() => toast.close(), 8000),
				close: () => {
					clearTimeout(toast.timeout);
					const index = toasts.value.findIndex(t => t.id === toast.id);
					
					if(index !== -1){
						toasts.value.splice(index, 1);
					}
				}
			};

			toasts.value.push(toast);

			return toast;
		};

		const loader = reactive<Loader>({
			show: false,
			queue: [],
			timeout: undefined,
			interval: undefined,
		});
		const pushLoader = () => {
			if(loader.queue.length === 0){
				// timeout check if queue is not empty after 200ms to enabled loader
				loader.timeout = setTimeout(
					() => {
						if(loader.queue.length !== 0){
							loader.show = true;

							// interval check if queue is empty to disabled loader
							loader.interval = setInterval(
								() => {
									if(loader.queue.length === 0){
										clearInterval(loader.interval);
										loader.show = false;
									}
								},
								200
							);
						}
					},
					200
				);
			}

			const loaderQueue: LoaderQueue = {
				id: Math.random(),
				close: () => {
					const index = loader.queue.findIndex(lq => lq.id === loaderQueue.id);
					
					if(index !== -1){
						loader.queue.splice(index, 1);

						if(
							loader.queue.length === 0 && 
							loader.show === false
						){
							clearTimeout(loader.timeout);
						}
					}
				}
			};

			loader.queue.push(loaderQueue);

			return loaderQueue;
		};

		return {
			toasts,
			pushToast,

			loader,
			pushLoader
		};
	}
);
