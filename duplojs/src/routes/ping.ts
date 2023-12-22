/* PATH : /ping */
export default (path: string) => 
	duplo
	.declareRoute("GET", path)
	.handler(() => {
		throw new OkHttpException("pong", "pong");
	});
