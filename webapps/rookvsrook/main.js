/*
 * Created by Neal Nicdao (Capital_Asterisk)
 * Based on the Programming Simulator Engine
 * Made with gedit
 * February 15 2017: Let's make a game after 2 years of no games'
 * March 18 2017: release!
 */


var mainCanvas = document.createElement("canvas");
var ctx = mainCanvas.getContext("2d");
mainCanvas.width = 800;
mainCanvas.height = 600;
mainCanvas.style.position = "fixed";
mainCanvas.style.left = "0%";
mainCanvas.style.top = "0%";
mainCanvas.style.width = "800";
mainCanvas.style.height = "600";
document.body.appendChild(mainCanvas);

/* Content */
var animations = [
	//vid("webm/BOOM.webm")
];
var images = [
	//img("Images/full_intro0.png"),	// 0
];

//var music = [
	//aud("Audio/Epic Programmer.ogg"),
//];
var sound = [{vendalenger: aud("aud/vendalenger.ogg")},
	[
		aud("aud/switch.ogg"),
		aud("aud/move.ogg"),
		aud("aud/lock.ogg"),
		aud("aud/capture.ogg"),
		aud("aud/point.ogg"),
		aud("aud/slideup.ogg")
	]
];

//var currentInterval;
var psev = "17.3.18 Web ACACIA";
var currentScene;
var playing;
//var register = {[], [], [], [], [], [], [], []};
var objects = [];
var buttonList = [];
var keys = [];
var game = {
	audio: {
		theme: 1
	},
	screen: {
		width: 0,
		height: 0,
		square: 0,
		squareOffX: 0,
		squareOffY: 0
	},
	col: {
		backColor: "",
		lightA: "",
		lightB: "",
		darkA: "",
		darkB: ""
	},
	s: {},
	p: {},
	scn: {
		disableInput: false,
		timeStart: 0,
		time: 0,
		timescale: 1,
	},
	score: {
		white: 0,
		black: 0
	}
}

var shake = 0;

/* Scenes */

var colortest = function(first) {
	if (first) {
		huehuehue();
	}
	ctx.fillStyle = "#1e1e1e";
	ctx.fillRect(0, 0, game.screen.width, game.screen.height);
	ctx.fillStyle = game.col.backColor;//randColor();
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square, game.screen.square);
	ctx.fillStyle = game.col.backColor;
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square * 0.9, game.screen.square * 0.9);
	ctx.fillStyle = game.col.lightA;
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square * 0.8, game.screen.square * 0.8);
	ctx.fillStyle = game.col.lightB;
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square * 0.7, game.screen.square * 0.7);
	ctx.fillStyle = game.col.darkA;
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square * 0.6, game.screen.square * 0.6);
	ctx.fillStyle = game.col.darkB;
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square * 0.5, game.screen.square * 0.5);
	ctx.fillStyle = game.col.darkC;
	ctx.fillRect(game.screen.squareOffX, game.screen.squareOffY,
	game.screen.square * 0.4, game.screen.square * 0.4);

	ctx.textAlign = "center";
	ctx.fillStyle = "#1e1e1e";
	ctx.font = "44px HKGrotesk";
	ctx.fillText((Math.floor(game.scn.time * 10) / 10) + " TqBfJotlD_ Test",
		game.screen.width / 2, (3 - game.scn.time) / 3 * game.screen.height);
	ctx.fillText("RVR: " + psev,
		game.screen.width / 2, (3 - game.scn.time) / 3 * game.screen.height + 47);
	if (game.scn.time > 1.5) {
		setScene(vendalengerScene, 15)
	}
	//ctx.drawImage(images[8], 0, 0, 800, 600);
}

var vendalengerScene = function(first) {
	if (first) {
		setTimeout(function() {
			playSound("vendalenger")
		}, 1360)
	}
	ctx.fillStyle = game.col.backColor;
	ctx.fillRect(0, 0, game.screen.width, game.screen.height);
	
	ctx.setTransform(game.screen.square / 512, 0, 0, game.screen.square / 512,
		game.screen.width / 2, game.screen.height / 2);
	
	// draw board
	//var eachSquare = 48;
	ctx.fillStyle = game.col.darkC;

	var animA = Math.sin(Math.min(Math.max(0, game.scn.time - 0.1), 1) * Math.PI / 2)
	//ctx.globalAlpha = animA;
	ctx.shadowBlur = 19;
	ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
	ctx.shadowOffsetY = 6;
	//ctx.translate(0, 12 - 6 * animA);
	
	ctx.translate(0, Math.pow(Math.min(Math.max(0, game.scn.time - 3), 1), 2) * 600)
	ctx.globalAlpha = 1 - Math.min(Math.max(0, (game.scn.time - 3) * 5), 1);

	ctx.fillRect(-200 * animA, -125,
		400 * animA, 250);
		
	ctx.shadowColor = "transparent";

	ctx.globalAlpha -= 1 - Math.min(Math.max(0, game.scn.time - 1.1) * 2, 1);
	
	ctx.translate(0, Math.pow(Math.min(Math.max(0, game.scn.time - 1.0) * 2, 1), -5) * -16);
	
	ctx.textAlign = "center";
	ctx.font = "32px Righteous";
	ctx.fillStyle = game.col.backColor;
	ctx.fillText("VENDALENGER", 0, 90);
	
	ctx.fillRect(-48, -16, 32, 32);
	ctx.fillRect(-16, 16, 32, 32);
	ctx.fillRect(16, -48, 32, 32);
	
	if (game.scn.time > 3.4) {
		setScene(menuScene, 15)
	}
}

