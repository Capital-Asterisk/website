/*
 * VENDALENGER INTRO JS FILE
 * Created by Neal Nicdao (Capital_Asterisk)
 * August 29 2015 - Created 8:46 PM
 *
 * WARNING: TOTALLY FORMAL CODE
 */

// Load the The play font from Google fonts

// removed everything for offline

// end

var rollTheFuckingIntroFunction = function(canvas, whattodoafter) {

	//setTimeout(whattodoafter, 7000);

	var randomInspiringQuote = [
		"play my gamez"
	][Math.floor(Math.random() * 13)];
	//canvas.style.background = "#212121";
	var ctx = mainCanvas.getContext("2d");
	var m = Math.min(canvas.width, canvas.height);

	var bar = 0;
	var drugs = true;

	var foo = function() {
		if (bar == 1) {
			setTimeout(function() {
				whattodoafter();
				drugs = false;
			}, 7000);
			window.requestAnimationFrame(totallyNotShakeYourAssMajorMinorOrAnyOfThatInformalScripting);
			a.play();
			setTimeout(function() {
				b.play();

			}, 4500);
		}
		bar++;
		console.log("Hello World! " + bar);
	};

	var a = new Audio();
	a.src = "vendalenger/vendalenger02.wav";
	a.onloadeddata = foo;
	a.playbackRate = 0.5;

	var b = new Audio();
	b.src = "vendalenger/vendalenger02_e.wav";
	b.onloadeddata = foo;

	var totallyNotShakeYourAssMajorMinorOrAnyOfThatInformalScripting = function() {
		//console.log(a.currentTime);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "rgb(33, 33, 33)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.setTransform(m / 480, 0, 0, m / 480, canvas.width / 2, canvas.height / 2);
		if (b.currentTime < 0.3) {
			if (a.currentTime > 2.43) {
				ctx.fillStyle = "rgba(255, 255, 255, " + Math.max(0, 2.5 - (a.currentTime - 2.43) * 8) + ")";
				ctx.beginPath();
				ctx.arc(0, 0, Math.sqrt(a.currentTime - 2.43) * 400, 0, 2 * Math.PI);
				ctx.fill();
				if (a.currentTime > 2.6) {
					ctx.fillStyle = "rgb(255, 255, 255)";
					ctx.font = "18px Righteous";
					ctx.textAlign = "center";
					ctx.fillText("VENDALENGER", 0, 80);
				}
			}

			ctx.fillStyle = "rgb(103,255,0)";
			ctx.rotate(Math.pow(Math.max(2 - a.currentTime, 0), 3));
			ctx.scale(Math.pow(Math.max(2 - a.currentTime, 0), 5) + 1, Math.pow(Math.max(2 - a.currentTime, 0), 5) + 1);
			ctx.fillRect(-48, -16, 32, 32);
			ctx.fillRect(-16, 16, 32, 32);
			ctx.fillRect(16, -48, 32, 32);
		} else {
			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.font = "18px Righteous";
			ctx.textAlign = "center";
			ctx.fillText("A game by Capital_Asterisk", 0, -10);
			ctx.fillText("\"" + randomInspiringQuote + "\"", 0, 10);
			ctx.fillStyle = "rgb(50, 50, 50)";
			ctx.fillText("<p>An random inspiring string</p>", 0, 30);
		}

		if (b.currentTime > 0.02) {
			ctx.fillStyle = "rgb(255, 255, 255)";
			//ctx.fillRect(-Math.pow(5931641.6, b.currentTime) / 2, -Math.sin(b.currentTime * 7.85) * 256,
			//	Math.pow(5931641.6, b.currentTime), Math.sin(b.currentTime * 7.85) * 512);
			//ctx.fillRect(-Math.exp(b.currentTime * 15.6) / 2, -Math.sin(b.currentTime * 7.85) * 256,
			//Math.exp(b.currentTime * 15.6), Math.sin(b.currentTime * 7.85) * 512);
			ctx.fillRect(-Math.pow(1.1, b.currentTime * 167.8) / 2, -Math.sin(b.currentTime * 7.8194) * 256,
				Math.pow(1.1, b.currentTime * 167.8), Math.sin(b.currentTime * 7.8194) * 512);
			//console.log(b.currentTime)
		}
		//ctx.fillRec)t(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		if (drugs)
			window.requestAnimationFrame(totallyNotShakeYourAssMajorMinorOrAnyOfThatInformalScripting);
	};

};
