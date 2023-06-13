var aiIntervalId;

//term A[left] 0-49
//term B[center] 25-50-75
//term C[right] 51-100
	ZbSens = [];
	ZbSens[0] = [];
	ZbSens[1] = []; //Blisko
	ZbSens[2] = []; //Mid
	ZbSens[3] = []; //Daleko
	
	ZbSteer = [];
	ZbSteer[0] = [];
	ZbSteer[1] = []; //LEFT
	ZbSteer[2] = []; //MID
	ZbSteer[3] = []; //RIGHT
	
	YR = [];
	YR[0] = [];
	YR[1] = [];
	YR[2] = [];
	YR[3] = [];
	YR[4] = [];

	
for (i=0; i <= 100; i++){
	ZbSens[0][i] = 0; 
	ZbSens[1][i] = 0; //Blisko
	ZbSens[2][i] = 0; //Mid
	ZbSens[3][i] = 0; //Daleko
	
	ZbSteer[0][i] = 0;
	ZbSteer[1][i] = 0; //LEFT
	ZbSteer[2][i] = 0; //MID
	ZbSteer[3][i] = 0; //RIGHT
	
	YR[0][i] = 0;
	YR[1][i] = 0;
	YR[2][i] = 0;
	YR[3][i] = 0;
	YR[4][i] = 0;
}
	
for (i=0; i <= 100; i++){
	x = i;

	ZbSens[0][i] = x;
	ZbSteer[0][i] = x;
	YR[0][i] = x;
	
	//term A Blisko
	if (x >= 0 && x <= 50)
		ZbSens[1][i] = (50 - x) / (50 - 0);
	else
		ZbSens[1][i] = 0;
	
	//term B Mid
	if (x >= 0 && x < 50)
		ZbSens[2][i] = (x - 0) / (50 - 0);
	else if (x >= 50 && x <= 100)
		ZbSens[2][i] = (100 - x) / (100 - 50);
	else
		ZbSens[2][i] = 0;
	
	//term C Daleko
	if (x > 50 && x <= 100)
		ZbSens[3][i] = (50 - x) / (50 - 100);
	else
		ZbSens[3][i] = 0;
	
	
	
	//term A LEFT
	if (x >= 0 && x <= 50)
		ZbSteer[1][i] = (50 - x) / (50 - 0);
	else
		ZbSteer[1][i] = 0;
	
	//term B MID
	if (x >= 0 && x < 50)
		ZbSteer[2][i] = (x - 0) / (50 - 0);
	else if (x >= 50 && x <= 75)
		ZbSteer[2][i] = (100 - x) / (100 - 50);
	else
		ZbSteer[2][i] = 0;
	
	//term C RIGHT
	if (x > 50 && x <= 100)
		ZbSteer[3][i] = (50 - x) / (50 - 100);
	else
		ZbSteer[3][i] = 0;
	
}