var selected = 0;

var menuScene = function(first) {

	if (first) {
		game.s.selected = -1;
		game.s.prevselect = -1;
		game.s.playVs = ["WASD", "IJKL", "Arrow keys", "CPU (Stupid)", "CPU (Easy)", "CPU (Med)", "CPU (Hard)"];
		game.s.playRounds = [10, 20, 32, 75, 100];
		game.s.playTimes = ["Unlimited", "10s", "1m", "2m", "5m"];
		game.s.white = 0;
		game.s.black = 1;
		game.s.rounds = 20;
		game.s.time = 0;
		game.s.entries = [
			[function() {
				//return "White: " + game.s.playVs[game.s.white] + ((game.s.white == 0) ? " [WASD]" : "");
				return "White: " + game.s.playVs[game.s.white];
			}, function(left) {
				game.s.white = (game.s.white + 1) % game.s.playVs.length;
				playSound(0);
			}],
			[function() {
				//return "Black: " + game.s.playVs[game.s.black] + ((game.s.black == 0) ? " [IJKL]" : "");
				return "Black: " + game.s.playVs[game.s.black];
			}, function(left) {
				game.s.black = (game.s.black + 1) % game.s.playVs.length;
				playSound(0);
			}],
			[function() {
				return "Rounds: " + ((game.s.rounds != undefined)
					? game.s.rounds : "Unlimited");
			}, function(left) {
				game.s.rounds = game.s.playRounds[game.s.playRounds.indexOf(game.s.rounds) + 1];
				playSound(0);
			}],
			[function() {
				return "Time limit: " + game.s.playTimes[game.s.time];
			}, function(left) {
				game.s.time = (game.s.time + 1) % game.s.playTimes.length;
				playSound(0);
			}],
			[function() {
				return "Change colour"
			}, function(left) {
				huehuehue();
				playSound(2);
			}],
			/*[function() {
				return "Test"
			}, function(left) {
			
			}],
			[function() {
				return "Test"
			}, function(left) {
			
			}],*/
			[function() {
				return "Start game"
			}, function(left) {
				playSound(0);
				playSound(5);
				// put scene variables into the persistent variables, they would be
				// saved for next time the game is run.
				game.p.white = game.s.white;
				game.p.black = game.s.black;
				game.p.rounds = game.s.rounds;
				// multiply time by 60 if it ends with "m"
				game.p.time = Number.parseInt(game.s.playTimes[game.s.time]) * ((game.s.playTimes[game.s.time].endsWith("m")) ? 60 : 1);
				game.s.gamestart = game.scn.time;
			}]
		]
	}

	ctx.fillStyle = game.col.backColor;
	ctx.fillRect(0, 0, game.screen.width, game.screen.height);

	ctx.setTransform(game.screen.square / 512, 0, 0, game.screen.square / 512,
		game.screen.width / 2, game.screen.height / 2);

	//ctx.globalAlpha = animA;
	
	var animA = Math.sin(Math.min(Math.max(0, game.scn.time - 0.0), 1) * Math.PI / 2);
	var animB = 1 - (Math.cos(Math.min(Math.max(0, game.scn.time - 1.9) * 2, 1) * Math.PI) + 1) / 2;
	
	//ctx.translate(0, 12 - 6 * animA);
	//ctx.fillRect(-192, -192, 384, 384);
	ctx.shadowBlur = 19;
	ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
	ctx.shadowOffsetY = 6;
	
	ctx.save();
	ctx.translate(0, -48 * 3 * animB);
	
	if (game.s.gamestart) {
		ctx.translate(0, -Math.pow(game.scn.time - game.s.gamestart, 2) * 4000);
	}
	
	ctx.fillStyle = game.col.darkC;
	ctx.fillRect(-192, -48 * 1.5 * animA, 384, 48 * 1.5 * animA + 360 * animB);
	
	ctx.shadowColor = "transparent";
	
	ctx.fillStyle = game.col.darkA;
	ctx.fillRect(-192, -48 * 1.5 * animA, 384, 48 * 1.5 * animA);
	
	if (game.scn.time > 1.6)
	ctx.fillRect(-150, 48 * 1.5 * animA + 360 * animB - 90, 300, 8);
	
	ctx.textAlign = "center";
	ctx.font = "32px HKGrotesk";
	ctx.fillStyle = game.col.backColor;
	
	ctx.globalAlpha = Math.min(Math.max(game.scn.time - 0.7, 0), 1);
	
	ctx.fillText("ROOK v ROOK", 0, -24);
	
	ctx.fillStyle = game.col.darkB;
	
	game.s.prevselect = game.s.selected;
	
	if (animB == 1 && Mouse.dx * Mouse.dy != 0 && Math.abs(Mouse.x) < 192) {
		game.s.selected = Math.floor((Mouse.y) / 48 + 3);
		if (game.s.selected < 0 || game.s.selected > game.s.entries.length - 1) {
			game.s.selected = game.s.prevselect;
		}
	}
	if (!game.s.gamestart && game.s.selected != -1) {
		ctx.fillRect(-192, 48 * game.s.selected, 384, 48);
	}
	
	//ctx.fillRect(Mouse.x - 2, Mouse.y - 2 + 48 * 3, 4, 4);
	
	ctx.fillStyle = game.col.backColor;
	ctx.font = "28px HKGrotesk";
	
	for (var i = 0; i < game.s.entries.length; i ++) {
		ctx.globalAlpha = Math.min(Math.max(game.scn.time - 2.1 - i / 7, 0), 1);
		ctx.fillText(game.s.entries[i][0](), 0, 48 * (i + 0.75));
	}
	
	ctx.restore();
	
	//if (game.szcn.time > 47.4) {
	//	setScene(gameScene, 15)
	//}
	if (game.s.selected != -1) {
		if (!game.s.gamestart && Mouse.tap) {
			game.s.entries[game.s.selected][1]();
		}
	}
	if (game.s.gamestart) {
		if (game.s.gamestart + 0.5 < game.scn.time) {
			setScene(gameScene, 15);
		}
	}

}

