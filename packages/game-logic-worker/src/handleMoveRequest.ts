import { updateBoardCell } from 'common/gameBoardLogic';
import { PLAYER } from 'common/constants';

export async function handleMoveRequest(request: Request, env: Env) {
	const gameBoard = await env.TIC_TAC_TOE_GAME.get('GAME_BOARD');

	if (!gameBoard) throw new Error('Game board not found');

	const { playerMove } = await request.json<{ playerMove: number }>();
	const newBoard = updateBoardCell(JSON.parse(gameBoard), playerMove, PLAYER);

	await env.TIC_TAC_TOE_GAME.delete('GAME_BOARD');
	await env.TIC_TAC_TOE_GAME.put('GAME_BOARD', JSON.stringify(newBoard));

	return Response.json({ newBoard });
}
