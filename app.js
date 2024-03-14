// import readline from "readline";
import { Chess } from "chess.js";
import { ChessSrs } from "chess-srs";
// import { readlineSync } from "readline-sync";
import prompt from "syncprompt";

/*
1. e4 e5 2. f4 exf4 (2... d5) 3. Nf3 (3. Bc4 Qh4+ (3... d5) 4. Kf1) (3. d4 Qh4+ 4. Ke2) 3... d6 { test } (3... g5) *
*/

const banner = `
╔═══╗╔╗              ╔═══╗       
║╔═╗║║║              ║╔═╗║       
║║ ╚╝║╚═╗╔══╗╔══╗╔══╗║╚══╗╔═╗╔══╗
║║ ╔╗║╔╗║║╔╗║║══╣║══╣╚══╗║║╔╝║══╣
║╚═╝║║║║║║║═╣╠══║╠══║║╚═╝║║║ ╠══║
╚═══╝╚╝╚╝╚══╝╚══╝╚══╝╚═══╝╚╝ ╚══╝
ChessSrs v1.0.5
`;
console.log(banner);

const chessSrs = ChessSrs({ buckets: [1, 10, 100] });
chessSrs.setMethod("learn");

const addSubrep = () => {
	const pgn = prompt("Add subrepertoire\n");
	chessSrs.addSubrepertoires(pgn, "white");
};

const next = () => {

	// chessSrs.update(chessSrs.state().time + 5);
	chessSrs.update();
	if (!chessSrs.next()) {
		console.log("No trainable positions found...");
		return;
	}
	switch (chessSrs.state().method) {
		case "recall":
			printBoard(chessSrs.path(), false);
			const guess = prompt("What does white play here?");
			const outcome = chessSrs.guess(guess);
			switch (outcome) {
				case "success":
					console.log(guess + " was correct! Good job.");
					chessSrs.succeed();
					break;
				case "alternate":
					console.log("Alternate move accepted.");
					chessSrs.succeed();
					break;
				case "failure":
					console.log(chessSrs.path());
					console.log(
						"Incorrect. Correct was " + chessSrs.path().at(-1).data.san
					);
					chessSrs.fail();
					break;
			}
			break;
		case "learn":
			printBoard(chessSrs.path(), true);
			const move = chessSrs.path().at(-1).data.san;
			console.log("White plays " + move + " here.");
			chessSrs.succeed();
			break;
	}
};

const select = () => {
	const choice = prompt("Select a subrepertoire. Ex. 0\n");
	chessSrs.load(choice);
};

const toggle = () => {
	chessSrs.setMethod(chessSrs.state().method == "learn" ? "recall" : "learn");
	console.log("Switched method to " + chessSrs.state().method);
};

//flag = true, show final position
//flag = false, show opponent's last move
const printBoard = (path, flag) => {
	const chess = new Chess();
	let newPath;
	if (!flag) {
		newPath = path.slice(0, path.length - 1);
	} else {
		newPath = path;
	}
	newPath.forEach((node) => chess.move(node.data.san));
	console.log(chess.ascii());
};

const main = () => {
	const action = prompt("Enter action...\n");
	switch (action) {
		case "next":
			next();
			break;
		case "add":
			addSubrep();
			break;
		case "select":
			select();
			break;
		case "toggle":
			toggle();
			break;
		default:
			console.log("Usage: next | add | select | toggle");
	}
};

while (1) {
	main();
}
// const handleTrain = () => {
// 	if (!chessSrs.next()) return; //mutates + don't try to train if impossible
// 	chessSrs.update();
// 	// printBoard(chessSrs.path(), false);
// 	// console.log("\n/ / / / / / \n");
// 	printBoard(chessSrs.path(), true);
// 	rl.question(
// 		"White plays " + chessSrs.path().at(-1).data.san + " here.",
// 		(acknowledgment) => {
// 			chessSrs.succeed();
// 			return;
// 		}
// 	);
// };

// const main = () => {
// 	rl.question("Enter action", (response) => {
// 		switch (response) {
// 			case "next":
// 				next();
// 				break;
// 			case "add":
// 				// addSubrep();
// 				break;
// 			case "switch":
// 				// toggleTraining();
// 				break;
// 			default: //usage message
// 				console.log("Usage: next | add | switch");
// 				break;
// 		}
// 		main();
// 	});
// };

// const next = () => {
// 	chessSrs.update();
// 	if (!chessSrs.next()) {
// 		console.log("No trainable positions found");
// 		main();
// 	}
// 	printBoard(chessSrs.path(), true);
// 	rl.question(
// 		"White plays " + chessSrs.path().at(-1).data.san + " here.",
// 		(acknowledgment) => {
// 			chessSrs.succeed();
// 			main();
// 		}
// 	);
// };

// //TODO add color switch

// rl.on("line", () => {
// 	rl.question("Enter action", (action) => {
// 		console.log(action);
// 	});
// });

// // addSubrep();
// // main();
// // console.log("ok");
