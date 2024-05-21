import { ComponentSettings, Manager } from '@managed-components/types';
import pug from 'pug';
import path from 'path';
import { getWinner } from 'common/gameBoardLogic';
import fs from 'fs';

export default async function (manager: Manager, _settings: ComponentSettings) {
	const gameTemplatePath = path.join(__dirname, '../templates/tic-tac-toe.pug');
	const resultTemplatePath = path.join(__dirname, '../templates/result.pug');
	// I you have preferred to use `console.assert` but it messes with ts type system
	const WORKER_URL = '<DEFINE_YOUR WORKER_URL>';

	/**
	 *  Unable to use `manage.serve(...)` to serve the script file
	 *  Done this way to avoid writing script file content in each pug template and adding more complexity to the code
	 *  https://managedcomponents.dev/specs/server-functionality/serve
	 */
	const scriptFilePath = manager.route('/script.js', async () => {
		const content = fs.readFileSync(path.join(__dirname, '../assets/script.js'), 'utf8');
		return new Response(content, {
			headers: {
				'Content-Type': 'application/javascript',
			},
		});
	});
	console.log(`:::: exposing ${scriptFilePath} on MC `);

	const apiMovePath = manager.route('/api/move', async (request: Request) => {
		console.time(`--> ${request.method} ${request.url}`);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { index: playerMove } = request.body as Record<string, any>;

		const response = await manager.fetch(`${WORKER_URL}/api/move`, {
			method: 'POST',
			body: JSON.stringify({ playerMove }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const { newBoard }: { newBoard: string[] } = await response!.json();

		const winnerOrDraw = getWinner(newBoard);
		if (winnerOrDraw) {
			const message = winnerOrDraw === 'DRAW' ? "It's a draw!" : `${winnerOrDraw} wins!`;
			const html = pug.compileFile(resultTemplatePath)({ message });
			console.timeEnd(`--> ${request.method} ${request.url}`);
			return new Response(html, { status: 200 });
		}

		const html = pug.compileFile(gameTemplatePath)({ gameBoard: newBoard });
		console.timeEnd(`--> ${request.method} ${request.url}`);
		return new Response(html, { status: 200 });
	});
	console.log(`:::: exposing ${apiMovePath} on MC `);

	const apiResetPath = manager.route('/api/reset', async (request: Request) => {
		console.time(`--> ${request.method} ${request.url}`);

		const response = await manager.fetch(`${WORKER_URL}/api/reset`, {
			method: 'POST',
			body: request.body,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const { gameBoard }: { gameBoard: string[] } = await response!.json();

		const html = pug.compileFile(gameTemplatePath)({ gameBoard });
		console.timeEnd(`--> ${request.method} ${request.url}`);
		return new Response(html, { status: 200 });
	});
	console.log(`:::: exposing ${apiResetPath} on MC `);

	manager.registerWidget(async () => {
		const response = await manager.fetch(WORKER_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const { gameBoard }: { gameBoard: string[] } = await response!.json();

		const html = pug.compileFile(gameTemplatePath)({
			gameBoard,
			apiMovePath,
			apiResetPath,
			scriptFilePath,
		});
		return html;
	});
}