var gameScene = function(first) {
	if (first) {
		// "name": [code, times, time, timerelease isdown]
		game.s.addRooks = function() {
			
			// ["WASD", "IJKL", "Arrow keys", "CPU (Stupid)", "CPU (Easy)", "CPU (Med)", "CPU (Hard)"];
			
			var wasd = {u: 87, l: 65, d: 83, r: 68};
			var ijkl = {u: 73, l: 74, d: 75, r: 76};
			var arrow = {u: 38, l: 37, d: 40, r: 39};
			var nuul = {u: 0, l: 0, d: 0, r: 0};
				
			var botdiff = [9.1, 1.4, 0.8, 0.0];
			
			var lazy = [wasd, ijkl, arrow, nuul, nuul, nuul, nuul, nuul];
			
			objects.push(new PlayerRook(7, 7, {"u": [lazy[game.p.white].u, 0, 0, 0, false],
					"l": [lazy[game.p.white].l, 0, 0, 0, false],
					"d": [lazy[game.p.white].d, 0, 0, 0, false],
					"r": [lazy[game.p.white].r, 0, 0, 0, false]}, "#fefefe"));
			objects.push(new PlayerRook(0, 0, {"u": [lazy[game.p.black].u, 0, 0, 0, false],
					"l": [lazy[game.p.black].l, 0, 0, 0, false],
					"d": [lazy[game.p.black].d, 0, 0, 0, false],
					"r": [lazy[game.p.black].r, 0, 0, 0, false]}, "#1e1e1e"));
			

			if (game.p.white >= 3)
				objects.push(new Bot(objects[0], objects[1], botdiff[game.p.white - 3]));
			
			if (game.p.black >= 3)
				objects.push(new Bot(objects[1], objects[0], botdiff[game.p.black - 3]));
		}
	}
	ctx.fillStyle = game.col.backColor;
	ctx.fillRect(0, 0, game.screen.width, game.screen.height);
	
	ctx.setTransform(game.screen.square / 512, 0, 0, game.screen.square / 512,
		game.screen.width / 2, game.screen.height / 2);
	
	// draw board
	var eachSquare = 48;
	ctx.fillStyle = game.col.darkC;
	ctx.globalAlpha = Math.min(game.scn.time, 1);

	var animA = Math.min(Math.max(0, game.scn.time - 3.4), 1);
	ctx.shadowBlur = 19 * animA;
	ctx.shadowColor = "rgba(0, 0, 0, " + 0.25 * animA + ")";
	ctx.shadowOffsetY = 6 * animA;
	ctx.translate(0, 12 - 6 * animA);

	ctx.fillRect(-eachSquare * 4 - 5, -eachSquare * 4 -5,
		eachSquare * 8 + 10, eachSquare * 8 + 10);

	ctx.shadowColor = "transparent";
	for (var i = 0; i < 64; i ++) {
		var x = i % 8;
		var y = Math.floor((63 - i) / 8);
		ctx.fillStyle = ((i + y) % 2 == 1) ? game.col.darkB : game.col.darkA;
		ctx.fillRect(-eachSquare * 4 + x * eachSquare,
			-eachSquare * 4 + y * eachSquare - Math.pow(Math.max(0.15 - (game.scn.time - 2 - i / 64), 0), 2) 
			 * 2000,
			eachSquare, eachSquare);
	}
	
	ctx.save();
	
	ctx.globalAlpha = Math.min(Math.max(0, game.scn.time - 4.0), 1);
	
	// Time limit
	if (game.p.time != NaN) {
		ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
		ctx.shadowBlur = 5;
		ctx.shadowOffsetY = 2;
		var width = Math.max(Math.min((game.p.time - (game.scn.time - 4.2))
				/ game.p.time * 48 * 8, 48 * 8), 0);
		//ctx.fillStyle = game.col.darkC;
		ctx.fillRect(-width / 2, 48 * -5, width, 12);
	}
	
	ctx.shadowColor = "transparent";
	
	ctx.fillStyle = "#555753"
	
	ctx.strokeStyle = "#d3d7cf"
	ctx.setLineDash([6 / 48, 3 / 48]);
	ctx.lineWidth = 1.5 / 48;
	ctx.lineDashOffset = game.scn.time / 10;
	
	ctx.textAlign = "center";
	ctx.font = "0.8px HKGrotesk";
	
	// white score thing
	ctx.translate(-24 * 8 + 8.2 * 48, -24 * 8 + 5.0 * 48);
	ctx.scale(48, 48);
	drawRook();
	ctx.stroke();
	ctx.fillText(game.score.white, 0.565, 0.8);
	
	ctx.translate(-9.4, -3);
	
	// black one
	
	drawRook();
	ctx.stroke();
	ctx.fillText(game.score.black, 0.565, 0.8);
	
	ctx.setLineDash([0, 0]);
	
	ctx.restore();
	
	ctx.globalAlpha = 1;
	
	if (objects.length != 0 && (Math.max(game.score.white, game.score.black) >= game.p.rounds || 0 > (game.p.time - (game.scn.time - 4.2)))) {
		objects.length = 0;
		game.s.victory = game.scn.time;
		game.s.msg = "WIN__ " + ((game.score.white > game.score.black) ? "White" : "Black");
		if (game.score.white == game.score.black) {
			game.s.msg = "TIE"
		}
		if (Math.max(game.score.white, game.score.black) == 0) {
			game.s.msg = "NO BIRD"
		}
		setTimeout(function() {
			game.score.white = 0;
			game.score.black = 0;
			setScene(menuScene, 15)
		}, 2000);
	}
	
	if (game.s.victory) {
		ctx.shadowBlur = 19;
		ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
		ctx.shadowOffsetY = 6;
		ctx.fillStyle = game.col.lightA;
		ctx.fillRect(-150, -60, 300, 120);
		ctx.fillStyle = "#555753";
		ctx.textAlign = "center";
		ctx.font = "32px HKGrotesk";
		ctx.shadowColor = "transparent";
		ctx.fillText(game.s.msg, 0, 10);
	}
	
	for (var i = 0; i < objects.length; i ++) {
		objects[i].draw();
		//if (objects[i].captured) {
		//	objects.splice(i, 1);
		//	i --;
		//}
	}
	
	if (game.scn.time > 4.2 && game.s.addRooks) {
		game.s.addRooks();
		game.s.addRooks = false;
	}
	
}

