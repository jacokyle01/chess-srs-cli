const readline = require("readline");
const ChessSrs = require("./chess-srs/dist/main");
const { Chess } = require("chess.js");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// 1. e4 e5 2. f4 exf4 (2... d5) 3. Nf3 (3. Bc4 Qh4+ (3... d5) 4. Kf1) (3. d4 Qh4+ 4. Ke2) 3... d6 { test } (3... g5) *

const chessSrs = ChessSrs({ buckets: [1, 10, 100] });
rl.question("Enter a repertoire to start\n", (pgn) => {
	// console.log(pgn);
	chessSrs.addSubrepertoires(pgn, "white");
	// rl.close();
	rl.question("Select which repertoire to train. Ex. 0\n", (num) => {
		// console.log(num);
		chessSrs.load(0);
		console.log("Enter commands to train your repertoire. Press h for help.\n");
		rl.on("line", (char) => {
			switch (char) {
				case "h":
					console.log("test");
					break;
				case "n": //add async function here to handle training
					chessSrs.next();
					console.log(chessSrs.path());
					// console.log(node.data.san);
					printBoard(chessSrs.path());
			}
		});
	});
});

// // Listen for the close event to exit the program
rl.on("close", () => {
	console.log("Goodbye!");
	process.exit(0);
});

const printBoard = (path) => {
	const chess = new Chess();
	path.forEach((node) => chess.move(node.data.san));
	console.log(chess.ascii());
};
