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

var stopIt = function() {
	window.cancelAnimationFrame(rid);
};

var sb = document.getElementById('sb');
sb.addEventListener('click', stopIt);

var circ = document.getElementById('circle');
circ.addEventListener('click', animateDot);
