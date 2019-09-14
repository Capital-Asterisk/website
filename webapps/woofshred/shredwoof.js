// August 16 2016, this started
// September 3 2016, it works?
// October 1 2016, progress on if statements and blocks
// October 2 2016, 7:00pm, Whiles and ifs work!
// October 9 2016, upload it
// October 17 2016, Bubble sort!
// VarBox
// BarArray
// Cursor
// 
// If (statement of woot)
// 

var canvas = document.getElementById("neatcanvas");

canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;

$('#backbutton').on('click', function (e) {
	window.location.replace("http://vendalenger.x10host.com/");
});

//var letsDoThis = function() {

	var version = "0.0.1 Acacia";

	var boxes = [];
	var byname = {};
	var gridSize = 48;
	var htop = "This is suppose to be undefined";
	
	var ctx = canvas.getContext("2d");

	//ctx.fillRect(0, 0, 200, 200)

	var input = {
		mouse: false,
		mouseCircle: 0,
		ix: 0,
		iy: 0,
		px: 0,
		py: 0,
		x: 0,
		y: 0,
	}

	var MMath = {
		Clamp: function(min, a, max) {
			return Math.min(Math.max(min, a), max);
		},
		TInterp: function(a, b, time) {
			return a + (b - a) * (1 - (Math.cos(time * Math.PI) / 2 + 0.5));
		},
		//LInterp: function(a, b, time) {
		//	return a + (b - a) * (); when i need it
		//},
		NoNaN: function(a, b) {
			return isNaN(b) ? a : b;
		},
		NoProp: function(a, name, def) {
			if (name in a)
				return a[name];
			else
				return def;
		},
		Swap: function(arr, a, b) {
			var c = arr[a];
			arr[a] = arr[b];
			arr[b] = c;
		},
		Cut: function(str, index) {
			return [str.substr(0, index), a.substr(index)];
		}
	}

	var camera_ = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		target: 0,
	};

	var player = {
		tape: [],
		position: 0,
		lastTime: 0,
		currentTime: 0,
		frameTime: 0,
		deltaTime: 0,
		delay: 0,
		playing: false,
		currentFunc: [],
		fram: [],
		blocks: [],
		first: false,
		last: false,
		stop: function() {
			
		},
		play: function() {
			this.playing = false;
			this.bracket = false;
			if (this.tape[this.position] != null) {
				//console.log("pos: " + this.position)
				var pirate = this.tape[this.position].split(" "); // TODOdone better split that supports "strings"

				// split with "strings" and (expressions)
				
				if (pirate.length > 2) {
					if (commands[pirate[1]] != null) {
						var args = pirate.slice(2);
						for (var i = 0; i < args.length; i ++) {
							if (!(/If|While/.test(pirate[1]))) { // TODO more modular pls
								// process arguments, names -> objects in byname
								// except for if and whiles
								if (args[i].startsWith("\"")) {
									// it's a string
									// join ahead until no more strings
									//alert("starts with \"")
									while (args[i + 1] && (!args[i + 1].endsWith("\\\"") || args[i + 1].endsWith("\""))) {
										
										args[i] += " " + args[i + 1];
										//alert(args)
										args.splice(i + 1, 1)
										
									}
									
									args[i] = args[i].substr(1, args[i].length - 2);
									//alert(args[i]);
								} else if (isNaN(args[i])) {
									// object or object.value
									if (args[i].includes(".")) {
										// complex and has a dot
										if (!(/\)|\(|=|\+\+|\-\*|;/.test(args[i]))) {
											try {
												args[i] = eval("byname." + args[i]);
											} catch(theee) {
												//console.log("nope: " + theee.message);
											}
										} else {
											alert("plz no haax, you make woof sad.")
										}
									} else {
										// simple?
										if (args[i] in byname) {
											args[i] = byname[args[i]];
										}
									}
								} else {
									// it's a number
									args[i] = Number(args[i]);
								}
							} else {
								// do nothing
							}
						}
						this.currentFunc = [pirate[1], args];
						this.frameTime = 0;
						//console.log(this.currentFunc);
						this.playing = true;
						this.first = true;
						this.lastTime = new Date().getTime();
						this.delay = Number(pirate[0]) * 1000;
						//this.currentFunc = commands[pirate[1]];
					} else {
						alert("No such command: " + pirate[1]);
						
					}
					this.position ++;
					//setTimeout(function() {
					//	player.play();
					//}, Number(pirate[0]) * 1000);
				} else {
					if (this.tape[this.position] == "{") {
						// some block starts here
						if (this.blocks[this.position] == undefined) {
							alert("it seems you hit an error that would never happen... what? you hacker!")
						} else {
							console.log("Block! ends at: " + this.blocks[this.position]);
							
							this.currentFunc = ["D_None", null];
							this.frameTime = 0;
							this.playing = true;
							this.first = true;
							this.bracket = true;
							this.lastTime = new Date().getTime();
							this.delay = 0;
							this.position ++;
							if (this.fram[31][this.fram[31].length - 1] == this.position - 1) {
								console.log("time for flow")
								// recent flow control happened
								if (true) {//this.fram[30] == 0) {
									// an if happened
									if (!this.fram[32][this.fram[32].length - 1]) {
										// FALSE! set position to end of brackets
										this.position = this.blocks[this.position - 1];
									}
								}
							}
							
						}
					} else if (this.tape[this.position] == "}") {
						// check for loops
						this.currentFunc = ["D_None", null];
						this.frameTime = 0;
						this.playing = true;
						this.first = true;
						this.bracket = true;
						this.lastTime = new Date().getTime();
						this.delay = 0;
						switch (this.fram[30][this.fram[30].length - 1]) {
						case 0:
							
							this.position ++;
							break;
						case 1:
							if (this.fram[32][this.fram[32].length - 1]) { // go back to the loop if true
								//alert(this.fram[32][this.fram[32].length - 1]);
								this.position = player.fram[31][this.fram[31].length - 1] - 1;
							} else {
								this.position ++;
							}
							break;
						}
						//console.log(this.fram[30]);
						//console.log(this.fram[31]);
						//console.log(this.fram[32]);
						this.fram[30].pop();
						this.fram[31].pop();
						this.fram[32].pop();
					}
				}
			}
		},
		update: function() {
			
			var time = new Date().getTime();
			this.deltaTime = time - this.currentTime;
			this.currentTime = time;
			this.frameTime = this.currentTime - this.lastTime;
			if (this.playing) {
				//alert(this.currentFunc[0]);
				this.first = false;
				if (this.frameTime >= this.delay) {
					this.last = true;
					commands[this.currentFunc[0]].apply(commands, this.currentFunc[1]);
					this.last = false;
					this.play();
					//while (this.delay == 0) {
					//	this.play();
					//}
				}
				commands[this.currentFunc[0]].apply(commands, this.currentFunc[1]);
				if (this.delay == 0) {
					this.update();
				}
			}
		},
		pause: function() {

		},
		reset: function() {
			//boxes.splice(0, boxes.length);
			boxes.length = 0;
			byname = {};
			this.position = 0;
		},
		load: function(a) {
			player.fram[30] = [];
			player.fram[31] = [];
			player.fram[32] = [];
			
			if (a instanceof Array) {
				this.tape = a;
			} else {
				this.tape = a.replace(new RegExp("\n", "g"), "").split(";");
				var stackOfNotMatricesToPushPop = [];
				
				for (var i = 0; i < this.tape.length; i ++) {
					this.tape[i] = this.tape[i].trim();
					var e = this.tape[i];
					if (e.length == 0) {
						this.tape.splice(i --, 1);
						// empty string, just kill it
					} else if (e.length > 1 || e == "else") {
						// The algorithm that separates
						if (/}|{|else/.test(e)) {
							// test for "{", "}", or "else"
							// cut the string into an array
							// "birds { eggs } else { \"rip\}\" }"
							// -> ["birds", "{", "eggs", "}",
							// "else", "{", ""rip}", "}"]
							var quote = false;
							var arr = [];
							for (var j = 0; j < e.length; j++) {
								if (e[j] == "\"" && e[j - 1] != "\\") {
									quote = !quote;
								} else if (!quote) {
									if (/}|{/.test(e[j])) {
										if (j != 0) arr.push(e.substr(0, j).trim());
										arr.push(e.substr(j, 1));
										e = e.substr(j + 1);
										j = 0;
									} else if ((e[j - 1] == undefined || (!/\d|\w/i.test(e[j - 1])))
										&& e[j] == "e" && e[j + 1] == "l"
										&& e[j + 2] == "s" && e[j + 3] == "e"
										&& (e[j + 4] == undefined || (!/\d|\w/i.test(e[j + 4])))) {
										if (j != 0) arr.push(e.substr(0, j).trim());
										arr.push(e.substr(j, 4));
										e = e.substr(j + 4);
										j = 0;
									}
								}
								//console.log(j + " " + e);
							}
							if (e != "") arr.push(e);
							this.tape.splice.apply(this.tape, [i, 1].concat(arr));
						}
						
						/*if (this.tape[i][0] == "{") {
							// if the first char is a {
							this.tape[i].substr(1, this.tape[i].length);
							this.tape.splice(i, 0, "{");
						} else if (this.tape[i][this.tape[i].length - 1] == "}") {
							// if the last char is a }
							this.tape[i].substr(0, this.tape[i].length - 1);
							this.tape.splice(++ i, 0, "}");
						}*/
					}

					// Now assign curly brackets to each other
					if (this.tape[i] == "{") {
						stackOfNotMatricesToPushPop.push(i)
					} else if (this.tape[i] == "}") {
						if (stackOfNotMatricesToPushPop.length != 0)
							this.blocks[stackOfNotMatricesToPushPop.pop()] = i;
						else
							alert("your brackets make no sense");
						
					}
				}

				//for (var i = 0; i < this.tape.length; i ++) {
					
					
				//}
				
			}
		}
	};

	var commands = {
		D_None: function() {
			// just nothing happens...
		},
		If: function() {
			if (player.first) {
				var str = "(" + Array.from(arguments).join(" ");
				//for (var i = 0; i < arguments.length; i++) {
				//	str += arguments[i] + (i - 1 < arguments.length) ? " " : "";
				//}
				str += ")";
				var newstring = "(";
				var prevdot = false;
				var prevletter = false;
				for (var i = 0; i < str.length; i ++) {
					//if (!(/\)|\(|=|\.|\+\+|\-\*|;|\s|!|\d/.test(str[i]))) {
					if ((/[a-z]/i.test(str[i]))) {
						// if current character is a letter
						//console.log("Letter!: " + str[i]);
						if (!prevdot && !prevletter) {
							newstring += "byname.";
						}
						newstring += str[i];
						prevdot = false;
						prevletter = true;
					} else {
						// not letter
						//console.log("Not Letter!: " + str[i]);
						prevdot = (str[i] == ".");
						prevletter = false;
						newstring += str[i];
					}
					//if (str[i] == ".")
				}
				newstring += ")"
				//alert(newstring);
				var res = eval(newstring);
				htop = "if " + str + " (" + res + ")";
				player.fram[30].push(0); // 0 is "if"
				player.fram[31].push(player.position);
				player.fram[32].push(res);
				if (res) {
					player.position ++;
				} else {
					// false
				}
			}
			//console.log(arguments.join(" "));
		},
		While: function() {
			if (player.first) {
				// simple.
				this.If.apply(this, Array.from(arguments));
				player.fram[30][player.fram[30].length - 1] = 1; // 0 is "while"
				console.log("woot: " + player.fram[30])
				htop = "while" + htop.substr(2);
				//alert(player.fram[32]);
			}
		},
		D_Log: function() {
			if (player.first)
				console.log(Array.from(arguments).join(" "));
		},
		Create: function(type, name) {
			console.log("debugwoot: " + arguments[2]);
			if (!player.first)
				return;
			if (!(name in byname)) {
				var a = 0;
				var b = {};
				var c;

				for (var i = 2; i < arguments.length; i++) {
					a = arguments[i].indexOf(":");
					if (a != -1) {
						// TODO make this more efficient some day
						b[arguments[i].substr(0, a)] = arguments[i].substr(a + 1, arguments[i].length);
						if (!isNaN(b[arguments[i].substr(0, a)])) {
							b[arguments[i].substr(0, a)] = Number(b[arguments[i].substr(0, a)])
						}
					} else if (arguments[i].startsWith("+")) {
						b[arguments[i].substr(1, arguments[i].length)] = true;
					} else {
						
					}
				}
				console.log("woot: " + type);
				if (type == "Box") {
					c = new Box(b);
					byname[name] = c;
					boxes.unshift(c);
				}
				if (type == "BarArray") {
					c = new BarArray(b);
					byname[name] = c;
					boxes.unshift(c);
				}
				if (type == "Cursor") {
					c = new Cursor(b);
					byname[name] = c;
					boxes.push(c);
				}
				c.name = name;
			} else {
				console.log("already exists");
			}
		},
		ClearExcept: function() {
			var arr = Array.from(arguments);
			boxes = arr;
			byname = {};
			for (var i = 0; i < arr.length; i ++) {
				byname[arr[i].name] = arr[i];
			}
		},
		Translate: function(tgt, x, y) {
			if (tgt) {
				if (!player.last) {
					if (player.first) {
						// (origin x, y)
						player.fram[0] = tgt.x;
						player.fram[1] = tgt.y;
						htop = "Translate " + tgt.name + " +(" + x + ", " + y + ")";
					}
					tgt.x = player.fram[0] + MMath.TInterp(0, x, player.frameTime / player.delay)//Math.sin((player.frameTime / player.delay) * Math.PI / 2);
					tgt.y = player.fram[1] + MMath.TInterp(0, y, player.frameTime / player.delay)//Math.sin((player.frameTime / player.delay) * Math.PI / 2);
					//console.log(Math.sin((player.frameTime / player.delay) * Math.PI / 2));
				} else {
					
					tgt.x = player.fram[0] + x;
					tgt.y = player.fram[1] + y;
					//console.log("last " + a.x + " " + x); 
				}
			
			}
		},
		MoveXY: function(tgt, x, y) {
			if (tgt) {
				if (!player.last) {
					if (player.first) {
						// (origin x, y)
						player.fram[0] = tgt.x;
						player.fram[1] = tgt.y;
						htop = "Move " + tgt.name + " to (" + x + ", " + y + ")";
					}
					tgt.x = MMath.TInterp(player.fram[0], x, player.frameTime / player.delay)//Math.sin((player.frameTime / player.delay) * Math.PI / 2);
					tgt.y = MMath.TInterp(player.fram[0], y, player.frameTime / player.delay)//Math.sin((player.frameTime / player.delay) * Math.PI / 2);
					//console.log(Math.sin((player.frameTime / player.delay) * Math.PI / 2));
				} else {
					
					tgt.x = x;
					tgt.y = y;
					//console.log("last " + a.x + " " + x); 
				}
			
			}
		},
		MoveTo: function(tgt, to, index) {
			if (tgt && to) {
				if (!player.last) {
					if (player.first) {
						// (origin x, y)
						player.fram[0] = tgt.x;
						player.fram[1] = tgt.y;
						
						if (isNaN(index)) {
							player.fram[2] = to.x + to.width / 2;
							player.fram[3] = to.y + to.height / 2;
							player.fram[4] = false;
							htop = "Move " + tgt.name + " to " + to.name;
						} else {
							player.fram[2] = to.x + to.indexX(index);
							player.fram[3] = to.y + to.indexY(index);
							player.fram[4] = true;
							htop = "Move " + tgt.name + " to " + to.name + "'s " + index;
						}
						
					}
					tgt.x = MMath.TInterp(player.fram[0], player.fram[2], player.frameTime / player.delay)//Math.sin((player.frameTime / player.delay) * Math.PI / 2);
					tgt.y = MMath.TInterp(player.fram[1], player.fram[3], player.frameTime / player.delay)//Math.sin((player.frameTime / player.delay) * Math.PI / 2);
					//console.log(Math.sin((player.frameTime / player.delay) * Math.PI / 2));
				} else {
					if (tgt instanceof Cursor) {
						tgt.target = to;
						if (player.fram[4]) {
							tgt.index = index;
						} else {
							tgt.index = -1;
						}
					}
					tgt.x = player.fram[2];
					tgt.y = player.fram[3];
					//console.log("last " + a.x + " " + x); 
				}
			
			}
		},
		CursorSwap: function(cursor, a, b) {
			if (player.first) {
				htop = "(" + cursor.name + ") Swap: " + a + " & " + b;
			}
			if (player.last) {
				//console.log("birds")
				//console.log(cursor);
				var c = (cursor.select[a].array) ? cursor.select[a].value[cursor.selectIndex[a]] : cursor.select[a].value;
				//((cursor.select[a].array) ? cursor.select[a].value[cursor.selectIndex[a]] : cursor.select[a].value) = ((cursor.select[b].array) ? cursor.select[b].value[cursor.selectIndex[b]] : cursor.select[b].value);
				//((cursor.select[b].array) ? cursor.select[b].value[cursor.selectIndex[b]] : cursor.select[b].value) = c;
				if (cursor.select[a].array) {
					cursor.select[a].value[cursor.selectIndex[a]] = ((cursor.select[b].array) ? cursor.select[b].value[cursor.selectIndex[b]] : cursor.select[b].value);
				} else {
					cursor.select[a].value = ((cursor.select[b].array) ? cursor.select[b].value[cursor.selectIndex[b]] : cursor.select[b].value);
				}
				if (cursor.select[b].array) {
					cursor.select[b].value[cursor.selectIndex[b]] = c;
				} else {
					cursor.select[b].value[cursor.selectIndex[b]] = c;
				}
			}
		},
		CursorSelect: function(cursor, index, obj) {
			// cursorname, (index, push)
			if (player.first && cursor instanceof Cursor) {
				htop = "something selected";
				var add = (obj != null && obj instanceof Box) ? obj : cursor.target;
				if (!Number.isNaN(index)) {
					cursor.select[index] = add;
					cursor.selectIndex[index] = cursor.index;
				} else if (index == "push") {
					cursor.select.push(add);
					cursor.selectIndex.push(cursor.index);
				}
			}
		},
		CursorDeselect: function(cursor, index) {
			if (player.first && cursor instanceof Cursor) {
				htop = "something deselected";
				if (!Number.isNaN(index)) {
					cursor.select[index] = null;
					cursor.selectIndex[index] = -1;
				} else if (index == "pop") {
					cursor.select.pop();
					cursor.selectIndex.pop();
				} else if (index == "all") {
					cursor.select.length = 0;
					cursor.selectIndex.length = 0;
				}
			}
		},
		CursorOp: function(tgt, operation, amt) {
			if (tgt) {
				if (player.last) {
					if (operation == "=")
						tgt.value = amt;
					else if (operation == "+")
						tgt.value += amt;
					else if (operation == "-")
						tgt.value -= amt;
					else if (operation == "/")
						tgt.value /= amt;
					else if (operation == "*")
						tgt.value *= amt;
					else
						tgt.value = amt;
				}
			
			}
		},
		CursorGet: function(operation, tgt) {
			if (tgt) {
				if (!player.last) {
					if (player.first) {
						//  (origin x, y)
						player.fram[0] = tgt.y;
					}
					tgt.y = player.fram[0] + Math.sin((player.frameTime / player.delay) * Math.PI) * -0.3;
				} else {
					if (tgt.target.array) {
						if (operation == "=")
							tgt.value = tgt.target.value[tgt.index];
						else if (operation == "+")
							tgt.value += tgt.target.value[tgt.index];
						else if (operation == "-")
							tgt.value -= tgt.target.value[tgt.index];
						else if (operation == "/")
							tgt.value /= tgt.target.value[tgt.index];
						else if (operation == "*")
							tgt.value *= tgt.target.value[tgt.index];
						else
							tgt.value = tgt.target.value[tgt.index];				
					} else {
						if (operation == "=")
							tgt.value = tgt.target.value;
						else if (operation == "+")
							tgt.value += tgt.target.value;
						else if (operation == "-")
							tgt.value -= tgt.target.value;
						else if (operation == "/")
							tgt.value /= tgt.target.value;
						else if (operation == "*")
							tgt.value *= tgt.target.value;
						else
							tgt.value = tgt.target.value;
					}
					tgt.y = player.fram[0];
				}
			
			}
		},
		CursorPut: function(operation, tgt) {
			if (tgt) {
				if (!player.last) {
					if (player.first) {
						// (origin x, y)
						player.fram[0] = tgt.y;
					}
					tgt.y = player.fram[0] + Math.sin((player.frameTime / player.delay) * Math.PI) * -0.3;
				} else {
					if (tgt.target.array) {
						if (operation == "=")
							tgt.target.value[tgt.index] = tgt.value;
						else if (operation == "+")
							tgt.target.value[tgt.index] += tgt.value;
						else if (operation == "-")
							tgt.target.value[tgt.index] -= tgt.value;
						else if (operation == "/")
							tgt.target.value[tgt.index] /= tgt.value;
						else if (operation == "*")
							tgt.target.value[tgt.index] *= tgt.value;
						else
							tgt.target.value[tgt.index] = tgt.value;
					} else {
						if (operation == "=")
							tgt.target.value = tgt.value;
						else if (operation == "+")
							tgt.target.value += tgt.value;
						else if (operation == "-")
							tgt.target.value -= tgt.value;
						else if (operation == "/")
							tgt.target.value /= tgt.value;
						else if (operation == "*")
							tgt.target.value *= tgt.value;
						else
							tgt.target.value = tgt.value;
					}
					tgt.y = player.fram[0];
				}
			
			}
		}
	};

	// ** Events

	$('#getstarted').on("click", function (e) {
		player.reset();
		player.load($('#code').val());
		player.play()
	});

	window.addEventListener("mouseup", function(e) {
		input.mouse = false;
		input.x = e.clientX;
		input.y = e.clientY + window.scrollY;;
		input.ix = input.x;
		input.iy = input.y;
	});

	window.addEventListener("mousemove", function(e) {
		input.x = e.clientX;
		input.y = e.clientY + window.scrollY;
		if (!input.mouse) {
			input.ix = input.x;
			input.iy = input.y;
		}
	});

	canvas.addEventListener("mousedown", function(e) {
		input.mouse = true;
		input.ix = e.clientX;
		input.iy = e.clientY;
	});

	document.onselectstart = function(e) {
		if (input.mouse) {
			e.preventDefault();
			return false;
		}
	};

	// ** Boxes
	
	var Box = function(a) {
		this.colorA = "#c32626";
		this.colorB = "#9C2121";
		this.x = MMath.NoNaN(0, a.x);
		this.y = -MMath.NoNaN(0, a.y);
		this.width = MMath.NoNaN(2, a.width);
		this.height = MMath.NoNaN(1, a.height);
		console.log(this);
		this.value = ("value" in a) ? a.value : 32;
	};

	Box.prototype.draw = function() {
		ctx.fillStyle = this.colorA;
		ctx.strokeStyle = this.colorB;
		ctx.lineWidth = 2;
		//ctx.line
		ctx.save();
		ctx.translate(this.x * gridSize, this.y * gridSize);
		ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
		ctx.shadowBlur = 3;
		ctx.shadowOffsetY = 1;
		ctx.fillRect(0, 0, this.width * gridSize, this.height * gridSize);
		ctx.shadowColor = "rgba(0, 0, 0, 0)";
		ctx.shadowBlur = 0;
		ctx.strokeRect(0, 0, this.width * gridSize, this.height * gridSize);
		ctx.fillStyle = "#ffffff";
		ctx.font = "800 32px Ubuntu"
		ctx.textAlign = "center"
		ctx.fillText(this.value, this.width * gridSize / 2, this.height * gridSize / 2 + 12);
		ctx.restore();
	};
	
	var Cursor = function(a) {
		this.colorA = "#ffffff";
		this.colorB = "#444444";
		this.x = MMath.NoNaN(0, a.x);
		this.y = -MMath.NoNaN(0, a.y);
		this.width = 0;
		this.height = 0;
		this.value = ("value" in a) ? a.value : "undefined?";
		this.target = null;
		this.select = [];
		this.selectIndex = [];
		this.index = -1;
		this.textH = MMath.NoProp(a, "textH", "left");
		this.textV = MMath.NoProp(a, "textV", "top");
	}

	Cursor.prototype = new Box({});
	Cursor.prototype.draw = function() {
		ctx.fillStyle = this.colorA;
		ctx.strokeStyle = this.colorB;
		ctx.lineWidth = 6;
		ctx.save();
		ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
		ctx.shadowBlur = 4;
		ctx.shadowOffsetY = 2;
		ctx.translate(this.x * gridSize, this.y * gridSize);
		ctx.beginPath();
		ctx.arc(0, 0, 4, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle = "#ffffff";
		ctx.strokeStyle = "#444444";
		ctx.font = "800 32px Ubuntu"
		ctx.textAlign = this.textH;
		if (this.textV == "bottom")
			ctx.translate(0, 48);
		ctx.strokeText(this.value, 0, -12);
		ctx.fillText(this.value, 0, -12);
		ctx.restore();
		ctx.shadowColor = "rgba(0, 0, 0, 0)";
		ctx.shadowBlur = 0;
	};

	var BarArray = function(a) {
		this.colorA = "#c32626";
		this.colorB = "#9C2121";
		this.x = MMath.NoNaN(0, a.x);
		this.y = -MMath.NoNaN(0, a.y);
		this.array = true;
		this.width = MMath.NoNaN(4, a.width);
		this.height = MMath.NoNaN(3, a.height);
		this.min = MMath.NoNaN(0, a.min);
		this.max = MMath.NoNaN(100, a.max);
		this.size = MMath.NoNaN(12, a.size);
		//console.log(this);
		//this.value = ("value" in a) ? a.value : 32;
		this.value = new Array(this.size);
		if ("value" in a) { // TODO move this into a function
			if (a.value == "random_int") { 
				//console.log("random");
				for (var i = 0; i < this.size; i++) {
					this.value[i] = Math.round(Math.random() * (this.max - this.min) + this.min);
				}
				//var m = this.max;
				//this.value.map(function() {
				//	return Math.round(Math.random() * m);
				//this}, this);
				console.log(this.value)
			} else if (a.value == "random") {
				for (var i = 0; i < this.size; i++) {
					this.value[i] = Math.random() * (this.max - this.min) + this.min;
				}
			} else if (a.value == "max") {
				for (var i = 0; i < this.size; i++) {
					this.value[i] = this.max;
				}
			} else if (a.value == "min") {
				for (var i = 0; i < this.size; i++) {
					this.value[i] = this.min;
				}
			} else if (a.value == "ramp") {
				for (var i = 0; i < this.size; i++) {
					this.value[i] = (i / (this.size - 1)) * (this.max - this.min) + this.min;
				}
			} else if (a.value == "ramp_int") {
				for (var i = 0; i < this.size; i++) {
					this.value[i] = Math.floor((i / (this.size - 1)) * (this.max - this.min) + this.min);
				}
			} else if (a.value == "shuffle") {
				for (var i = 0; i < this.size; i++) {
					this.value[i] = (i / (this.size - 1)) * (this.max - this.min) + this.min;
					//this.value[i] = i * ;
					MMath.Swap(this.value, i, Math.floor(Math.random() * i));
				}
				// got lazy
				
			} else {
				// If i made a programming language, I would have some function
				// that would skip down to the the else statement of the top function.
				// like:
				// topelse(0) to go to that else below
				for (var i = 0; i < this.size; i++) {
					this.value[i] = 0;
				}			
			}
		} else {
			for (var i = 0; i < this.size; i++) {
				this.value[i] = 0;
			}
		}
		delete this.size;
	};

	BarArray.prototype = new Box({});
	BarArray.prototype.indexX = function(i) {
		return this.width / (2 * this.value.length + 1) * (1.5 + i * 2);
	}
	BarArray.prototype.indexY = function(i) {
		return this.height;
	}

	BarArray.prototype.draw = function() {
		ctx.fillStyle = this.colorA;
		ctx.strokeStyle = this.colorB;
		ctx.lineWidth = 2;
		//ctx.line
		ctx.save();
		ctx.translate(this.x * gridSize, this.y * gridSize);
		ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
		ctx.shadowBlur = 3;
		ctx.shadowOffsetY = 1;
		ctx.fillRect(0, 0, this.width * gridSize, this.height * gridSize);
		ctx.shadowColor = "rgba(0, 0, 0, 0)";
		ctx.shadowBlur = 0;
		ctx.strokeRect(0, 0, this.width * gridSize, this.height * gridSize);
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		//ctx.font = "800 32px Ubuntu"
		//ctx.textAlign = "center"
		//ctx.fillText(String(this.value), this.width * gridSize / 2, this.height * gridSize / 2 + 12);
		
		var barWidth = (this.width * gridSize) / (2 * this.value.length + 1);
		ctx.translate(barWidth, 0);
		var foo = 0;
		for (var i = 0; i < this.value.length; i ++) {
			foo = (this.height * gridSize - 2) * ((this.value[i] - this.min) / (this.max - this.min));
			ctx.fillRect(0, (this.height * gridSize) - foo - 1, barWidth, foo);
			//console.log((this.height * gridSize) * ((this.value[i] + this.min) / (this.max + this.min)));
			ctx.translate(barWidth * 2, 0);
		}
		
		ctx.restore();
	};

	// ** Some other functions

	var animate = function() {
		if (canvas.width != document.body.clientWidth
			|| canvas.height != window.innerHeight) {
			canvas.width = document.body.clientWidth;
			canvas.height = window.innerHeight;
		}

		if (input.mouse) {
			camera_.x += (input.px - input.x) / gridSize;
			camera_.y += (input.py - input.y) / gridSize;
			document.body.style.backgroundPositionX = (-(camera_.x * 48) % gridSize + ((canvas.width / 2) % gridSize)) + "px";
			document.body.style.backgroundPositionY = (-(camera_.y * 48) % gridSize + ((canvas.height / 2) % gridSize)) + "px";
			input.mouseCircle = Math.min(200, input.mouseCircle + player.deltaTime * 2);
			canvas.style.cursor = "none";
		} else {
			input.mouseCircle = Math.max(0, input.mouseCircle - player.deltaTime);
			canvas.style.cursor = "";
		}

		player.update();

		//ctx.setTransform(1, 0, 0, 1, 0, 0);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#000000";
		ctx.font = "12px Ubuntu"
		ctx.fillText("Woof Shredder " + version + " mouse: " + input.mouse + " " + player.deltaTime, 12, 20);

		ctx.translate(-camera_.x * gridSize + canvas.width / 2, -camera_.y * gridSize + canvas.height / 2);	
		
		ctx.strokeStyle = "#afafaf";
		ctx.lineWidth = 2;

		// The next 2 if statements add the lines
		// TODO: a grid would actually work better
		
		if (Math.abs(camera_.x * gridSize) < canvas.width / 2) {
			// draw vertical graph line
			ctx.beginPath();
			ctx.moveTo(0, camera_.y * gridSize - canvas.height / 2);
			ctx.lineTo(0, camera_.y * gridSize + canvas.height / 2);
			for (var i = 0; i <= Math.ceil(canvas.height / gridSize); i ++) {
				// really, wtf is happening here?
				ctx.moveTo(-3, (camera_.y % 1 + 1) * -gridSize + camera_.y * gridSize + gridSize * i - canvas.height / 2 + ((canvas.height / 2) % gridSize));
				ctx.lineTo(3, (camera_.y % 1 + 1) * -gridSize + camera_.y * gridSize + gridSize * i - canvas.height / 2 + ((canvas.height / 2) % gridSize));
			}
			ctx.stroke();
		}

		if (Math.abs(camera_.y * gridSize) < canvas.height / 2) {
			// draw horizontal graph line
			ctx.beginPath();
			ctx.moveTo(camera_.x * gridSize - canvas.width / 2, 0);
			ctx.lineTo(camera_.x * gridSize + canvas.width / 2, 0);
			for (var i = 0; i <= Math.ceil(canvas.width / gridSize); i ++) {
				// TODO: simplify this math mess
				ctx.moveTo((camera_.x % 1 + 1) * -gridSize + camera_.x * gridSize + gridSize * i - canvas.width / 2 + ((canvas.width / 2) % gridSize), 3);
				ctx.lineTo((camera_.x % 1 + 1) * -gridSize + camera_.x * gridSize + gridSize * i - canvas.width / 2 + ((canvas.width / 2) % gridSize), -3);
			}
			ctx.stroke();
		}
		
		//ctx.fillStyle = "#67ff00";
		//ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
		//ctx.shadowBlur = 3;
		//ctx.shadowOffsetY = 1;
		//ctx.fillRect(100, 100, 600, 100);
		//ctx.shadowColor = "rgba(0, 0, 0, 0)";
		//ctx.shadowBlur = 0;
		//ctx.font = "48px Ubuntu";
		//ctx.fillStyle = "#ffffff";
		//ctx.fillText("Woof Woof, THIS IS TEST", 127, 96 + 70);
		
		for (var i = 0; i < boxes.length; i ++) {
			boxes[i].draw();
		}

		ctx.setTransform(1, 0, 0, 1, 0, 0);

		//if (input.mouse) {
		ctx.strokeStyle = "rgba(63, 63, 63, " + (input.mouseCircle / 200 * 0.5) + ")";
		ctx.fillStyle = "rgba(255, 255, 255, " + (input.mouseCircle / 200 * 0.5) + ")";
		ctx.lineWidth = 2 * (input.mouseCircle / 200);
		ctx.beginPath();
		ctx.arc(input.x, input.y, MMath.TInterp(30, 10, input.mouseCircle / 400), 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = "#3f3f3f";


		if (input.mouseCircle == 200) {
			ctx.font = "18px Ubuntu";
			ctx.fillText("Pan", input.x + 32, input.y + 8);
		}

		//}
		ctx.font = "24px Ubuntu";
		ctx.fillText((player.playing ? (player.position + ": ") : "stop: ") + htop, 12, canvas.height - 12);
		
		input.px = input.x;
		input.py = input.y;
		
		requestAnimationFrame(animate);
	};
	requestAnimationFrame(animate);
//};

//letsDoThis();
