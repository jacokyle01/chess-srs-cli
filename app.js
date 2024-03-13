// import readline from "readline";
import { Chess } from "chess.js";
import { ChessSrs } from "chess-srs";
// import { readlineSync } from "readline-sync";
import prompt from "syncprompt";

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
	const pgn = prompt("Add subrepertoire");
	chessSrs.addSubrepertoires(pgn, "white");
};

const next = () => {
	console.log(chessSrs.state());
	console.log(chessSrs.state().repertoire);
	console.log(chessSrs.state().subrepertoire);

	chessSrs.update();
	if (!chessSrs.next()) {
		console.log("No trainable positions found...");
		return;
	}
	switch (chessSrs.state().method) {
		case "recall":
		case "learn":
			printBoard(chessSrs.path(), true);
			const move = chessSrs.path().at(-1).data.san;
			const response = prompt(
				"White plays " + move + " here. Type anything to continue."
			);
			chessSrs.succeed();
	}
};

const select = () => {
	const choice = prompt("Select a subrepertoire. Ex. 0");
	chessSrs.load(choice);
};

const printBoard = (path, flag) => {
	const chess = new Chess();
	if (!flag) {
		path.pop();
	}
	path.forEach((node) => chess.move(node.data.san));
	console.log(chess.ascii());
};

const main = () => {
	const action = prompt("Enter action...");
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
		default:
			console.log("Usage: next | add");
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
