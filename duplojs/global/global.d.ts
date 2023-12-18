export {};
declare global {
	const duplo: typeof import("../main")["duplo"];
	const zod: typeof import("@duplojs/duplojs")["zod"];
	const env: typeof import("../src/plugins/env")["env"];
}

declare global {
	// @ts-ignore
	export {
		HttpException,
		CustomHttpException,
		OkHttpException,
		CreatedHttpException,
		AcceptedHttpException,
		NoContentHttpException,
		ResetContentHttpException,
		PartialContentHttpException,
		MultipleChoicesHttpException,
		MovedPermanentlyHttpException,
		FoundHttpException,
		SeeOtherHttpException,
		NotModifiedHttpException,
		TemporaryRedirectHttpException,
		PermanentRedirectHttpException,
		BadRequestHttpException,
		UnauthorizedHttpException,
		ForbiddenHttpException,
		NotFoundHttpException,
		MethodNotAllowedHttpException,
		NotAcceptableHttpException,
		ProxyAuthenticationRequiredHttpException,
		RequestTimeoutHttpException,
		ConflictHttpException,
		GoneHttpException,
		LengthRequiredHttpException,
		PreconditionFailedHttpException,
		PayloadTooLargeHttpException,
		UriTooLongHttpException,
		UnsupportedMediaTypeHttpException,
		RangeNotSatisfiableHttpException,
		ExpectationFailedHttpException,
		ImATeapotHttpException,
		UpgradeRequiredHttpException,
		PreconditionRequiredHttpException,
		TooManyRequestsHttpException,
		RequestHeaderFieldsTooLargeHttpException,
		UnavailableForLegalReasonsHttpException,
		InternalServerErrorHttpException,
		NotImplementedHttpException,
		BadGatewayHttpException,
		ServiceUnavailableHttpException,
		GatewayTimeoutHttpException,
		HttpVersionNotSupportedHttpException,
		VariantAlsoNegotiatesHttpException,
		NotExtendedHttpException,
		NetworkAuthenticationRequiredHttpException
	} from "@duplojs/http-exception";
	// @ts-ignore
	import("@duplojs/http-exception");
}
