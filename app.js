// import readline from "readline";
// import { Chess } from "chess.js";
// import { ChessSrs } from "chess-srs";
// import { readlineSync } from "readline-sync";
// const Chess = require("chess.js");
// const ChessSrs = require("chess-srs");
import prompt from 'syncprompt';
const name = prompt("what is your name?");
console.log(name);

// const chessSrs = ChessSrs({ buckets: [1, 10, 100] });

// /*
// 1. e4 e5 2. f4 exf4 (2... d5) 3. Nf3 (3. Bc4 Qh4+ (3... d5) 4. Kf1) (3. d4 Qh4+ 4. Ke2) 3... d6 { test } (3... g5) *
// */

// rl.question("Enter a repertoire to start\n", (pgn) => {
// 	// console.log(pgn);
// 	chessSrs.addSubrepertoires(pgn, "white");
// 	// rl.close();
// 	rl.question("Select which repertoire to train. Ex. 0\n", (num) => {
// 		// console.log(num);
// 		chessSrs.load(0);
// 		console.log("Enter commands to train your repertoire. Press h for help.\n");
// 		rl.on("line", (char) => {
// 			console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
// 			switch (char) {
// 				case "h":
// 					console.log("test");
// 					break;
// 				case "n": //add async function here to handle training
// 					chessSrs.setMethod("learn");
// 					handleTrain();
// 				// chessSrs.next();
// 				// console.log(chessSrs.path());
// 				// // console.log(node.data.san);
// 				// printBoard(chessSrs.path());
// 			}
// 		});
// 	});
// });

// // // Listen for the close event to exit the program
// rl.on("close", () => {
// 	console.log("Goodbye!");
// 	process.exit(0);
// });

// //flag: show white's move?
// const printBoard = (path, flag) => {
// 	const chess = new Chess();
// 	if (!flag) {
// 		path.pop();
// 	}
// 	path.forEach((node) => chess.move(node.data.san));
// 	console.log(chess.ascii());
// };

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
// const addSubrep = () => {
// 	rl.question("Add subrepertoire\n", (pgn) => {
// 		chessSrs.addSubrepertoires(pgn, "white");
// 		main();
// 	});
// };

// rl.on("line", () => {
// 	rl.question("Enter action", (action) => {
// 		console.log(action);
// 	});
// });

// // addSubrep();
// // main();
// // console.log("ok");
