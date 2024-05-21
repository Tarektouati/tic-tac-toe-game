import { BOARD } from 'common/constants';

export async function handleDefaultRequest(_: Request, env: Env) {
	const gameBoard = await env.TIC_TAC_TOE_GAME.get('GAME_BOARD');
	if (gameBoard) {
		return Response.json({ gameBoard: JSON.parse(gameBoard) });
	}
	await env.TIC_TAC_TOE_GAME.put('GAME_BOARD', JSON.stringify(BOARD));
	return Response.json({ gameBoard: BOARD });
}