var videoPlayer = function(first) {
	ctx.drawImage(playing, 0 + Math.random() * shake - shake / 2, 0 + Math.random() * shake - shake / 2, 800, 600);
	shake /= 3;
}

/* var Functions */

var scaleToWindow = function() {
	game.scn.time = (new Date().getTime() - game.scn.timeStart) / 1000 * game.scn.timescale;
	mainCanvas.width = window.innerWidth;
	mainCanvas.height = window.innerHeight;
	game.screen.width = mainCanvas.width;
	game.screen.height = mainCanvas.height;
	game.screen.square = Math.min(game.screen.width, game.screen.height);
	game.screen.squareOffX = (game.screen.width < game.screen.height) ? 0 :
		game.screen.width / 2 - game.screen.square / 2;
	game.screen.squareOffY = (game.screen.height < game.screen.width) ? 0 :
		game.screen.height / 2 - game.screen.square / 2;
	//ctx.setTransform(window.innerWidth / 800, 0, 0, window.innerHeight / 600, 0, 0);
}

var setScene = function(scene, ms) {
	buttonList.splice(0, buttonList.length) /* Clears the array */
	//if (currentInterval)
	//	clearInterval(currentInterval);
	if (scene != null) {
		game.scn.timeStart = new Date().getTime();
		game.scn.time = 0;
		game.s = {};
		scene(true);
		currentScene = scene;
		//var f;
		//f = function() {
		//	scene(false);
		//	if (currentScene == scene)
		//		window.requestAnimationFrame(f);
		//}
		//f();
		//currentInterval = setInterval(function() {
		//	scene(false);
		//}, ms)
	}
}

var huehuehue = function(f) {
	var hue = 45;
	
	// prevent the really hard to see colours
	while (Math.abs(hue - 45) < 15 || Math.abs(hue - 155) < 25) 
		hue = Math.random() * 360;
	
	if (f)
		hue = f;
	console.log("Hue: " + hue);
	game.col.backColor = "hsl(" + Math.floor(hue) + ", 100%, 98%)";
	game.col.lightA = "hsl(" + Math.floor((hue + 2) % 360) + ", 98%, 93%)";
	game.col.lightB = "hsl(" + Math.floor((hue + 6) % 360) + ", 99%, 91%)";
	game.col.darkA = "hsl(" + Math.floor((hue + 13) % 360) + ", 100%, 82%)";
	game.col.darkB = "hsl(" + Math.floor((hue + 15) % 360) + ", 100%, 75%)";
	game.col.darkC = "hsl(" + Math.floor((hue + 17) % 360) + ", 100%, 66%)";
}

var drawRook = function() {

	ctx.beginPath();
	ctx.moveTo(0.106, 0.984);
	ctx.lineTo(0.106, 0.873);
	ctx.lineTo(0.226, 0.740);
	ctx.lineTo(0.278, 0.382);
	ctx.lineTo(0.168, 0.272);
	ctx.lineTo(0.168, 0.050);
	ctx.lineTo(0.278, 0.050);
	ctx.lineTo(0.278, 0.162);
	ctx.lineTo(0.392, 0.162);
	ctx.lineTo(0.392, 0.050);
	
	ctx.lineTo(1 - 0.392, 0.050);
	ctx.lineTo(1 - 0.392, 0.162);
	ctx.lineTo(1 - 0.278, 0.162);
	ctx.lineTo(1 - 0.278, 0.050);
	ctx.lineTo(1 - 0.168, 0.050);
	ctx.lineTo(1 - 0.168, 0.272);
	ctx.lineTo(1 - 0.278, 0.382);
	ctx.lineTo(1 - 0.226, 0.740);
	ctx.lineTo(1 - 0.106, 0.873);
	ctx.lineTo(1 - 0.106, 0.984);
	ctx.closePath();
	
}

