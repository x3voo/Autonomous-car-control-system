const WIDTH = 400, HEIGHT = 400;

var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#0000FF";
ctx.fillRect(0, 0, WIDTH, HEIGHT);

var cords = document.getElementById("cords");
var draw_time = document.getElementById("draw_time");

var wheelsUi = document.getElementById("wheelsUi");
var carAngleUi = document.getElementById("carAngleUi");
var speedUi = document.getElementById("speedUi");
var sensLeftUi = document.getElementById("sensLeftUi");
var sensCenterUi = document.getElementById("sensCenterUi");
var sensRightUi = document.getElementById("sensRightUi");
var carXposUi = document.getElementById("carXpos")
var carYposUi = document.getElementById("carYpos")
var carXposAbsUi = document.getElementById("carXposAbs")
var carYposAbsUi = document.getElementById("carYposAbs")


left = false;
right = false;
up = false;
down = false;
space = false;
ai = false;
customAngle = 0;

var array2D = [];
init_array2D();

// "#007070" grass 0
// "#dbdbdb" path 1

function init_array2D(){
	for(var i = 0 ; i < HEIGHT; i++){
		array2D[i] = [];
		for(var j = 0 ; j < WIDTH; j++){
			array2D[i][j] = 0;
		}
	}

}

function clear_array2D(){
	for(var i = 0 ; i < HEIGHT; i++){
		//array2D[i] = [];
		for(var j = 0 ; j < WIDTH; j++){
			array2D[i][j] = 0;
		}
	}

}

var id = ctx.getImageData(0, 0, 1, 1);

playerPosX =80;
playerPosY =80;
playerAbsolutePosX = 80;
playerAbsolutePosY = 80;

var angle = 0;
var absoluteAngle = 50;

var wheel = 2;



var i = setInterval(function(){
	
	playerPosX = Math.round(playerAbsolutePosX);
	playerPosY = Math.round(playerAbsolutePosY);
	
	draw(true, playerPosX, playerPosY, 51);//20*(4/3) //termp !! = 30

	var sa = wheel;
	
	angle = 0;
	
	if(left == true){
		if (ai == true)
			steer("left", customAngle);
		else
			steer("left", -60);
	}
	if(right == true)
		if (ai == true)
			steer("right", customAngle);
		else
			steer("right", 60);
	if(up == true)
		acc(1);
	if(down == true)
		acc(-1);

	var sensTempFront = car_sensor("front");
	ctx.beginPath();
	ctx.moveTo(playerPosX, playerPosY);
	ctx.lineTo(sensTempFront.x, sensTempFront.y);
	ctx.lineWidth = 2;
	// set line color
	ctx.strokeStyle = '#808000';
	ctx.stroke();
	
	sensCenterUi.innerText = "Sensor front: " + sensTempFront.d;
	
	var sensTempLeft = car_sensor("left");
	ctx.beginPath();
	ctx.moveTo(playerPosX, playerPosY);
	ctx.lineTo(sensTempLeft.x, sensTempLeft.y);
	ctx.lineWidth = 2;
	// set line color
	ctx.strokeStyle = '#808000';
	ctx.stroke();
	sensLeftUi.innerText = "Sensor left: " + sensTempLeft.d;
	
	var sensTempRight = car_sensor("right");
	ctx.beginPath();
	ctx.moveTo(playerPosX, playerPosY);
	ctx.lineTo(sensTempRight.x, sensTempRight.y);
	ctx.lineWidth = 2;
	// set line color
	ctx.strokeStyle = '#808000';
	ctx.stroke();
	sensRightUi.innerText = "Sensor right: " + sensTempRight.d;
	
	ctx.save();
	ctx.translate(playerPosX, playerPosY);
	//
	ctx.rotate(absoluteAngle * Math.PI / 180);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(-10, -10, 20, 20);
	ctx.fillStyle = "#0000FF";
	ctx.fillRect(-10, -10, 20, 5);
	//ctx.translate( playerPosX/2, playerPosY/2 );
	//ctx.rotate(0);
	ctx.restore();
    //ctx.fillStroke(0, 0, 20, 20);
    
	wheelsUi.innerText = "Wheels angle: " + Math.round((angle*180)/Math.PI);
	carAngleUi.innerText = "Car angle: " + absoluteAngle;
	
	carXposUi.innerText = "Car X pos: " + playerPosX;
	carYposUi.innerText = "Car Y pos: " + playerPosY;
	
	carXposAbsUi.innerText = "Car X pos: " + playerAbsolutePosX;
	carYposAbsUi.innerText = "Car Y pos: " + playerAbsolutePosY;

}, 16);

