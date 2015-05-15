var game = {
	players: [
		{
			symbol: "O",
			number: 0
		},
		{
			symbol: "X",
			number: 1
		}],

	board: {
		grid: [],
		init: function() {
			this.grid = [["","",""], ["","",""], ["","",""]];
			//console.log("initialized board"); // DEBUG
		},
		display: function() {
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					var cell = document.getElementById(String(i) + String(j));
					cell.textContent = this.grid[i][j];
				}
			}
		}
	},

	stats: {
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
	},

	displayMessage: function(string) {
		var el = document.getElementById("messages");
		el.textContent = string;
	},

	checkWin: function(player) {
		var symbol = player.symbol;
		var grid = this.board.grid;
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
	},

	checkTie: function() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (!this.board.grid[i][j]) return false;
			}
		}
		return true;
	},

 	turn: function(player) {
 		//console.log("start turn"); // DEBUG
		// Player selects a cell:
		var choice = prompt(player.symbol + "'s turn. Please select a cell:\n1 2 3\n4 5 6\n7 8 9");
		choice = Number(choice);
		while (!choice || choice < 1 || choice > 9) {
			choice = prompt("Invalid input. Please select a cell:\n1 2 3\n4 5 6\n7 8 9");
			choice = Number(choice);
		}
		var row = Math.floor((choice - 1)/ 3);
		var col = (choice - 1) % 3;

		// Update board:
		if (!this.board.grid[row][col]) {
			this.board.grid[row][col] = player.symbol;
		} else {
			this.displayMessage("That cell is already occupied. Please select another.");
			this.turn(player);
		}

		// Display board:
		this.board.display();

		// Check if game is won:
		if (this.checkWin(player)) {
			this.displayMessage(player.symbol + " wins!");
		} else if (this.checkTie()) {
			// Check if game is a tie:
			this.displayMessage("The game is a tie.");
		} else {
			// Trigger next turn:
			this.turn(this.players[(player.number + 1) % 2]);
		}
	}
};

// Play the game:
console.log(game.players);
game.board.init();
game.stats.displayAll();
game.turn(game.players[0]);
