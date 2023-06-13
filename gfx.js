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
		for(var j = 0 ; j < WIDTH; j++){
			array2D[i][j] = 0;
		}
	}
}

playerPosX = 80;
playerPosY = 80;
playerAbsolutePosX = 80;
playerAbsolutePosY = 80;

playerSpeed = 1;
playerMaxAngle = 60;

var angle = 0;
var absoluteAngle = 50;

function UpdateCarSpecs() {
	playerSpeed = document.getElementById("customSpeed").value;
	playerMaxAngle = document.getElementById("customAngle").value;
}

var i = setInterval(function(){
	
	playerPosX = Math.round(playerAbsolutePosX);
	playerPosY = Math.round(playerAbsolutePosY);
	
	DrawScene();
	
	angle = 0;
	
	if(left == true){
		if (ai == true)
			steer("left", customAngle);
		else
			steer("left", -playerMaxAngle);
	}
	if(right == true)
		if (ai == true)
			steer("right", customAngle);
		else
			steer("right", playerMaxAngle);
	if(up == true)
		acc(playerSpeed);
	if(down == true)
		acc(-playerSpeed);

	var sensTempFront = car_sensor("front");
	ctx.beginPath();
	ctx.moveTo(playerPosX, playerPosY);
	ctx.lineTo(sensTempFront.x, sensTempFront.y);
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#808000';
	ctx.stroke();
	
	sensCenterUi.innerText = "Sensor front: " + sensTempFront.d;
	
	var sensTempLeft = car_sensor("left");
	ctx.beginPath();
	ctx.moveTo(playerPosX, playerPosY);
	ctx.lineTo(sensTempLeft.x, sensTempLeft.y);
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#808000';
	ctx.stroke();
	sensLeftUi.innerText = "Sensor left: " + sensTempLeft.d;
	
	var sensTempRight = car_sensor("right");
	ctx.beginPath();
	ctx.moveTo(playerPosX, playerPosY);
	ctx.lineTo(sensTempRight.x, sensTempRight.y);
	ctx.lineWidth = 2;
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

function steer(dir, a){
	if (dir == "right")
		angle = a * Math.PI / 180;
	else
		angle = a * Math.PI / 180;
}


DrawScene();

function draw_car_sensor(){
	// Front sensor
	radian = (Math.PI/180) * (absoluteAngle);
	range = 50;
	newX = Math.round((playerPosX) + (Math.sin(radian) * range));
	newY = Math.round((playerPosY) - (Math.cos(radian) * range));
	//console.log(newX+":"+newY+":"+radian);
	array2D[newY][newX] = "#00ff00";
	
	// Left sensor
	radian = (Math.PI/180) * (absoluteAngle-45);
	range = 30;
	newX = Math.round((playerPosX) + (Math.sin(radian) * range));
	newY = Math.round((playerPosY) - (Math.cos(radian) * range));
	//console.log(newX+":"+newY+":"+radian);	
	array2D[newY][newX] = "#00ff00";
	
	// Right sensor
	radian = (Math.PI/180) * (absoluteAngle+45);
	range = 30;
	newX = Math.round((playerPosX) + (Math.sin(radian) * range));
	newY = Math.round((playerPosY) - (Math.cos(radian) * range));
	//console.log(newX+":"+newY+":"+radian);	
	array2D[newY][newX] = "#00ff00";
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
	newX = playerPosX;
	newY = playerPosY;
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
			distance = pathType == 1 ? 0 : 50;
	}
	
	ret = {d: distance, x: newX, y: newY};
	
	return ret;
}

function DrawScene(){
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

// Path drawing
canvas.addEventListener('mousemove', DrawPath, false);

function DrawPath(ev) {
	const mouseX = ev.offsetX !== undefined ? ev.offsetX : ev.layerX;
	const mouseY = ev.offsetY !== undefined ? ev.offsetY : ev.layerY;
	const r = 20;
	cords.innerText = "x: "+mouseX+" y: "+mouseY;

	if(ev.buttons != 0){
		for (let i = mouseY - r; i <= mouseY + r; i++) {
			for (let j = mouseX - r; j <= mouseX + r; j++) {
				if ((i - mouseY) ** 2 + (j - mouseX) ** 2 <= r ** 2) {
					if (i < HEIGHT && j < WIDTH && i >= 0 && j >= 0) {
						array2D[i][j] = 1;
					}
				}
			}
		}
		DrawScene();
	}
}
  
  
// Controlls
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
			}
			left = state;
			break;
		case "right":
			if(state == true){
				customAngle = an;
			}
			right = state;
			break;
		case "up":
			up = state;
			break;
		case "down":
			down = state;
			break;
		case "space":
			space = state;
			break;
		case "ai":
			ai = state;
			break;
		
	}
}