import { COMPUTER, PLAYER } from './constants';

/**
 * Makes a computer move on the tic-tac-toe board.
 *
 * @param board - The current state of the tic-tac-toe board.
 * @returns The index of the cell where the computer makes its move.
 */
function calculateComputerMove(board: string[]): number {
	const initialAcc: number[] = [];
	const availableMoves = board.reduce((acc, cell, index) => {
		if (cell !== COMPUTER && cell !== PLAYER) {
			acc.push(index);
		}
		return acc;
	}, initialAcc);

	const randomIndex = Math.floor(Math.random() * availableMoves.length);
	return availableMoves[randomIndex];
}

/**
 * Updates the value of a cell in the board array with the specified user.
 * If the user is the player, it calculates the computer's move and updates the board accordingly.
 * @param board - The current board array.
 * @param cellIndex - The index of the cell to update.
 * @param user - The user value to set in the cell can be either "PLAYER" or "COMPUTER".
 * @returns The updated board array.
 */
export function updateBoardCell(board: string[], cellIndex: number, user: string) {
	const newBoard = [...board.slice(0, cellIndex), user, ...board.slice(cellIndex + 1)];
	if (user === PLAYER) {
		const computerMove = calculateComputerMove(newBoard);
		return updateBoardCell(newBoard, computerMove, COMPUTER);
	}
	return newBoard;
}

/**
 * Checks if a player has won the game on the given board.
 *
 * @param board - The game board represented as an array of strings.
 * @param player - The player to check for a win.
 * @returns True if the player has won, false otherwise.
 */
function checkWin(board: string[], player: string): boolean {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // rows
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // columns
		[0, 4, 8],
		[2, 4, 6], // diagonals
	];

	for (const combination of winningCombinations) {
		const [a, b, c] = combination;
		if (board[a] === player && board[b] === player && board[c] === player) {
			return true;
		}
	}

	return false;
}

export function getWinner(board: string[]): string | undefined {
	if (checkWin(board, PLAYER)) return PLAYER;
	if (checkWin(board, COMPUTER)) return COMPUTER;
	if (board.some((cell) => cell === ' ')) return undefined;
	return 'DRAW';
}