function acc(speed){
	//speed = 1;
	playerPosVY = -Math.cos(absoluteAngle * Math.PI / 180) * speed;
	playerPosVX = Math.sin(absoluteAngle * Math.PI / 180) * speed;    
	
	// Plot the new velocity into x and y cords
	//playerPosY = Math.round(playerPosY + playerPosVY);
	//playerPosX = Math.round(playerPosX + playerPosVX);
	
	playerAbsolutePosY += playerPosVY;
	playerAbsolutePosX += playerPosVX;
	
	absoluteAngle += angle;
	
	//console.log(playerPosY+":"+playerPosX);
}

function updateWheel(n){
	wheel = n;
}
//30 / -30 
function steer(dir, a){
	//updateWheel(a);
	if (dir == "right")
		angle = a * Math.PI / 180;
	else
		angle = a * Math.PI / 180;
}

init_draw();
draw(false, 0, 0, 0);


function init_draw(){
	ctx.fillStyle = 1; // path
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
testX = 0;
textY = 0;

function draw_car_sensor(){
	//playerPosX =50;
	//playerPosY =50;
	//---front
	radian = (Math.PI/180) * (absoluteAngle);
	range = 50;
	newX = Math.round((playerPosX) + (Math.sin(radian) * range));
	newY = Math.round((playerPosY) - (Math.cos(radian) * range));
	
	console.log(newX+":"+newY+":"+radian);
	
	array2D[newY][newX] = "#00ff00";
	//---left
	radian = (Math.PI/180) * (absoluteAngle-45);
	range = 30;
	newX = Math.round((playerPosX) + (Math.sin(radian) * range));
	newY = Math.round((playerPosY) - (Math.cos(radian) * range));
	console.log(newX+":"+newY+":"+radian);	
	array2D[newY][newX] = "#00ff00";
	//right
	radian = (Math.PI/180) * (absoluteAngle+45);
	range = 30;
	newX = Math.round((playerPosX) + (Math.sin(radian) * range));
	newY = Math.round((playerPosY) - (Math.cos(radian) * range));
	console.log(newX+":"+newY+":"+radian);	
	array2D[newY][newX] = "#00ff00";
	
	//ctx.fillStyle = "#00ff00";
	//ctx.fillRect(playerPosX, playerPosY, 1, 1);
}

function car_sensor(dir){
	distance = 0;
	range = 50;
	radian = 0;
	
	
	switch (dir) {
		case "front":
			radian = (Math.PI/180) * (absoluteAngle);
			break;
		case "left":
			radian = (Math.PI/180) * (absoluteAngle - 45);
			break;
		case "right":
			radian = (Math.PI/180) * (absoluteAngle + 45);
			break;
	}
	var pathType = 0;
	newX = (playerPosX);
	newY = (playerPosY);
	if(array2D[newY][newX] == 0)
		pathType = 1;
	
	for(i = 0; i <= range; i++){
	newX = Math.round((playerPosX) + (Math.sin(radian) * i));
	newY = Math.round((playerPosY) - (Math.cos(radian) * i));
	
	if(newY < 0)
		newY = 0;
	
	if(newY > HEIGHT-1)
		newY = HEIGHT-1;
	
	if(newX < 0)
		newX = 0;
	
	if(newX > WIDTH-1)
		newX = WIDTH-1;
	
	if(array2D[newY][newX] == pathType || (newY <= 0 || newY >= HEIGHT-1 || newX <= 0 || newX >= WIDTH-1)){
		
		if (pathType == 1)
			distance = range - Math.sqrt(Math.pow(newX - playerPosX, 2) + Math.pow(newY - playerPosY, 2));
		else
			distance = Math.sqrt(Math.pow(newX - playerPosX, 2) + Math.pow(newY - playerPosY, 2));
		break;
	}
	
	if(i == range)
		if (pathType == 1)
			distance = 0;
		else
			distance = 50;
	}
	
	
	ret = {d: distance, x: newX, y: newY};
	
	return ret;
}

function draw(update, y, x, r){
		var time = new Date().getTime();
		
		var pixelData = new Uint8ClampedArray(4 * WIDTH * HEIGHT);
		var dataIndex = 0;
		
		for(var i = 0; i < HEIGHT; i++){
			for(var j = 0; j < WIDTH; j++){
						
				if(array2D[i][j] == 0){
					pixelData[dataIndex++] = 0;
					pixelData[dataIndex++] = 112;
					pixelData[dataIndex++] = 112;
					pixelData[dataIndex++] = 255;
				}else{
					pixelData[dataIndex++] = 219;
					pixelData[dataIndex++] = 219;
					pixelData[dataIndex++] = 219;
					pixelData[dataIndex++] = 255;
				}
			}
		}
		var imageData = new ImageData(pixelData, WIDTH, HEIGHT);
		ctx.putImageData(imageData, 0, 0);
		
		draw_time.innerText = (new Date().getTime() - time) + " ms";
}



function yourFunction(mouseX, mouseY) {
  console.log("Inside!");
  console.log(mouseY+":"+mouseX);
  var r = 20;
  for(var i = mouseY - r; i <= mouseY + r; i++)
	{
	   for(var j = mouseX - r; j <= mouseX + r; j++)
	   {
		   //console.log(i+":"+j);
		   //array2D[i][j] = "#dbdbdb";
		   if((i-mouseY)*(i-mouseY) + (j-mouseX)*(j-mouseX) <= r*r)
		   {
			   if(i < HEIGHT && j < WIDTH && i >= 0 && j >= 0)
					array2D[i][j] = 1;
		   }
	   }
	}
	draw(true, mouseX, mouseY, r);
}

tool = new tool_pencil();

canvas.addEventListener('mousedown', ev_canvas, false);
canvas.addEventListener('mousemove', ev_canvas, false);
canvas.addEventListener('mouseup',   ev_canvas, false);

function tool_pencil () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
        yourFunction(ev._x, ev._y);
		
        tool.started = true;
    };

    this.mousemove = function (ev) {
		cords.innerText = "x: "+ev._x+" y: "+ev._y;
      if (tool.started) {
        yourFunction(ev._x, ev._y);
      }
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
      }
    };
  }

