function Player(symbol) {
	this.symbol = symbol;
}

var playerX = new Player("X");
var playerO = new Player("O");

playerX.nextPlayer = playerO;
playerO.nextPlayer = playerX;

var board = {
	grid: [],
	init: function() {
		this.grid = [["","",""], ["","",""], ["","",""]];
	},
	display: function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				var cell = document.getElementById(String(i) + String(j));
				cell.textContent = this.grid[i][j];
			}
		}
	}
}

var stats = {
	round: 1,
	currentPlayer: "X",
	scoreX: 0,
	scoreO: 0,
	ties: 0,
	display: function(item) {
		var key = String(item);
		var value = String(this[item]);
		var el = document.getElementById(key);
		el.textContent = value;
	},
	displayAll: function() {
		for (var prop in this) {
			if (this.hasOwnProperty(prop) && typeof this[prop] !== "function") {
				this.display(prop);
			}
		}
	}
}

function displayMessage(string) {
	var el = document.getElementById("message");
	el.textContent = string;
}


// modify this to take no input but return winner
function checkWin(player) {
	var symbol = player.symbol;
	var grid = board.grid;
	for (var i = 0; i < 3; i++) {
		//check horizontals
		if (grid[i][0] === symbol &&
				grid[i][1] === symbol &&
				grid[i][2] === symbol) {
			return true;
		}
		//check verticals
		if (grid[0][i] === symbol &&
				grid[1][i] === symbol &&
				grid[2][i] === symbol) {
			return true;
		}
	}
	//check diagonals
	if (grid[0][0] === symbol &&
			grid[1][1] === symbol &&
			grid[2][2] === symbol) {
		return true;
	}
	if (grid[0][2] === symbol &&
			grid[1][1] === symbol &&
			grid[2][0] === symbol) {
		return true;
	}
	return false;
}

function checkTie() {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (!board.grid[i][j]) return false;
		}
	}
	return true;
}

function turn(player) {
	// Player selects a cell:
	var choice = Number(prompt(player.symbol + "'s turn. Please select a cell:\n1 2 3\n4 5 6\n7 8 9"));
	while (!choice || choice < 1 || choice > 9) {
		choice = Number(prompt("Invalid input. Please select a cell:\n1 2 3\n4 5 6\n7 8 9"));
	}
	var row = Math.floor((choice - 1)/ 3);
	var col = (choice - 1) % 3;

	// Update board:
	if (!board.grid[row][col]) {
		board.grid[row][col] = player.symbol;
	} else {
		displayMessage("That cell is already occupied. Please select another.");
		turn(player);
	}

	// Display board:
	board.display();

	// Check if game is won:
	if (checkWin(player)) {
		displayMessage(player.symbol + " wins!");
	} else if (checkTie()) {
		// Check if game is a tie:
		displayMessage("The game is a tie.");
	} else {
		// Trigger next turn:
		turn(player.nextPlayer);
	}
}

function round() {
	// initialize
	// call turn
	// return winner or null (if tie)
}

// Loop:
// call round(firstPlayer)
// update stats based on who won (return value of round)

board.init();
stats.displayAll();
turn(playerX);