var randNumString = function(size) {
	var s = "";
	for (var i = 0; i < size; i ++) {
		s += Math.floor(Math.random() * 10);
	}
	return s;
}

var randColor = function() {
	return "hsl(" + (360 * Math.random()) + ", 100%, 50%)";
}

/* Listeners */

document.onkeydown = function(event) {
	if (game.scn.disableInput)
		return;
	if (!event.repeat && keys.indexOf(event.keyCode) == -1) {
		//If it doesn't exist, add it.
		keys.push(event.keyCode);
		//console.log(event);
		for (var i = 0; i < objects.length; i ++) {
			//if (objects[i].controls && objects[i].controls[event.keyCode]) {
			if (objects[i].controls) {
				var k = Object.keys(objects[i].controls);
				for (var j = 0; j < k.length; j ++) {
					if (objects[i].controls[k[j]][0] == event.keyCode) {
						objects[i].controls[k[j]][1] ++;
						objects[i].controls[k[j]][2] = (new Date().getTime() - game.scn.timeStart) / 1000;
						objects[i].controls[k[j]][4] = true;
					}
				}
			}
		}
	}
	//console.log(event);
};

document.onkeyup = function(event) {
	if (game.scn.disableInput)
		return;
	var i = keys.indexOf(event.keyCode);
	if (i != -1) { //If it does exist, remove it.
		keys.splice(i, 1);
	}
	for (var i = 0; i < objects.length; i ++) {
		//if (objects[i].controls && objects[i].controls[event.keyCode]) {
		if (objects[i].controls) {
			
			var k = Object.keys(objects[i].controls);
			for (var j = 0; j < k.length; j ++) {
				if (objects[i].controls[k[j]][0] == event.keyCode) {
					objects[i].controls[k[j]][4] = false;
					objects[i].controls[k[j]][3] = (new Date().getTime() - game.scn.timeStart) / 1000;
				}
			}
		}
	}
};

mainCanvas.onmousemove = function(evt) {
	//Mouse.x = evt.clientX * 800 / window.innerWidth;
	//Mouse.y = evt.clientY * 600 / window.innerHeight;
	//Mouse.dx = evt.movementX * 800 / window.innerWidth;
	//Mouse.dy = evt.movementY * 600 / window.innerHeight;
	Mouse.x = (evt.clientX - game.screen.squareOffX) / game.screen.square * 512 - 256;
	Mouse.y = (evt.clientY - game.screen.squareOffY) / game.screen.square * 512 - 256;
	Mouse.dx = (evt.movementX - game.screen.squareOffX) / game.screen.square * 512 - 256;
	Mouse.dy = (evt.movementY - game.screen.squareOffY) / game.screen.square * 512 - 256;
	//ctx.setTransform(game.screen.square / 512, 0, 0, game.screen.square / 512,
	//game.screen.width / 2, game.screen.height / 2);
	//console.log(Mouse.x + " " + Mouse.y);
	//Mouse.down = true;
	//for (var i = 0; i < buttonList.length; i ++) {
	//	if (buttonList[i].x < Mouse.x && buttonList[i].y < Mouse.y
	//		&& buttonList[i].x + buttonList[i].width > Mouse.x
	//		&& buttonList[i].y + buttonList[i].height > Mouse.y) {
	//		buttonList[i].isDown = true;
	//		buttonList[i].onClick(evt);
	//	}
	//}
}

mainCanvas.onmousedown = function(evt) {
	//Mouse.x = evt.clientX * 800 / window.innerWidth;
	//Mouse.y = evt.clientY * 600 / window.innerHeight;
	//Mouse.dx = evt.movementX * 800 / window.innerWidth;
	//Mouse.dy = evt.movementY * 600 / window.innerHeight;
	Mouse.x = (evt.clientX - game.screen.squareOffX) / game.screen.square * 512 - 256;
	Mouse.y = (evt.clientY - game.screen.squareOffY) / game.screen.square * 512 - 256;
	Mouse.dx = (evt.movementX - game.screen.squareOffX) / game.screen.square * 512 - 256;
	Mouse.dy = (evt.movementY - game.screen.squareOffY) / game.screen.square * 512 - 256;
	//ctx.setTransform(game.screen.square / 512, 0, 0, game.screen.square / 512,
	//game.screen.width / 2, game.screen.height / 2);
	console.log(Mouse.x + " " + Mouse.y);
	Mouse.down = true;
	Mouse.tap = true;
	//for (var i = 0; i < buttonList.length; i ++) {
	//	if (buttonList[i].x < Mouse.x && buttonList[i].y < Mouse.y
	//		&& buttonList[i].x + buttonList[i].width > Mouse.x
	//		&& buttonList[i].y + buttonList[i].height > Mouse.y) {
	//		buttonList[i].isDown = true;
	//		buttonList[i].onClick(evt);
	//	}
	//}
}

