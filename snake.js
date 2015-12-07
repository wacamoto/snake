var head = {x:0, y:0};
var tail = {x:0, y:0};
var body = 1; 
var width = 100;
var height = 60;
var speed = 1.5;

c = 0;
var temp;
function clock () {
	c += 1;
	if (c >= speed) {
		temp = run();
		c = 0;
	}
	if (temp != 'gameOver') {
		setTimeout('clock()',20);
	}		
}


document.onkeydown = keyevent;
function keyevent () {
	if (event.keyCode == 39) {
		map[head.x][head.y] = 'right';
	}
	else if (event.keyCode == 37) {
		map[head.x][head.y] = 'left';
	}
	else if (event.keyCode == 38) {
		map[head.x][head.y] = 'up';
	}
	else if (event.keyCode == 40) {
		map[head.x][head.y] = 'down';
	}
}


function createNewMap () {
	var map = [];
	for (var c1 = 0; c1 < width; c1++) {
		map[c1] = [];
		for (var c2 = 0; c2 < height; c2 ++) {
			map[c1][c2] = 'empty';
		}
	}
	return map;
}


function createFood () {
	do {
		var c1 = Math.floor(Math.random()*height);
		var c2 = Math.floor(Math.random()*width);
	} while (map[c1][c2] != 'empty');
	map[c1][c2] = 'food';
}


function headmove () {
	var head_direct = map[head.x][head.y];
	var next = '';
	switch (head_direct) {
		case 'up':
			if (head.y - 1 < 0) {
				return 'gameOver'
			}
			next = map[head.x][head.y - 1];
			map[head.x][head.y - 1] = 'up';
			head.y -= 1;
			break;

		case 'right':
		if (head.x + 1 > width) {
				return 'gameOver'
			}
			next = map[head.x + 1][head.y];
			map[head.x + 1][head.y] = 'right';
			head.x += 1;
			break;

		case 'down':
		if (head.y + 1 > height) {
				return 'gameOver'
			}
			next = map[head.x][head.y + 1];
			map[head.x][head.y + 1] = 'down';
			head.y += 1;
			break;

		case 'left':
			if (head.x - 1 < 0) {
					return 'gameOver'
				}
			next = map[head.x - 1][head.y];
			map[head.x - 1][head.y] = 'left';
			head.x -= 1;
			break;

		default:
			return 'gameOver';
	}
	if (next == 'empty') {
		tailmove();
	}else if (next == 'food') {
		body += 1;
		createFood();
		document.getElementById('point').innerHTML = body;
	}else {
		return 'gameOver';
	}
}


function tailmove () {
	var tail_direct = map[tail.x][tail.y];
	map[tail.x][tail.y] = 'empty';
	switch (tail_direct) {
		case 'up':
			tail.y -= 1;
			break;
		case 'right':
			tail.x += 1;
			break;
		case 'down':
			tail.y += 1;
			break;
		case 'left':
			tail.x -= 1;
			break;
	}
}


var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
function draw () {
	for (var c1 = 0; c1 < width; c1++) {
		for (var c2 = 0; c2 < height; c2 ++) {
			if (map[c1][c2] == 'empty') {
				ctx.fillStyle = 'black';
				ctx.fillRect(c1*10, c2*10, 10, 10);
			}else {
				ctx.fillStyle = 'white';
				ctx.fillRect(c1*10 , c2*10, 10, 10);
			}
		}
	}
}


//test
var map = createNewMap();

//clock();
var head = {x:51, y:30};
var tail = {x:49, y:30};
map[51][30] = 'right';
map[50][30] = 'right';
map[49][30] = 'right';		
map[25][25] = 'food';
map[28][25] = 'food';
clock();
function run () {
	draw();
	return headmove();
}
