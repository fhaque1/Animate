var c = document.getElementById("slate");
var ctx = c.getContext('2d');
ctx.fillStyle = "blue";

var rid = 0;

var animateDot = function(){
	var x = 0;
	window.cancelAnimationFrame(rid);
	var a = Math.min(c.height/2, c.width/2);
	var shrinkDot = function() {
		ctx.clearRect(0, 0, c.width, c.height);
		console.log(rid);	
		ctx.beginPath();
		ctx.arc(c.width/2, c.height/2, x, 0, 2*Math.PI);    
		ctx.fill();
		x--;
		if (x <= 0)
			return growDot();
		rid = window.requestAnimationFrame(shrinkDot);
	};
	var growDot = function() {
		ctx.clearRect(0, 0, c.width, c.height);
		console.log(rid);	
		ctx.beginPath();
		ctx.arc(c.width/2, c.height/2, x, 0, 2*Math.PI);    
		ctx.fill();
		x++;
		if (x > a)
			return shrinkDot();
		rid = window.requestAnimationFrame(growDot);
	};
	growDot();
};


var animateDVD = function() {
	img = new Image();
	img.src = 'dvd.png';
	var recx = 160;
	var recy = 70;
	var x = Math.random()*(c.width-recx);
	var y = Math.random()*(c.height-recy);
	window.cancelAnimationFrame(rid);
	var drawRec = function(x,y) {
		ctx.clearRect(0, 0, c.width, c.height);
		console.log(rid);
		ctx.drawImage(img,x,y,recx,recy);
		/*
		ctx.beginPath();
		ctx.rect(x, y, recx, recy);
		ctx.fill();
		*/
	};
	var btmRight = function() {			
		drawRec(x,y);
		x++;
		y++;
		if (x >= c.width-recx)
			return btmLeft();
		if (y >= c.height-recy)
			return uprRight();
		rid = window.requestAnimationFrame(btmRight);
	};
	var btmLeft = function() {			
		drawRec(x,y);
		x--;
		y++;
		if (y >= c.height-recy)
			return uprLeft();
		if (x <= 0)
			return btmRight();
		rid = window.requestAnimationFrame(btmLeft);
	};
	var uprRight = function() {			
		drawRec(x,y);
		x++;
		y--;
		if (y <= 0)
			return btmRight();
		if (x >= c.width-recx)
			return uprLeft();
		rid = window.requestAnimationFrame(uprRight);
	};
	var uprLeft = function() {			
		drawRec(x,y);
		x--;
		y--;
		if (x <= 0)
			return uprRight();
		if (y <= 0)
			return btmLeft();
		rid = window.requestAnimationFrame(uprLeft);
	};
	btmRight();
};

var stopIt = function() {
	window.cancelAnimationFrame(rid);
};

var dvd = document.getElementById('dvd');
dvd.addEventListener('click', animateDVD);

var sb = document.getElementById('sb');
sb.addEventListener('click', stopIt);

var circ = document.getElementById('circle');
circ.addEventListener('click', animateDot);
