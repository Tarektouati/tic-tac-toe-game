import { BOARD } from 'common/constants';

export async function handleResetRequest(_: Request, env: Env) {
	await env.TIC_TAC_TOE_GAME.delete('GAME_BOARD');
	await env.TIC_TAC_TOE_GAME.put('GAME_BOARD', JSON.stringify(BOARD));
	return Response.json({ gameBoard: BOARD });
}
