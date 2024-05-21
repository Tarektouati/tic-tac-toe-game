//@typescript-eslint/no-unused-vars rule is disabled, because we use this file in our HTML to enable user interaction
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function makeMove(index) {
	// eslint-disable-next-line no-undef
	if (!API_MOVE_PATH) throw new Error('API_MOVE_PATH is not defined');
	console.log(`player clicked on cell ${index}`);
	//  no-undef rule is disabled, it a global variable defined in the HTML
	// eslint-disable-next-line no-undef
	const response = await fetch(API_MOVE_PATH, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ index }),
	});
	const data = await response.text();
	if (!data) return;
	var parser = new DOMParser();
	var doc = parser.parseFromString(data, 'text/html');
	document.getElementById('game-board').replaceWith(doc.getElementById('game-board'));
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function resetGame() {
	// eslint-disable-next-line no-undef
	if (!API_RESET_PATH) throw new Error('API_RESET_PATH is not defined');
	// no-undef rule is disabled, it a global variable defined in the HTML
	// eslint-disable-next-line no-undef
	const response = await fetch(API_RESET_PATH, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.text();
	var parser = new DOMParser();
	var doc = parser.parseFromString(data, 'text/html');
	document.getElementById('game-board').replaceWith(doc.getElementById('game-board'));
}
