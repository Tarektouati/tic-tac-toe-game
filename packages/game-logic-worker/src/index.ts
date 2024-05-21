import { handleDefaultRequest } from './handleDefaultRequest';
import { handleMoveRequest } from './handleMoveRequest';
import { handleResetRequest } from './handleResetRequest';

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const { pathname } = new URL(request.url);
		if (pathname.startsWith('/api/move')) {
			return handleMoveRequest(request, env);
		}

		if (pathname.startsWith('/api/reset')) {
			return handleResetRequest(request, env);
		}

		return handleDefaultRequest(request, env);
	},
};
