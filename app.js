import readline from "readline";
import { Chess } from "chess.js";
import { ChessSrs } from "chess-srs";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

/*
1. e4 e5 2. f4 exf4 (2... d5) 3. Nf3 (3. Bc4 Qh4+ (3... d5) 4. Kf1) (3. d4 Qh4+ 4. Ke2) 3... d6 { test } (3... g5) *
*/

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
			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			switch (char) {
				case "h":
					console.log("test");
					break;
				case "n": //add async function here to handle training
					chessSrs.setMethod("learn");
					handleTrain();
				// chessSrs.next();
				// console.log(chessSrs.path());
				// // console.log(node.data.san);
				// printBoard(chessSrs.path());
			}
		});
	});
});

// // Listen for the close event to exit the program
rl.on("close", () => {
	console.log("Goodbye!");
	process.exit(0);
});

//flag: show white's move?
const printBoard = (path, flag) => {
	const chess = new Chess();
	if (!flag) {
		path.pop();
	}
	path.forEach((node) => chess.move(node.data.san));
	console.log(chess.ascii());
};

const handleTrain = () => {
	if (!chessSrs.next()) return; //mutates + don't try to train if impossible
	chessSrs.update();
	// printBoard(chessSrs.path(), false);
	// console.log("\n/ / / / / / \n");
	printBoard(chessSrs.path(), true);
	rl.question(
		"White plays " + chessSrs.path().at(-1).data.san + " here.",
		(acknowledgment) => {
			chessSrs.succeed();
			return;
		}
	);
	// rl.question("")
	// rl.question("White to play:\n", (response) => {
	// console.log(chessSrs.guess(response));

	//for recall
	// switch (chessSrs.guess(response)) {
	// 	case "alternate":
	// 		console.log("Correct, alternate move");
	// 		chessSrs.succeed();
	// 		break;
	// 	case "success":
	// 		console.log("Correct! This is the right move");
	// 		chessSrs.succeed();
	// 		break;
	// 	case "failure":
	// 		console.log(
	// 			"Incorrect, correct move was " + chessSrs.path.at(-1).data.san
	// 		);
	// 		chessSrs.fail();
	// 		break;
	// }
};
