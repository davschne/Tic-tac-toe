function Game(){
	playerO: {
		symbol: "O",
		number: 0
	},
	playerX: {
		symbol: "X",
		number: 1
	},
	players: [playerO, playerX],

	board: {
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
}

function checkWin(player) {
	var symbol = player.symbol;
	for (var i = 0; i < 3; i++) {
		//check horizontals
		if (board.grid[i][0] === symbol &&
				board.grid[i][1] === symbol &&
				board.grid[i][2] === symbol) {
			return true;
		}
		//check verticals
		if (board.grid[0][i] === symbol &&
				board.grid[1][i] === symbol &&
				board.grid[2][i] === symbol) {
			return true;
		}
	}
	//check diagonals
	if (board.grid[0][0] === symbol &&
			board.grid[1][1] === symbol &&
			board.grid[2][2] === symbol) {
		return true;
	}
	if (board.grid[0][2] === symbol &&
			board.grid[1][1] === symbol &&
			board.grid[2][0] === symbol) {
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
	var choice = prompt(player.symbol + "'s turn. Please select a cell:\n1 2 3\n4 5 6\n7 8 9");
	choice = Number(choice);
	while (!choice || choice < 1 || choice > 9) {
		choice = prompt("Invalid input. Please select a cell:\n1 2 3\n4 5 6\n7 8 9");
		choice = Number(choice);
	}
	var row = Math.floor((choice - 1)/ 3);
	var col = (choice - 1) % 3;

	// Update board:
	if (!board.grid[row][col]) {
		board.grid[row][col] = player.symbol;
	} else {
		alert("That cell is already occupied. Please select another.");
		turn(player);
	}

	// Display board:
	board.display();

	// Check if game is won:
	if (checkWin(player)) {
		alert(player.symbol + " wins!");
	} else if (checkTie()) {
		// Check if game is a tie:
		alert("The game is a tie.");
	} else {
		// Trigger next turn:
		turn(players[(player.number + 1) % 2]);
	}
}

// Play the game:
board.init();
turn(players[0]);
