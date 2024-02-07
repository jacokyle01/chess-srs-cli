import {
	Node,
	PgnNodeData,
	parsePgn,
	startingPosition,
	transform,
	walk,
} from "chessops/pgn";
import { makeSanAndPlay, parseSan } from "chessops/san";
import { Z_FIXED } from "zlib";
import {
	TrainingData,
	annotateWithPaths,
	initializeSubrepertoire,
	initializeTraining,
	pathContext,
	printPath,
	wait,
} from "./util";
import { makeFen } from "chessops/fen";
import { ChessSrs } from "./trainer";

const test = "1. d4 Nf6 (1... d5 2. c4 c6 (2... e6)) 2. c4 e6 (2... g6)";
const alternate = "1. d4 Nf6 (1... d5 2. c4 (2. c3) 2... c6 (2... e6)) 2. c4 e6 (2... g6)";
//after d4 d5, both c4 and c3 are acceptable moves for white

const chessSrs = ChessSrs({ buckets: [1, 10, 100]});
// chessSrs.addSubrepertoires(test, "white");
chessSrs.addSubrepertoires(alternate, "white");

chessSrs.load(0);
chessSrs.setMethod("learn");
// console.log(chessSrs.next());
// chessSrs.succeed();
// console.log(chessSrs.next());
// chessSrs.succeed();
// console.log(chessSrs.next());
// chessSrs.succeed();

while(chessSrs.next()) {
	console.log(chessSrs.path());
	chessSrs.succeed();
}


console.log(chessSrs.path());
console.log(chessSrs.path().at(-1).data.training);
chessSrs.setMethod("recall");
console.log("\n\t\trecalling");
chessSrs.setTime(100000000000000);
chessSrs.next();
chessSrs.next();
chessSrs.next();

console.log("\n\t\tguessing this\n")
console.log(chessSrs.path());

console.log(chessSrs.guess("c3"));