function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }
  
  
//controlls
document.addEventListener('keydown', (e) => {
	if (e.code === "ArrowLeft")
		controlls("left",true);
		//left = true;
	else if (e.code === "ArrowRight")
		controlls("right",true);
		//right = true;
	else if (e.code === "ArrowUp")
		controlls("up",true);
		//up = true;
	else if (e.code === "ArrowDown")
		controlls("down",true);
		//down = true;
	else if (e.code === "Space")
		controlls("space",true);
		//space = true;
	
	document.getElementById("key").innerHTML = e.code;
});
document.addEventListener('keyup', (e) => {
	if (e.code === "ArrowLeft")
		controlls("left",false);
		//left = false;
	else if (e.code === "ArrowRight")
		controlls("right",false);
		//right = false;
	else if (e.code === "ArrowUp")
		controlls("up",false);
		//up = false;
	else if (e.code === "ArrowDown")
		controlls("down",false);
		//down = false;
	else if (e.code === "Space")
		controlls("space",false);
		//space = false;
});


function controlls(key, state, an){
	switch(key){
		case "left":
			if(state == true){
				customAngle = an;
				left = true;
			}
			else {
				//customAngle = 0;
				left = false;
			}
			break;
		case "right":
			if(state == true){
				customAngle = an;
				right = true;
			}
			else {
				//customAngle = 0;
				right = false;
			}
			break;
		case "up":
			if(state == true)
				up = true;
			else
				up = false;
			break;
		case "down":
			if(state == true)
				down = true;
			else
				down = false;
			break;
		case "space":
			if(state == true)
				space = true;
			else
				space = false;
			break;
		case "ai":
			if(state == true)
				ai = true;
			else
				ai = false;
			break;
		
	}
}