mainCanvas.onmouseup = function(evt) {
	Mouse.down = false;
	for (var i = 0; i < buttonList.length; i ++) {
		if (buttonList[i].x < Mouse.x && buttonList[i].y < Mouse.y
			&& buttonList[i].x + buttonList[i].width > Mouse.x
			&& buttonList[i].y + buttonList[i].height > Mouse.y) {
			buttonList[i].mouseUp(evt);
		}
		buttonList[i].isDown = false;
	}
}

/*document.onkeydown = function(evt) {
	for (var i = 0; i < buttonList.length; i ++) {
		if (buttonList[i].hotkey == evt.keyCode || buttonList[i].hotkey == -2) {
			buttonList[i].isDown = true;
			buttonList[i].onClick(evt);
		}
	}
	return !(evt.keyCode == 32);
}

document.onkeyup = function(evt) {
	for (var i = 0; i < buttonList.length; i ++) {
		buttonList[i].isDown = false;
	}
	//if (ingame) {
	//	screenButton.isDown = false;
	//}
}*/

/* Functions */

function aud(src) {
	a = new Audio();
	a.src = src;
	return a;
}

function img(src) {
	i = new Image();
	i.src = src;
	return i;
}

function vid(src) {
	a = document.createElement("video");
	a.src = src;
	return a;
}

function playSound(i) {
	if (typeof i == "string") {
		sound[0][i].pause();
		sound[0][i].currentTime = 0;
		sound[0][i].play();
	} else if (game.audio.theme != 0) {
		sound[game.audio.theme][i].pause();
		sound[game.audio.theme][i].currentTime = 0;
		sound[game.audio.theme][i].play();
	}
}

function noInput(a) {
	game.scn.disableInput = a;
	
	if (a) {
		var e = new Date().getTime();
		// release all controls
		for (var i = 0; i < objects.length; i ++) {
			if (objects[i].controls) {
				var k = Object.keys(objects[i].controls);
				for (var j = 0; j < k.length; j ++) {
					objects[i].controls[k[j]][4] = false;
					objects[i].controls[k[j]][2] = (e - game.scn.timeStart) / 1000;
					objects[i].controls[k[j]][3] = (e - game.scn.timeStart) / 1000;
				}
			}
		}
	}
}

function playVideo(webm, after) {
	playing = webm;
	webm.play();
	webm.onended = after;
	setScene(videoPlayer, 10);
}

/* Classes */

/*function Particle() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.r = 0;
	this.rv = 0;
	this.del = false;
	this.movement = 0; // 0: physics w/ gravity 1: spaz
	this.type = 0; // 0: text, 1: image
	this.textSize = 16;
	this.value; 
	this.draw = function() {
		ctx.save();
		if (this.type == 0) {
			ctx.font = this.textSize + "px Arial";
			ctx.textAlign = "center";
			ctx.translate(this.x, this.y);
			ctx.rotate(this.r);
			ctx.fillText(this.value, 0, 0);
		} else if (this.type == 1) {
			ctx.translate(this.x, this.y);
			ctx.rotate(this.r);
			ctx.drawImage(logos[this.value],
				-logos[this.value].width / 2, -logos[this.value].height / 2,
				logos[this.value].width, logos[this.value].height);
		}
		ctx.restore();
		this.rv /= 1.0005;
		this.x += this.vx;
		this.y += this.vy;
		this.r += this.rv;
		this.vy += 0.1;
		if (this.y > 600) this.del = true;
	}
}*/

function Button(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.hotkey = -1;
	this.isDown = false;
	this.isMouseOver = false;
	this.onClick = function(evt) {};
	this.mouseDown = function(evt) {};
	this.mouseUp = function(evt) {};
}

function Bot(control, target, stupidity) {
	this.x = -5; // unused
	this.y = -5;
	this.cont = control;
	this.tgt = target;
	this.difficolt = stupidity;
	this.delay = 0;
	this.operation = 0;
	this.draw;
}

