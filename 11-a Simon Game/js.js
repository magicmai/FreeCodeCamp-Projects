/**
*功能1: 色块亮起的顺序是随机的。
*功能2: 每次以正确的顺序点击色块后, 色块需要以原来的顺序依次亮起, 并增加一个新的序列。
*功能3: 当色块自动按顺序亮起时, 以及用户点击色块时, 需要能够发出声音。
*功能4: 当用户点错时, 要以不同的声音提示用户, 色块需要能以原来的顺序亮起并让用户重试。
*功能5: 可以看到当前游戏中点对的色块序列的数量。
*功能6: 可以通过点击一个按钮重新开始游戏, 并且游戏会重新从一个序列开始。
*功能7: 可以在严格模式下游戏, 即严格模式下一旦输错任意一个序列都必须从头开始。
*功能8: 在输入正确 20 个序列时获胜。将会提示胜利, 并结束游戏。
*/

var game = {
	count: 0,
	blocks: ['#r1', '#r2', '#r3', '#r4'],
	currentGame: [],
	myMove: [],
	sound: {
		r1: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
		r2: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
		r3: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
		r4: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
		wrong: new Audio('http://www.pacdv.com/sounds/interface_sound_effects/sound12.mp3')
	},
	strict: false
}

function onOffGame() {
	if ($('h2').html() === "--") {
		$('#on-off-btn').css({"position": "relative"});
		$('h2').css({"color": "#d50101"}).html('-');
		$('#start-btn').attr({onclick: "newGame()"});
		$('#strict-btn').attr({onclick: "strict()"});
		$('#r1').attr({onclick: "addToMyMove(this.id)"});
		$('#r2').attr({onclick: "addToMyMove(this.id)"});
		$('#r3').attr({onclick: "addToMyMove(this.id)"});
		$('#r4').attr({onclick: "addToMyMove(this.id)"});
	}
	else if ($('h2').html() !== "--") {
		$('#on-off-btn').css({"position": ""});
		$('h2').css({"color": "#771010"}).html('--');
		$('#start-btn').removeAttr("onclick");
		$('#strict-btn').removeAttr("onclick");
		$('#r1').removeAttr("onclick");
		$('#r2').removeAttr("onclick");
		$('#r3').removeAttr("onclick");
		$('#r4').removeAttr("onclick");
		$('.mode').css({"background": "#521212"});
	}
}

function newGame() {
	game.currentGame = [];
	game.count = 0;
	addCount();
}

function strict() {
	if(game.strict === false) {
		game.strict = true;
		$('.mode').css({"background": "#f00"});
	}
	else {
		game.strict = false;
		$('.mode').css({"background": "#521212"});
	}
	newGame();
}

function addCount() {
	game.count++;
	$('h2').html(game.count);
	generateMove();
}

function generateMove() {
	let num;
	//let randomNumber = Math.ceil(Math.random() * 3);
	//让每个block出现的概率更平均一点
	let randomNumber = Math.random();
	if (randomNumber > 0.75) { 
		num = 3;
	}
	else if (randomNumber < 0.75 && randomNumber > 0.5) { 
		num = 2;
	}
	else if (randomNumber < 0.5 && randomNumber > 0.25) { 
		num = 1;
	}
	else if (randomNumber < 0.25 && randomNumber >= 0) { 
		num = 0;
	}
	//console.log("randomNumber:", randomNumber);
	//console.log("num:", num);
	game.currentGame.push(game.blocks[num]);
	//console.log("game.currentGame:", game.currentGame);
	showMoves();
}

function showMoves() {
	if ($('h2').html() === '!!') {
		$('h2').html(game.count);
	}
	let i = 0;
	let moves = setInterval(function() {
		playGame(game.currentGame[i]);
		i++;
		if(i >= game.currentGame.length) {
			clearInterval(moves);
		}
	}, 800);

	game.myMove = [];
}

function playGame(id) {
	console.log("playGameId:", id);
	$(id).addClass('highlight');
	sound(id);
	setTimeout(function() {
		$(id).removeClass('highlight');
	}, 300);
}

function sound(id) {
	switch (id) {
		case '#r1':
			game.sound.r1.play();
			break;
		case '#r2':
			game.sound.r2.play();
			break;
		case '#r3':
			game.sound.r3.play();
			break;
		case '#r4':
			game.sound.r4.play();
			break;
		case 'wrong':
			game.sound.wrong.play();
			break;
	}
}

function addToMyMove(id) {
	let theId = "#" + id;
	$(theId).addClass('highlight');
	sound(theId);
	setTimeout(function() {
		$(theId).removeClass('highlight');
	}, 300);
	game.myMove.push(theId);
	myTurn(theId);
}

function myTurn(id) {
	let lastOne = game.myMove.length - 1;
	if (game.myMove[lastOne] !== game.currentGame[lastOne]) {
		if (game.strict === true) {
			sound('wrong');
			setTimeout(function(){ 
				$("h2").html('!!')
				.fadeOut(100)
				.fadeIn(100)
				.fadeOut(100)
				.fadeIn(100)
				.fadeOut(100)
				.fadeIn(100); 
			}, 0);
			setTimeout(newGame, 1500);

		}
		else {
			sound('wrong');
			setTimeout(function(){ 
				$("h2")	
				.html('!!')			
				.fadeOut(100)
				.fadeIn(100)
				.fadeOut(100)
				.fadeIn(100)
				.fadeOut(100)
				.fadeIn(100); 
			}, 0);
			setTimeout(showMoves, 1100);
		}
	}
	else {
		var check = game.myMove.length === game.currentGame.length;
		if (check) {
			if(game.count === 20) {
				alert('Congratulations! You win!');
				newGame();
			}
			else {
				setTimeout(nextLevel, 400);
			}
		}
	}
}

function nextLevel() {
	addCount();
}