function FuzzyController(inp1, inp2, inp3) {
	for (i=0; i <= 100; i++){
		YR[1][i] = 0;
		YR[2][i] = 0;
		YR[3][i] = 0;
		YR[4][i] = 0;
	}
	
	var blisko_s1 = ZbSens[1][(inp1*2)];
	var mid_s1 = ZbSens[2][(inp1*2)];
	var daleko_s1 = ZbSens[3][(inp1*2)];
	
	var blisko_s2 = ZbSens[1][(inp2*2)];
	var mid_s2 = ZbSens[2][(inp2*2)];
	var daleko_s2 = ZbSens[3][(inp2*2)];
	
	var blisko_s3 = ZbSens[1][(inp3*2)];
	var mid_s3 = ZbSens[2][(inp3*2)];
	var daleko_s3 = ZbSens[3][(inp3*2)];
	
	for (i=0; i <= 100; i++){
		//R1 blisko blisko blisko right
		if (blisko_s1 > 0 & blisko_s2 > 0 & blisko_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, blisko_s2, blisko_s3, ZbSteer[3][i]); //RIGHT
		
		//R2 blisko blisko srednio right
		if (blisko_s1 > 0 & blisko_s2 > 0 & mid_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, blisko_s2, mid_s3, ZbSteer[3][i]); //RIGHT
		
		//R3 blisko blisko daleko right
		if (blisko_s1 > 0 & blisko_s2 > 0 & daleko_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, blisko_s2, daleko_s3, ZbSteer[3][i]); //RIGHT
		
		//R4 blisko srednio blisko prosto
		if (blisko_s1 > 0 & mid_s2 > 0 & blisko_s3 > 0)
			YR[2][i] = Math.min(blisko_s1, mid_s2, blisko_s3, ZbSteer[2][i]); //MID
		
		//R5 blisko srednio srednio right
		if (blisko_s1 > 0 & mid_s2 > 0 & mid_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, mid_s2, mid_s3, ZbSteer[3][i]); //RIGHT
		
		//R6 blisko srednio daleko right
		if (blisko_s1 > 0 & mid_s2 > 0 & daleko_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, mid_s2, daleko_s3, ZbSteer[3][i]); //RIGHT
		
		//R7 blisko daleko blisko prosto
		if (blisko_s1 > 0 & daleko_s2 > 0 & blisko_s3 > 0)
			YR[2][i] = Math.min(blisko_s1, daleko_s2, blisko_s3, ZbSteer[2][i]); //MID
		
		//R8 blisko daleko srednio prosto
		if (blisko_s1 > 0 & daleko_s2 > 0 & mid_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, daleko_s2, mid_s3, ZbSteer[3][i]); //RIGHT
		//PATCH: MID -> RIGHT
		
		//R9 blisko daleko daleko prosto
		if (blisko_s1 > 0 & daleko_s2 > 0 & daleko_s3 > 0)
			YR[3][i] = Math.min(blisko_s1, daleko_s2, daleko_s3, ZbSteer[3][i]); //RIGHT
		//PATCH: MID -> RIGHT
		
		//R10 srednio blisko blisko left
		if (mid_s1 > 0 & blisko_s2 > 0 & blisko_s3 > 0)
			YR[1][i] = Math.min(mid_s1, blisko_s2, blisko_s3, ZbSteer[1][i]); //LEFT
		
		//R11 srednio blisko srednio left
		if (mid_s1 > 0 & blisko_s2 > 0 & mid_s3 > 0)
			YR[1][i] = Math.min(mid_s1, blisko_s2, mid_s3, ZbSteer[1][i]); //LEFT
		
		//R12 srednio blisko daleko right
		if (mid_s1 > 0 & blisko_s2 > 0 & daleko_s3 > 0)
			YR[3][i] = Math.min(mid_s1, blisko_s2, daleko_s3, ZbSteer[3][i]); //RIGHT
		
		//R13 srednio srednio blisko left
		if (mid_s1 > 0 & mid_s2 > 0 & blisko_s3 > 0)
			YR[1][i] = Math.min(mid_s1, mid_s2, blisko_s3, ZbSteer[1][i]); //LEFT
		
		//R14 srednio srednio srednio prosto
		if (mid_s1 > 0 & mid_s2 > 0 & mid_s3 > 0)
			YR[2][i] = Math.min(mid_s1, mid_s2, mid_s3, ZbSteer[2][i]); //MID
		
		//R15 srednio srednio daleko right
		if (mid_s1 > 0 & mid_s2 > 0 & daleko_s3 > 0)
			YR[3][i] = Math.min(mid_s1, mid_s2, daleko_s3, ZbSteer[3][i]); //RIGHT
		
		//R16 srednio daleko blisko left
		if (mid_s1 > 0 & daleko_s2 > 0 & blisko_s3 > 0)
			YR[1][i] = Math.min(mid_s1, daleko_s2, blisko_s3, ZbSteer[1][i]); //LEFT
		
		//R17 srednio daleko srednio prosto
		if (mid_s1 > 0 & daleko_s2 > 0 & mid_s3 > 0)
			YR[2][i] = Math.min(mid_s1, daleko_s2, mid_s3, ZbSteer[2][i]); //MID
		
		//R18 srednio daleko daleko prosto
		if (mid_s1 > 0 & daleko_s2 > 0 & daleko_s3 > 0)
			YR[3][i] = Math.min(mid_s1, daleko_s2, daleko_s3, ZbSteer[3][i]); //RIGHT
		//PATCH: MID -> RIGHT
		
		
		//R19 daleko blisko blisko left
		if (daleko_s1 > 0 & blisko_s2 > 0 & blisko_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, blisko_s2, blisko_s3, ZbSteer[1][i]); //LEFT
		
		//R20 daleko blisko srednio left
		if (daleko_s1 > 0 & blisko_s2 > 0 & mid_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, blisko_s2, mid_s3, ZbSteer[1][i]); //LEFT
		
		//R21 daleko blisko daleko left
		if (daleko_s1 > 0 & blisko_s2 > 0 & daleko_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, blisko_s2, daleko_s3, ZbSteer[1][i]); //LEFT
		
		//R22 daleko srednio blisko left
		if (daleko_s1 > 0 & mid_s2 > 0 & blisko_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, mid_s2, blisko_s3, ZbSteer[1][i]); //LEFT
		
		//R23 daleko srednio srednio left
		if (daleko_s1 > 0 & mid_s2 > 0 & mid_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, mid_s2, mid_s3, ZbSteer[1][i]); //LEFT
		
		//R24 daleko srednio daleko left
		if (daleko_s1 > 0 & mid_s2 > 0 & daleko_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, mid_s2, daleko_s3, ZbSteer[1][i]); //LEFT
		
		//R25 daleko  daleko blisko prosto
		if (daleko_s1 > 0 & daleko_s2 > 0 & blisko_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, daleko_s2, blisko_s3, ZbSteer[1][i]); //LEFT
		//PATCH: MID -> LEFT
		
		//R26 daleko daleko srednio prosto
		if (daleko_s1 > 0 & daleko_s2 > 0 & mid_s3 > 0)
			YR[1][i] = Math.min(daleko_s1, daleko_s2, mid_s3, ZbSteer[1][i]); //LEFT
		//PATCH: MID -> LEFT
		
		//R27 daleko daleko daleko prosto
		if (daleko_s1 > 0 & daleko_s2 > 0 & daleko_s3 > 0)
			YR[2][i] = Math.min(daleko_s1, daleko_s2, daleko_s3, ZbSteer[2][i]); //MID
			
	}
	
	for (i=0; i <= 100; i++){
		YR[4][i] = Math.max(YR[1][i], YR[2][i], YR[3][i]);
	}
	
	var a = 0;
	var b = 0;
	
	for (i=0; i <= 100; i++){
		a = a + YR[0][i] * YR[4][i];
		b = b + YR[4][i];
	}
	
	return a/b;
}

