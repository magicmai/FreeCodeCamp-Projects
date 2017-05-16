/**
*功能1: 可以和计算机对手进行井字游戏。
*功能2: 游戏会在结束时重置并立即开始新的一局。
*功能3: 可以自己选择自己的角色是 X 还是 O。
*/

document.getElementById("play-game").style.display = "none";

var game = {
	user: "",  //“我”使用的角色
	computer: "",  //电脑使用的角色
	currentPlayer: "",  //当前玩家
	moves: 1
}

function userChoose(id) {
	if (id === "x") {
		game.user = "X";
		game.computer = "O";
	}
	if (id === "o") {
		game.user = "O";
		game.computer = "X";
	}
	document.getElementById("modal").style.display = "none";
	document.getElementById("play-game").style.display = "block";
	firstMove();
}

function firstMove() {
	var randomNumber = Math.random();
	if(randomNumber < 0.5) {
		setCurrentPlayer("user");
	}
	else if (randomNumber > 0.5) {
		setCurrentPlayer("computer");
		var randomId = "d" + Math.ceil(Math.random() *8 + 1);
		document.getElementById(randomId).innerHTML = game.computer;
		document.getElementById(randomId).setAttribute("onclick", "");
		setCurrentPlayer("user");
		game.moves += 1;
	}
}

function setCurrentPlayer(curr) {
	game.currentPlayer = curr;
	//console.log(game.currentPlayer);
}

function icon(id) {
	if (game.currentPlayer === "user") {
		document.getElementById(id).innerHTML = game.user;
		document.getElementById(id).setAttribute("onclick", "");
		gameStatus();
		if (document.getElementsByClassName("win").length === 0) {
			setCurrentPlayer("computer");
		}
		else {
			setCurrentPlayer("");
		}
		game.moves += 1;
	}

	else if (game.currentPlayer === "computer") {
		document.getElementById(id).innerHTML = game.computer;
		document.getElementById(id).setAttribute("onclick", "");
		gameStatus();
		if (document.getElementsByClassName("win").length === 0) {
			setCurrentPlayer("user");
		}
		else {
			setCurrentPlayer("");
		}
		game.moves += 1;
	}
	if (game.currentPlayer === "computer") {
		setTimeout(comp, 300);
	}
	console.log("game.moves:", game.moves);	
}

function comp() {
	switch (true) {
		case document.getElementById("d1").innerHTML === game.user && document.getElementById("d2").innerHTML === game.user:
		    icon("d3");
		    break;
		case document.getElementById("d4").innerHTML === game.user && document.getElementById("d5").innerHTML === game.user:
		    icon("d6");
		    break;
		case document.getElementById("d7").innerHTML === game.user && document.getElementById("d8").innerHTML === game.user:
		    icon("d9");
		    break;
		case document.getElementById("d1").innerHTML === game.user && document.getElementById("d4").innerHTML === game.user:
		    icon("d7");
		    break;
		case document.getElementById("d2").innerHTML === game.user && document.getElementById("d5").innerHTML === game.user:
		    icon("d8");
		    break;
		case document.getElementById("d3").innerHTML === game.user && document.getElementById("d6").innerHTML === game.user:
		    icon("d9");
		    break;
		case document.getElementById("d1").innerHTML === game.user && document.getElementById("d5").innerHTML === game.user:
		    icon("d9");
		    break;
		case document.getElementById("d3").innerHTML === game.user && document.getElementById("d5").innerHTML === game.user:
		    icon("d7");
		    break;

		case document.getElementById("d1").innerHTML !== game.user && document.getElementById("d1").innerHTML !== game.computer:
		    icon("d1");
		    break;
		case document.getElementById("d2").innerHTML !== game.user && document.getElementById("d2").innerHTML !== game.computer:
		    icon("d2");
		    break;
		case document.getElementById("d3").innerHTML !== game.user && document.getElementById("d3").innerHTML !== game.computer:
		    icon("d3");
		    break;
		case document.getElementById("d4").innerHTML !== game.user && document.getElementById("d4").innerHTML !== game.computer:
		    icon("d4");
		    break;
		case document.getElementById("d5").innerHTML !== game.user && document.getElementById("d5").innerHTML !== game.computer:
			icon("d5");
			break;
		case document.getElementById("d6").innerHTML !== game.user && document.getElementById("d6").innerHTML !== game.computer:
		    icon("d6");
		    break;
		case document.getElementById("d7").innerHTML !== game.user && document.getElementById("d7").innerHTML !== game.computer:
		    icon("d7");
		    break;
		case document.getElementById("d8").innerHTML !== game.user && document.getElementById("d8").innerHTML !== game.computer:
		    icon("d8");
		    break;
		case document.getElementById("d9").innerHTML !== game.user && document.getElementById("d9").innerHTML !== game.computer:
		    icon("d9");
		    break;
	}
}

