const readline = require("readline");
const ChessSrs = require("./chess-srs/dist/main");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Ask the user for their name
rl.question("What is your name? ", (name) => {
	// Greet the user
	console.log(`Hello, ${name}!`);
	const chessSrs = ChessSrs({ buckets: [1, 10, 100] });
	console.log(chessSrs.state());

	// Close the readline interface
	rl.close();
});

// Listen for the close event to exit the program
rl.on("close", () => {
	console.log("Goodbye!");
	process.exit(0);
});
