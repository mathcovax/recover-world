export class Hook<subscriber extends ((...args: any[]) => any) = () => void>{
	constructor(numberArgs: Parameters<subscriber>["length"]){
		this.numberArgs = numberArgs;
	}

	private numberArgs: number;
	private subscribers: subscriber[] = [];

	addSubscriber(subscriber: subscriber, ...subscribers: subscriber[]){
		this.subscribers.push(subscriber, ...subscribers);
	}

	removeSubscriber(subscriber: subscriber){
		const index = this.subscribers.findIndex(sub => sub === subscriber);
		if(index !== -1) this.subscribers.slice(index, 1);
	}

	removeAllSubscriber(){
		this.subscribers = [];
	}

	launchSubscriber(...args: Parameters<subscriber>){
		this.subscribers.forEach(sub => sub(...args));
	}

	build(): subscriber
	{
		const mapArg = new Array(this.numberArgs).map((v, i) => `arg${i}`).join(", ");
		const contentFunction = this.subscribers.map((v, i) => `this.subscribers[${i}](${mapArg});`).join("\n");

		return eval(/* js */`(function(${mapArg}){\n${contentFunction}\n})`).bind({subscribers: this.subscribers});
	}
}
