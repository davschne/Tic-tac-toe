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
	// Make a constructor for display item
	// include value property and display method
	round: 1,
	currentPlayer: "X",
	X: 0,
	O: 0,
	tie: 0,
	display: function(prop) {
		var key = String(prop);
		var value = String(this[prop]);
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
function checkWin() {
	var grid = board.grid;
	var findPlayerBySymbol = function(symbol) {
		if (symbol == playerX.symbol) return playerX;
		else return playerO;
	}

	for (var i = 0; i < 3; i++) {
		//check horizontals
		var symbol = grid[i][0];
		if (symbol &&
			  symbol == grid[i][1] &&
			  symbol == grid[i][2]) {
			return findPlayerBySymbol(symbol);
		}
		//check verticals
		symbol = grid[0][i];
		if (symbol &&
			  symbol == grid[1][i] &&
			  symbol == grid[2][i]) {
			return findPlayerBySymbol(symbol);
		}
	}
	//check diagonals
	symbol = grid[0][0];
	if (symbol &&
		  symbol == grid[1][1] &&
		  symbol == grid[2][2]) {
		return findPlayerBySymbol(symbol);
	}
	symbol = grid[0][2];
	if (symbol &&
		  symbol == grid[1][1] &&
		  symbol == grid[2][0]) {
		return findPlayerBySymbol(symbol);
	}
	return;
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
	// Update and display current player
	stats.currentPlayer = player.symbol;
	stats.display("currentPlayer");
	// Player selects a cell:
	var choice = Number(prompt("Please select a cell:\n1 2 3\n4 5 6\n7 8 9"));
	while (!choice || choice < 1 || choice > 9) {
		displayMessage("Invalid input.");
		choice = Number(prompt("Please select a cell:\n1 2 3\n4 5 6\n7 8 9"));
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
	if (checkWin()) {
		displayMessage(player.symbol + " wins!");
		stats[player.symbol]++;
	} else if (checkTie()) {
		// Check if game is a tie:
		displayMessage("The game is a tie.");
		stats.tie++;
	} else {
		// Trigger next turn:
		turn(player.nextPlayer);
	}
}

function round(startingPlayer) {
	stats.displayAll();
	board.init();
	board.display();
	turn(startingPlayer);
	stats.round++;
	round(startingPlayer.nextPlayer);
}

round(playerX);