var preCompArray = [];


function preCompile() {
	for (iPre=0; iPre <= 50; iPre++){
		preCompArray[iPre] = [];
		for (jPre=0; jPre <= 50; jPre++){
			preCompArray[iPre][jPre] = [];
			for (kPre=0; kPre <= 50; kPre++){
				preCompArray[iPre][jPre][kPre] = Math.round(FuzzyController(iPre,jPre,kPre));
			}
		}
		console.clear();
		console.log(".".repeat(iPre));
	}
	console.log("done. pre-calculated "+Math.pow(preCompArray.length, 3)+" results");
}


var angle;

function start_ai(){
	
	controlls("ai", true, 0);
	
	aiIntervalId = setInterval(function(){
		
		//angle = Math.round(FuzzyController(Math.round(car_sensor("left").d), Math.round(car_sensor("front").d), Math.round(car_sensor("right").d)));
		
		angle = preCompArray[Math.round(car_sensor("left").d)][Math.round(car_sensor("front").d)][Math.round(car_sensor("right").d)];
		
		controlls("up", true);
		//console.log(Math.round(car_sensor("left").d)+":"+Math.round(car_sensor("front").d)+":"+Math.round(car_sensor("right").d)+":"+angle);
		
		if(angle == 50){
			controlls("right", false, 0);
			controlls("left", false, 0);
			//console.log("UP");
		}else if (angle < 50) {
			controlls("left", true, 180*((angle-50)/50));
			controlls("right", false, 0);
			//console.log("LEFT");
		}else if (angle > 50){
			controlls("right", true, 180*((angle-50)/50));
			controlls("left", false, 0);
			//console.log("RIGHT");
		}
		

		
	}, 8);
}

/*
controlls("right/left", true/false, angle)
controlls("up/down, true/false)
car_sensor("front")
car_sensor("left")
car_sensor("right")
range = 50


*/


function stop_ai(){
	clearInterval(aiIntervalId);
	controlls("left", false);
	controlls("right", false);
	controlls("up", false);
	controlls("down", false);
	controlls("space", false);
	controlls("ai", false);
}