function gameStatus() {
	var curPlayer;
	if (game.currentPlayer === "user") {
		curPlayer = game.user;
	} 
	else if(game.currentPlayer === "computer") {
		curPlayer = game.computer;
	}

	switch(true) {
		case document.getElementById("d1").innerHTML === curPlayer && document.getElementById("d2").innerHTML === curPlayer && document.getElementById("d3").innerHTML === curPlayer:
			show("d1", "d2", "d3");
			break;
		case document.getElementById("d4").innerHTML === curPlayer && document.getElementById("d5").innerHTML === curPlayer && document.getElementById("d6").innerHTML === curPlayer:
			show("d4", "d5", "d6");
			break;
		case document.getElementById("d7").innerHTML === curPlayer && document.getElementById("d8").innerHTML === curPlayer && document.getElementById("d9").innerHTML === curPlayer:
			show("d7", "d8", "d9");
			break;
		case document.getElementById("d1").innerHTML === curPlayer && document.getElementById("d4").innerHTML === curPlayer && document.getElementById("d7").innerHTML === curPlayer:
			show("d1", "d4", "d7");
			break;
		case document.getElementById("d2").innerHTML === curPlayer && document.getElementById("d5").innerHTML === curPlayer && document.getElementById("d8").innerHTML === curPlayer:
			show("d2", "d5", "d8");
			break;
		case document.getElementById("d3").innerHTML === curPlayer && document.getElementById("d6").innerHTML === curPlayer && document.getElementById("d9").innerHTML === curPlayer:
			show("d3", "d6", "d9");
			break;
		case document.getElementById("d1").innerHTML === curPlayer && document.getElementById("d5").innerHTML === curPlayer && document.getElementById("d9").innerHTML === curPlayer:
			show("d1", "d5", "d9");
			break;
		case document.getElementById("d3").innerHTML === curPlayer && document.getElementById("d5").innerHTML === curPlayer && document.getElementById("d7").innerHTML === curPlayer:
			show("d3", "d5", "d7");
			break;
		default:
			draw();
	}
}

function show(a, b, c) {
	var a = document.getElementById(a),
	b = document.getElementById(b),
	c = document.getElementById(c);
	a.setAttribute("class","win");
	b.setAttribute("class","win");
	c.setAttribute("class","win");
	setTimeout(reset, 1200);
}

function draw() {
	console.log("draw().game.moves:", game.moves);
	if (game.moves === 9) {
		setTimeout(reset, 1200);
	}
}

function reset() {
	if (document.getElementsByClassName("win").length !== 0) {	
		var x = document.getElementsByClassName("win");
		//console.log("x[0]:",x[0]);
		//console.log("x[1]:",x[1]);
		//console.log("x[2]:",x[2]);
		x[0].setAttribute("class","cell");
		x[1].setAttribute("class","cell");
		//x[2].setAttribute("class","cell");  //x[2]的class并未设置为cell
    }

    if (document.getElementsByClassName("win").length !== 0) {
    	var z = document.getElementsByClassName("win");
    	//console.log(z);
    	z[0].setAttribute("class","cell");
    }

	var y = document.getElementsByClassName("cell");
	for (var j = 0; j < y.length; j++) {
		if (y[j].innerHTML === "X" || "O") {
			y[j].innerHTML = "";
		}
		if (y[j].getAttribute("onclick") === "" ) {
			y[j].setAttribute("onclick","icon(this.id)");
		}
	}
	game.moves = 1;
	firstMove();
}