Bot.prototype.draw = function() {
	
	// operation
	// 0: nothing
	// 1: moving horizontal
	// 2: moving vertical
	var moveX = this.cont.controls.r[4] - this.cont.controls.l[4];
	var moveY = this.cont.controls.d[4] - this.cont.controls.u[4];
	//var moveX = 0;
	//var moveY = 0;
	var prevX = moveX;
	var prevY = moveY;
	
	var dist = [];
	dist[0] = this.tgt.fX - this.cont.fX;
	dist[1] = this.tgt.fY - this.cont.fY;
	
	if (this.delay < game.scn.time && !this.cont.captured) {
		if (this.operation == 0) {
			// track player
			moveX = 0;
			moveY = 0;
			var moveHorizontal = false;
			//if (dist[0] < dist[1]) {
			//	
			//}
			moveHorizontal = (Math.abs(dist[0]) == Math.abs(dist[1]))
					? (Math.random() > 0.5) : (dist[1] < dist[0]);
			if (dist[0] == 0)
				moveHorizontal = false;
			if (dist[1] == 0)
				moveHorizontal = true;
			//console.log(moveHorizontal + " " + dist[0] + " " + dist[1])
			if (Math.random() < 0.2) {
				moveHorizontal = !moveHorizontal;
			}
			
			if (moveHorizontal) {
				moveX = dist[0] / Math.abs(dist[0]);
			} else {
				moveY = dist[1] / Math.abs(dist[1]);
			}
			this.operation = 1;
			
		} else {
			//console.log("OP 1");
			if (moveX == 0 && moveY == 0)
				this.operation = 0;
			//console.log(this.cont.d + " " + Math.abs((this.moveX == 1) ? dist[1] : dist[0]));
			if (Math.sign(this.cont.xdir) != Math.sign(moveX)
					|| Math.sign(this.cont.ydir) != Math.sign(moveY))
				this.operation = 0;
				
			if (this.cont.d >= Math.abs((moveX != 0) ? dist[0] : dist[1])) {
				this.operation = 0;
			}
			
			if (Math.random() < 0.05) {
				this.operation = 0;
			}
			
			// if locked on, and not stupid at all
			if (this.operation == 0 && (dist[0] * dist[1] == 0)
				&& this.stupidity != 1 && Math.random() < this.difficolt / 10) {
				this.delay = game.scn.time + Math.random() * this.difficolt / 5;
				this.operation = 1;
			}
			
			if (this.operation == 0) {
				moveX = 0;
				moveY = 0;
				this.delay = game.scn.time + Math.random() * this.difficolt;
			}
			
		}
	}
	
	if (this.cont.captured || this.tgt.captured) {
		moveX = 0;
		moveY = 0;
	}
	
	//console.log(moveX + " " + moveY);
	
	this.cont.controls.r[4] = moveX > 0;
	this.cont.controls.l[4] = moveX < 0;
	this.cont.controls.d[4] = moveY > 0;
	this.cont.controls.u[4] = moveY < 0;
	
	//console.log("LEFT: " + this.cont.controls.l[4]);
	
	if (prevX == 0) {
		if (moveX > prevX)
			this.cont.controls.r[2] = (new Date().getTime() - game.scn.timeStart) / 1000;
		else if (moveX < prevX)
			this.cont.controls.l[2] = (new Date().getTime() - game.scn.timeStart) / 1000;
	} else {
		if (moveX < prevX)
			this.cont.controls.r[3] = (new Date().getTime() - game.scn.timeStart) / 1000;
		else if (moveX > prevX)
			this.cont.controls.l[3] = (new Date().getTime() - game.scn.timeStart) / 1000;
	}
	
	if (prevY == 0) {
		if (moveY > prevY)
			this.cont.controls.d[2] = (new Date().getTime() - game.scn.timeStart) / 1000;
		else if (moveY < prevY)
			this.cont.controls.u[2] = (new Date().getTime() - game.scn.timeStart) / 1000;
	} else {
		if (moveY < prevY)
			this.cont.controls.d[3] = (new Date().getTime() - game.scn.timeStart) / 1000;
		else if (moveY > prevY)
			this.cont.controls.u[3] = (new Date().getTime() - game.scn.timeStart) / 1000;
	}
}

function PlayerRook(tx, ty, controls, color) {
	this.moveDir = "";
	this.controls = controls;
	this.color = color;
	this.xdir = 0;
	this.ydir = 0;
	this.d = 0;
	this.moving = 0; // time button released
	this.iX = tx;
	this.iY = ty;
	this.fX = tx;
	this.fY = ty;
	this.x = tx;
	this.y = ty;
	this.defX = tx;
	this.defY = ty;
	this.capturable = true;
	this.captured = false;
	this.draw;
}



PlayerRook.prototype.draw = function() {
	
	//this.x += this.controls.r[1];
	//this.x -= this.controls.l[1];
	
	//this.y += this.controls.d[1];
	//this.y -= this.controls.u[1];
	
	//this.controls.r[1] = Math.max(0, this.controls.r[1] - 1);
	//this.controls.l[1] = Math.max(0, this.controls.l[1] - 1);
	//this.controls.d[1] = Math.max(0, this.controls.d[1] - 1);
	//this.controls.u[1] = Math.max(0, this.controls.u[1] - 1);
	
	//this.d = 0;
	
	var colliding = null;
	
	// If a button is being pressed
	if (this.moveDir != "" && !this.captured) {
	
		var dprev = this.d;
		
		// d is how many spaces the pawn should move
		this.d = Math.floor(1 + Math.abs(this.xdir + this.ydir) * (game.scn.time - this.controls[this.moveDir][2]) * 10);
		
		// Stop from falling off the board
		// restrict x to 0 - 8
		this.d -= Math.max(0, -this.fX - this.d * this.xdir);
		this.d -= Math.max(0, this.fX - 7 + this.d * this.xdir);
		// same with y
		this.d -= Math.max(0, -this.fY - this.d * this.ydir);
		this.d -= Math.max(0, this.fY - 7 + this.d * this.ydir);
		
		// collision checking
		var yiffX = 0;
		var yiffY = 0;
		for (var i = 0; i <= Math.abs(this.d); i ++) {
			yiffX = this.fX + i * this.xdir;
			yiffY = this.fY + i * this.ydir;
			//console.log("Testing: " + i + "(" + yiffX + ", " + yiffY + ") d:" + this.d);
			for (var j = 0; j < objects.length; j ++) {
				if (objects[j] != this
					&& Math.round(objects[j].fX) == yiffX
					&& Math.round(objects[j].fY) == yiffY) {
					if (objects[j] instanceof PlayerRook) {
						
						//alert("tish")
						this.d = i;
						
						colliding = objects[j];
						
						// pretty much a double break, got lazy
						i = this.d + 6;
						j = objects.length;
					}
					//console.log("Collision detected!");
				}
			}
		}
		
		if (this.d != dprev) {
			//console.log("D has changed!")
			if (colliding != null && colliding.color != this.color) {
				playSound(2);
			}
			playSound(0);
		}
		
	}
	
	if (this.moveDir == "") {
		// No moves, still
		
		this.xdir = 0;
		this.ydir = 0;
		
		// See if a button is being pressed, if so, set moveDir
		// there should be a more efficient way to do this.
		if (this.controls.u[4]) {
			this.moveDir = "u"
			this.ydir = -1;
		} else if (this.controls.d[4]) {
			this.moveDir = "d"
			this.ydir = 1;
		} else if (this.controls.l[4]) {
			this.moveDir = "l"
			this.xdir = -1
		} else if (this.controls.r[4]) {
			this.moveDir = "r"
			this.xdir = 1;
		}
		
		//this.xdir = () ? 1 - ;
	} else if (this.moving == 0 && this.controls[this.moveDir][4] == false && !this.captured) { // mu ha ha ha ha
		// Button released, start moving!
		//this.x += this.xdir * d;
		//this.y += this.ydir * d;
		this.fX = Math.round(this.x + this.xdir * this.d);
		this.fY = Math.round(this.y + this.ydir * this.d);
		this.moveDir = "";
		this.xdir = 0;
		this.ydir = 0;
		this.iX = this.x;
		this.iY = this.y;
		this.d = 0;
		this.moving = game.scn.time; // time started moving
		
		// Capture opponent moving to
		if (colliding != null && colliding.capturable) {
			colliding.captured = true;
			colliding.moving = game.scn.time;
			colliding.iX = colliding.x;
			colliding.iY = colliding.y;
			var iswhite = this.color == "#fefefe";
			if (iswhite) {
				colliding.fX = 8.2;
				colliding.fY = 5;
			} else {
				colliding.fX = -1.2;
				colliding.fY = 2;
			}
			noInput(true);
			
			setTimeout(function() {
				playSound(4);
				if (iswhite) {
					game.score.white ++;
				} else {
					game.score.black ++;
				}
				for (var i = 0; i < objects.length; i ++) {
					if (objects[i] instanceof PlayerRook) {
						objects[i].x = objects[i].defX;
						objects[i].y = objects[i].defY;
						objects[i].iX = objects[i].defX;
						objects[i].iY = objects[i].defY;
						objects[i].fX = objects[i].defX;
						objects[i].fY = objects[i].defY;
						objects[i].d = 0;
						objects[i].captured = false;
					}
				}
				noInput(false);
			}, 400);
			playSound(3);
		} else {
			playSound(1);
		}
	}
	
	if (this.moving != 0) {
		// use sin for smooth movement
		var speedmul = 4;
		this.x = this.iX + (this.fX - this.iX) * Math.sin(Math.PI / 2 * (game.scn.time - this.moving) * speedmul);
		this.y = this.iY + (this.fY - this.iY) * Math.sin(Math.PI / 2 * (game.scn.time - this.moving) * speedmul);
		if ((game.scn.time - this.moving) * speedmul >= 1) {
			this.x = this.fX;
			this.y = this.fY;
			this.moving = 0;
			if (this.captured) {
				//noInput(false);
				
			}
		}
	}
	
	ctx.fillStyle = this.color;
	ctx.shadowBlur = 10;
	ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
	ctx.shadowOffsetY = 2;
	//ctx.beginPath();
	//ctx.arc(-24 * 7 + this.x * 48, -24 * 7 + this.y * 48, 20, 0, 2 * Math.PI);
	//ctx.fill();
	ctx.save();
	ctx.translate(-24 * 8 + this.x * 48, -24 * 8 + this.y * 48);
	ctx.scale(48, 48);
	drawRook();
	ctx.fill();
	ctx.restore();
	
	ctx.shadowColor = "transparent";
	
	if ((this.xdir | this.ydir) != 0) {
		//var d = Math.floor(1 + Math.abs(this.xdir + this.ydir) * (game.scn.time - this.controls[this.moveDir][2]) * 10);
		ctx.strokeStyle = this.color;
		ctx.globalAlpha = Math.min(1, (game.scn.time - this.controls[this.moveDir][2]) * 8);
		//console.log(game.scn.time - this.moving);
		ctx.lineWidth = 2;
		ctx.strokeRect(-24 * 8 + this.fX * 48 + this.xdir * 48 * this.d + 1,
										-24 * 8 + this.fY * 48 + this.ydir * 48 * this.d + 1,
										46, 46);
		ctx.globalAlpha = 1;
	}
	
}

/* JSONs */

/*var indexBox = {
	create: function() {
		indexBox.stack.push(i);
		i = 0;
	},
	pop: function() {
		i = indexBox.stack[indexBox.stack.length - 1];
		indexBox.stack.splice(indexBox.stack.length - 1, 1);
	},
	stack: [0]
}*/

var Mouse = {x: 0, y: 0, dx: 0, dy: 0, down: false, tap: false}

/* Startup stuff */

var gameLoop = function() {
	scaleToWindow();
	currentScene();
	Mouse.tap = false;
	window.requestAnimationFrame(gameLoop);
}

scaleToWindow();
window.requestAnimationFrame(gameLoop);
setScene(colortest, 15);
//rollTheFuckingIntroFunction(mainCanvas, function() {
	//window.requestAnimationFrame(gameLoop);
	//setScene(colortest, 15);
//});
