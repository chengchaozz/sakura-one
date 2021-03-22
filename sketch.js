//111111
let  num = 900;
let c;
var particles_a = [];
var particles_b = [];
var particles_c = [];
let noiseScale = 100;
let noiseStrength = 1;
let x,y,px,py;
let force
let dis;
let gra;
let screenPosX,screenPosY
let colorPallete1=[]

//2222222
let renderer;
let backShader;
let vectorField;
let curTime = 0.0;
let g0,g1,g2,g3,g4,g5,g6,g7;
let gBlank,tintColorObj;
let g=[];
let x2,y2,px2,py2,dis2;
let gra1;
let screenPos2X,screenPos2Y

///////33333
let sh;
let grag,gra2;
let font;
let str = "Chengchao";
let dir;
let x3,y3;
let textColorObj,input,inputButton;
let tSize=50
let screenPos3X,screenPos3Y;

////scan
let video;
let scanColorButton=[]
let scanColorPallete=[]
let currentColor
let startButton

// common
let iphone
let screenWidth,screenHeight
let colorButton=[];
let buttonSize=25
let colors = [
	"#ffffff",
  "#ffbe0b",
  "#fb5607",
  "#ff006e",
  "#8338ec",
  "#3a86ff"
];
let bt11,bt12,bt13,bt14;
let currentBx,currentBy,clicked=false,clickIndex;
let start=false;

let screenshotB1,shot=false;


function preload () {
	backShader = loadShader('shader.vert', 'shader1.frag');
	g0=loadImage('g.png')
	g1=loadImage('g1.png')
	g2=loadImage('g2.png')
	g3=loadImage('g3.png')
	g4=loadImage('g4.png')
	g5=loadImage('g5.png')
	g6=loadImage('g6.png')
	g7=loadImage('g7.png')
	gBlank=loadImage('gblank.png')
	iphone=loadImage("iphone.png")
	font = loadFont("Ubuntu-Bold.ttf");
}
function setup() {
  screenWidth=(iphone.width-360)/2;
  screenHeight=(iphone.height-110)/2;
  createCanvas(window.innerWidth, window.innerHeight);
  //c.position(200,10)
	//c.clear()
	//console.log("screen",screenWidth,screenHeight)
  gra=createGraphics(screenWidth,screenHeight)
  gra1=createGraphics(screenWidth,screenHeight)
  gra.imageMode(CENTER)
  screenPosX=window.innerWidth/2-screenWidth/2
  screenPosY=window.innerHeight/2-screenHeight/2
  screenPos2X=window.innerWidth/2-1.5*screenWidth-100
  screenPos2Y=window.innerHeight/2-screenHeight/2-10
  screenPos3X=window.innerWidth/2+0.5*screenWidth+100
  screenPos3Y=window.innerHeight/2-screenHeight/2-10
	//createCanvas(windowWidth,windowHeight);
  noStroke();
  pixelDensity(1.0);
  g=[g2,g3,g4,g5,g6,g7]
  vectorField = new VectorField(300, backShader);
  for (let i=0; i<num; i++) {
    let loc_a = createVector(random(width*2.9), random(height), 5);
    let angle_a = random(TWO_PI);
    let dir_a = createVector(cos(angle_a), sin(angle_a));
		let loc_b = createVector(random(width*2.9), random(height), 5);
    let angle_b = random(TWO_PI/2);
    let dir_b = createVector(cos(angle_b), sin(angle_b));
		let loc_c = createVector(random(width*2.9), random(height), 5);
    let angle_c = random(TWO_PI);
	let dir_c = createVector(cos(angle_c), sin(angle_c));
    let speed = random(3.3, 1.8);
    //particles[i]= new Particle(loc, dir, speed);
		particles_a[i] = new Particle(loc_a, dir_a, speed);
		particles_b[i] = new Particle(loc_b, dir_b, speed);
		particles_c[i] = new Particle(loc_c, dir_c, speed);
  }

  //333333
  gra2=createGraphics(screenWidth, screenHeight,WEBGL);
	//cnv.position(windowWidth/2-width/2)
	screenPos3X=width/2-iphone.width/2+180+iphone.width-180;
	screenPos3Y=height/2-iphone.height/2+30
	grag = createGraphics(width,height);
	grag.noStroke();
	grag.fill(255);
	grag.textFont(font);
	//gra.textStyle(BOLD)
	
	grag.textSize(tSize);
	const tw = grag.textWidth(str);
	tSize = tSize/tw * grag.width;
	//console.log(grag.width,screenWidth)
	grag.textSize(tSize);
	grag.textAlign(LEFT,TOP);
	//gra2=createGraphics(1000,1000)
	//shader
	sh = gra2.createShader(vert,frag);
	gra2.shader(sh);
	sh.setUniform("u_resolution", [screenWidth*pixelDensity(),screenHeight*pixelDensity()]);
	sh.setUniform("u_tex", grag);
	noStroke();	
	input = createInput();
	inputButton=createButton('APPLY')
	inputButton.position(screenPos3X+screenWidth-160+50, screenPos3Y+80/2)
	inputButton.size(60,30)
	inputButton.style('background-color', 'rgba(0, 0, 0, 0.5)')
	inputButton.style('color', 'white')
	inputButton.style('border-radius', '12px')
	inputButton.style('border-color', 'white')
	inputButton.style('border', 'none')
	inputButton.style('font-size', '12px')
	inputButton.style('font-family', 'Helvetica')
	inputButton.style('cursor', 'pointer')
	inputButton.hide()
	input.position(screenPos3X+30, screenPos3Y+80);
	input.size(screenWidth-160,50)
	input.style('background-color', color(0,200))
	input.style('border', 'none')
	input.style('color', 'white')
	input.style('font-size', '15px')
	input.hide();
	// buttons
			  // screenshot
			  screenshotB1=createButton('')
			  screenshotB1.position(width/2,height/2)
			  screenshotB1.size(100,50)
			  screenshotB1.hide()
	// testButton=createButton('');
	// testButton.addClass('button')
	// testButton.style('border-radius', '100%')
	// testButton.style('border', 'none')
	// testButton.style('background-color', 'rgb(120,120,120)')
	// testButton.size(buttonSize,buttonSize);

	//0-6
	colorButton.push(new Colorbuttons(screenPosX+screenWidth-70,screenPosY+screenHeight-100,buttonSize,color(250,203,173)))
	colorButton.push(new Colorbuttons(screenPosX+screenWidth-140,screenPosY+screenHeight-100,buttonSize,color(223,241,230)))
	colorButton.push(new Colorbuttons(screenPosX+screenWidth-210,screenPosY+screenHeight-100,buttonSize,color(246,206,225)))
	colorButton.push(new Colorbuttons(screenPosX+screenWidth-280,screenPosY+screenHeight-100,buttonSize,color(251,250,212)))
	colorButton.push(new Colorbuttons(screenPosX+70,screenPosY+screenHeight-100,buttonSize,color(250,203,173)))
	colorButton.push(new Colorbuttons(screenPosX+140,screenPosY+screenHeight-100,buttonSize,color(223,241,230)))
	colorButton.push(new Colorbuttons(screenPosX+210,screenPosY+screenHeight-100,buttonSize,color(246,206,225)))
	colorPallete1.push(colorButton[0])
	colorPallete1.push(colorButton[1])
	colorPallete1.push(colorButton[2])
  //7-13
	colorButton.push(new Colorbuttons(screenPos2X+screenWidth-70,screenPos2Y+screenHeight-100,buttonSize,color(250,203,173)))
	colorButton.push(new Colorbuttons(screenPos2X+screenWidth-140,screenPos2Y+screenHeight-100,buttonSize,color(223,241,230)))
	colorButton.push(new Colorbuttons(screenPos2X+screenWidth-210,screenPos2Y+screenHeight-100,buttonSize,color(246,206,225)))
	colorButton.push(new Colorbuttons(screenPos2X+screenWidth-280,screenPos2Y+screenHeight-100,buttonSize,color(251,250,212)))
	colorButton.push(new Colorbuttons(screenPos2X+70,screenPos2Y+screenHeight-100,buttonSize,color(250,203,173)))
	colorButton.push(new Colorbuttons(screenPos2X+140,screenPos2Y+screenHeight-100,buttonSize,color(223,241,230)))
	colorButton.push(new Colorbuttons(screenPos2X+210,screenPos2Y+screenHeight-100,buttonSize,color(246,206,225)))
	tintColorObj=colorButton[7]
  //14-20
	colorButton.push(new Colorbuttons(screenPos3X+screenWidth-70,screenPos3Y+screenHeight-100,buttonSize,color(250,203,173)))
	colorButton.push(new Colorbuttons(screenPos3X+screenWidth-140,screenPos3Y+screenHeight-100,buttonSize,color(223,241,230)))
	colorButton.push(new Colorbuttons(screenPos3X+screenWidth-210,screenPos3Y+screenHeight-100,buttonSize,color(246,206,225)))
	colorButton.push(new Colorbuttons(screenPos3X+screenWidth-280,screenPos3Y+screenHeight-100,buttonSize,color(251,250,212)))
	colorButton.push(new Colorbuttons(screenPos3X+70,screenPos3Y+screenHeight-100,buttonSize,color(250,203,173)))
	colorButton.push(new Colorbuttons(screenPos3X+140,screenPos3Y+screenHeight-100,buttonSize,color(223,241,230)))
	colorButton.push(new Colorbuttons(screenPos3X+210,screenPos3Y+screenHeight-100,buttonSize,color(246,206,225)))
	textColorObj=colorButton[15]


  	//console.log(colorButton)
	/////scan
	video=createCapture(VIDEO)
    video.hide()
 //console.log(video.width,video.height)

 //video.size(video.width*screenHeight/video.height,screenHeight)
 
 scanColorButton.push(new Colorbuttons(screenPosX+70/2,screenPosY+screenHeight-100/2,buttonSize,color(200)))
 scanColorButton.push(new Colorbuttons(screenPosX+140/2,screenPosY+screenHeight-100/2,buttonSize,color(200)))
 scanColorButton.push(new Colorbuttons(screenPosX+210/2,screenPosY+screenHeight-100/2,buttonSize,color(200)))
 scanColorPallete.push(color(250))
 scanColorPallete.push(color(250))
 scanColorPallete.push(color(250))
 startButton=createButton('Done')
 startButton.size(100/1.8,50/1.8)
 startButton.position(screenPosX+screenWidth-140/2,screenPosY+screenHeight-125/2)
 startButton.style('border-radius', '12px')
 startButton.style('background-color', 'rgba(255, 255, 255, 0.2)')
 startButton.style('color', 'white')
 startButton.style('border-color', 'white')
 startButton.style('border', 'none')
 startButton.style('font-family', 'Helvetica')
 startButton.style('font-size', '12px')
 startButton.style('cursor', 'pointer')
  
}

function draw() {
	background(255);
	smooth();
	resizeCanvas(window.innerWidth, window.innerHeight);
	screenPosX=window.innerWidth/2-screenWidth/2
	screenPosY=window.innerHeight/2-screenHeight/2-10
  screenPos2X=window.innerWidth/2-1.5*screenWidth-100
  screenPos2Y=window.innerHeight/2-screenHeight/2-10
  screenPos3X=window.innerWidth/2+0.5*screenWidth+100
  screenPos3Y=window.innerHeight/2-screenHeight/2-10
	//console.log(mouseX,mouseY)
	input.position(screenPos3X+30/2, screenPos3Y+80/2);
	input.size(screenWidth-100,30)
	inputButton.position(screenPos3X+screenWidth-75, screenPos3Y+40)
	
	scanColorButton[0].x=screenPosX+70/2;
	scanColorButton[0].y=screenPosY+screenHeight-100/2;
	scanColorButton[1].x=screenPosX+140/2;
	scanColorButton[1].y=screenPosY+screenHeight-100/2;
	scanColorButton[2].x=screenPosX+210/2;
	scanColorButton[2].y=screenPosY+screenHeight-100/2;
	startButton.position(screenPosX+screenWidth-140/2,screenPosY+screenHeight-125/2)
	
	colorButton[4].x=screenPosX+70/2;
	colorButton[4].y=screenPosY+screenHeight-100/2;
	colorButton[5].x=screenPosX+140/2;
	colorButton[5].y=screenPosY+screenHeight-100/2;
	colorButton[6].x=screenPosX+210/2;
	colorButton[6].y=screenPosY+screenHeight-100/2;
	colorButton[0].x=screenPosX+screenWidth-70/2;
	colorButton[0].y=screenPosY+screenHeight-100/2;
	colorButton[1].x=screenPosX+screenWidth-140/2;
	colorButton[1].y=screenPosY+screenHeight-100/2;
	colorButton[2].x=screenPosX+screenWidth-210/2;
	colorButton[2].y=screenPosY+screenHeight-100/2;
	colorButton[3].x=screenPosX+screenWidth-280/2;
	colorButton[3].y=screenPosY+screenHeight-100/2;


	colorButton[11].x=screenPos2X+70/2;
	colorButton[11].y=screenPos2Y+screenHeight-100/2;
	colorButton[12].x=screenPos2X+140/2;
	colorButton[12].y=screenPos2Y+screenHeight-100/2;
	colorButton[13].x=screenPos2X+210/2;
	colorButton[13].y=screenPos2Y+screenHeight-100/2;
	colorButton[7].x=screenPos2X+screenWidth-70/2;
	colorButton[7].y=screenPos2Y+screenHeight-100/2;
	colorButton[8].x=screenPos2X+screenWidth-140/2;
	colorButton[8].y=screenPos2Y+screenHeight-100/2;
	colorButton[9].x=screenPos2X+screenWidth-210/2;
	colorButton[9].y=screenPos2Y+screenHeight-100/2;
	colorButton[10].x=screenPos2X+screenWidth-280/2;
	colorButton[10].y=screenPos2Y+screenHeight-100/2;

	colorButton[18].x=screenPos3X+70/2;
	colorButton[18].y=screenPos3Y+screenHeight-100/2;
	colorButton[19].x=screenPos3X+140/2;
	colorButton[19].y=screenPos3Y+screenHeight-100/2;
	colorButton[20].x=screenPos3X+210/2;
	colorButton[20].y=screenPos3Y+screenHeight-100/2;
	colorButton[14].x=screenPos3X+screenWidth-70/2;
	colorButton[14].y=screenPos3Y+screenHeight-100/2;
	colorButton[15].x=screenPos3X+screenWidth-140/2;
	colorButton[15].y=screenPos3Y+screenHeight-100/2;
	colorButton[16].x=screenPos3X+screenWidth-210/2;
	colorButton[16].y=screenPos3Y+screenHeight-100/2;
	colorButton[17].x=screenPos3X+screenWidth-280/2;
	colorButton[17].y=screenPos3Y+screenHeight-100/2;

	if(!start){
		
  imageMode(CORNER)
  //image(video,0,0)
  //copy(video,int(video.width/2-screenWidth/2),0,int(screenWidth*video.height/screenHeight),video.height,int(screenPosX),int(screenPosY),int(screenWidth),int(screenHeight))
  copy(video,50,0,int(screenWidth),int(video.height),int(screenPosX),int(screenPosY), int(screenWidth),int(screenHeight))
  currentColor = get(mouseX, mouseY);
  fill(currentColor);
  noStroke();
  ellipse(mouseX, mouseY, 50/2, 50/2);
  imageMode(CENTER)
  //image(video,width/2,height/2-25,video.width*screenHeight/video.height,screenHeight)
  image(iphone,window.innerWidth/2,window.innerHeight/2,iphone.width/2,iphone.height/2)
  noStroke()
  for(let i=0;i<scanColorPallete.length;i++){
	scanColorButton[i].col=scanColorPallete[i]
	scanColorButton[i].show();
}

startButton.mousePressed(()=>{
	colorButton[4].col=color(scanColorPallete[0])
	colorButton[5].col=color(scanColorPallete[1])
	colorButton[6].col=color(scanColorPallete[2])

	colorButton[11].col=scanColorPallete[0]
	colorButton[12].col=scanColorPallete[1]
	colorButton[13].col=scanColorPallete[2]

	colorButton[18].col=scanColorPallete[0]
	colorButton[19].col=scanColorPallete[1]
	colorButton[20].col=scanColorPallete[2]
	start=true
})

	}else{
		input.show();
		startButton.hide()
	if(mouseX> width/2-screenWidth/2 && mouseX<width/2+screenWidth/2){
	 x=mouseX-screenPosX;
	 y=mouseY-screenPosY;
	}

	
  
  
    gra.fill(0, 15);
    gra.noStroke();
    gra.rect(0, 0, width, height);
	force=createVector(x-(screenWidth/2),y-screenHeight/2)
	//console.log(force)
	force.mult(200.9)
	dis=dist(x,y,gra.width/2,gra.height/2)
	noiseScale=map(dis,0,300,90,900);
	let pfade =map(dis,0,300,10,100)
if(shot){
	gra.noLoop()
}
  for (let i=0; i<num; i++) {
		var radius = map(i,0,num,10,1);
		var fade = map(i,0,num,0,250);
		//fade =30
		fade=pfade
		
		gra.fill(colorPallete1[0].col.levels[0],colorPallete1[0].col.levels[1],colorPallete1[0].col.levels[2], fade);
		particles_a[i].move();
		particles_a[i].applyForce(force);
		particles_a[i].update();
		particles_a[i].display(radius);
		particles_a[i].checkEdges();


		gra.fill(colorPallete1[1].col.levels[0],colorPallete1[1].col.levels[1],colorPallete1[1].col.levels[2], fade);
		particles_b[i].move();
		particles_b[i].applyForce(force);
		particles_b[i].update();
		particles_b[i].display(radius);
		particles_b[i].checkEdges();

		gra.fill(colorPallete1[2].col.levels[0],colorPallete1[2].col.levels[1],colorPallete1[2].col.levels[2], fade);
		particles_c[i].move();
		particles_c[i].applyForce(force);
		particles_c[i].update();
		particles_c[i].display(radius);
		particles_c[i].checkEdges();
  }

  imageMode(CORNER)
  image(gra,screenPosX,screenPosY)
  imageMode(CENTER)
  image(iphone,window.innerWidth/2,window.innerHeight/2,iphone.width/2,iphone.height/2)

  //2222222
  curTime += deltaTime * 0.001;
  
//   x2=mouseX-(width/2-screenWidth/2);
//   y2=mouseY-(height/2-screenHeight/2);
x2=mouseX-screenPos2X;
y2=mouseY-screenPos2Y;
  //console.log(x2,y2)
  dis2=dist(x2,y2,px2,py2);
  vectorField.update(tintColorObj.col);
  vectorField.draw();

  px2=x2;
  py2=y2;
  
  imageMode(CORNER)
  image(gra1,screenPos2X,screenPos2Y)
  imageMode(CENTER)
  image(iphone,window.innerWidth/2-screenWidth-100,window.innerHeight/2,iphone.width/2,iphone.height/2)

  //333333333
  
	grag.background(0);
	tSize = 50;
	grag.textSize(tSize);
	const tw = grag.textWidth(str);
	tSize = tSize/tw * grag.width;
	//console.log(grag.width,screenWidth)
	grag.textSize(tSize);
	grag.textAlign(LEFT,TOP);
	x3=mouseX-screenPos3X
	if(x3>0 && x3<=screenWidth){
		sh.setUniform("u_mouse",[x3,mouseY])
	}
	
	sh.setUniform("u_canvas",[width,height])
	
	 tSize = grag.textSize();
	const lineHeight = tSize * 1;
	const lineWidth = grag.textWidth(str) ;
	const cycleX = 120;
	const cycleY = 50;
	const frameRatioX = (frameCount % cycleX) / cycleX;
	const frameRatioY = (frameCount % cycleY) / cycleY;

	let offX = frameRatioX * lineWidth;
	let offY = frameRatioY * lineHeight;
	grag.fill(textColorObj.col)
	for(let y = -tSize; y < grag.height + tSize; y += lineHeight){
		for(let x = -10*tSize; x < grag.width + tSize; x += lineWidth){
			if (dir==0){
				grag.text(str,x+offX,y);
			}else{
				grag.text(str,0,y+offY);
			}
				
			
			}
				
	}
	
	//console.log(mouseX,mouseY)
	// let offX = frameRatio * lineWidth;
	// for(let x = -10*tSize; x < gra.width + tSize; x += lineWidth){
	// 	gra.text(str,x+offX,0);	
	// 	gra.text(str,x+offX,lineHeight);
	// 	gra.text(str,x+offX,lineHeight*2);	
	// 	gra.text(str,x+offX,lineHeight*3);	
	// 	gra.text(str,x+offX,lineHeight*4);
	// }
	sh.setUniform("u_time", millis()/1000);
	gra2.rect(-width/2,-height/2,width,height);
	imageMode(CORNER)
	image(gra2,screenPos3X,screenPos3Y)
	imageMode(CENTER)
	image(iphone, window.innerWidth/2+screenWidth+100,window.innerHeight/2, iphone.width/2,iphone.height/2)


	// TOP layer
	if (mouseIsPressed){
		fill(200)
		noStroke()
	}else{
		noFill();
		stroke(200)
		strokeWeight(2)
	}
	
	ellipse(mouseX,mouseY,25,25)
	stroke(20)
	strokeWeight(1)
	//testButton.position(screenPosX+100,screenPosY+screenHeight-100);
	// bt11=ellipse(screenPosX+screenWidth-50,screenPosY+screenHeight-100,buttonSize)
	// bt12=ellipse(screenPosX+screenWidth-50,screenPosY+screenHeight-170,buttonSize)
	// bt13=ellipse(screenPosX+screenWidth-50,screenPosY+screenHeight-240,buttonSize)
	// bt14=ellipse(screenPosX+screenWidth-50,screenPosY+screenHeight-310,buttonSize)
	cursor(ARROW)
	for(let i=0;i<colorButton.length;i++){
		colorButton[i].show();
		
		colorButton[i].cursorChange(mouseX,mouseY)
	}
	for(let i=0;i<colorPallete1.length;i++){
		push()
		stroke(255)
		strokeWeight(4)
		noFill();
		ellipse(colorPallete1[i].x,colorPallete1[i].y,colorPallete1[i].r)
		pop()
	}

	//Top layer for 222
	    push()
		stroke(255)
		strokeWeight(4)
		noFill();
		ellipse(tintColorObj.x,tintColorObj.y,tintColorObj.r)
		pop()

	//Top layer for 333
	push()
	stroke(255)
	strokeWeight(4)
	noFill();
	ellipse(textColorObj.x,textColorObj.y,textColorObj.r)
	pop()
	inputButton.show()
	inputButton.mousePressed(changeText)


	//top layer for screenshot
	//screenshotB1.show()
	//screenshotB1.mousePressed(shotshot)
}
	
}
function shotshot(){
	console.log('shot')
	shot=true
}
function changeText(){
	str=input.value()
}



function mousePressed() {
	px=mouseX;
	py=mouseY;
	//console.log(mouseX,mouseY)


	//2222222
  vectorField.splatterrad = random(300, 600);
  vectorField.splatterpos = createVector(random() * width, random() * height, 0);
  vectorField.splattercol = color(colors[floor(random(0, colors.length))]);
  vectorField.gimage=gBlank
  vectorField.drawBrush=true;
  //33333
  sh.setUniform("pu_mouse",[mouseX,mouseY])
  if(x3>0 && x3<=screenWidth){
	  //console.log('333')
  if( mouseY-windowHeight/2<=0){
		dir=0;
	}else{dir=1}
	}else{dir=1}

	
  }


  function mouseReleased() {
	  if(!start){
		if(mouseX>=screenPosX &&mouseX<=screenPosX+screenWidth &&mouseY>=screenPosY&&mouseY<=screenPosY+screenHeight){
			scanColorPallete.push(currentColor)
			scanColorPallete.shift()
			}
	  }else{
	x=mouseX-(width/2-iphone.width/2+180);
	y=mouseY-(height/2-iphone.height/2+50);
	force=createVector(x-px,y-py)
	vectorField.drawBrush=false;
	// button
	for(let i=0;i<colorButton.length;i++){
		colorButton[i].clicked(mouseX,mouseY)
	}
	if(clicked){
		for(let i=0;i<colorButton.length;i++){
			if(colorButton[i].x===currentBx&&colorButton[i].y===currentBy){
				clickIndex=i
				console.log('index',clickIndex)
			}
		}
		clicked=false
		if(clickIndex<=6 &&clickIndex>=0){
			if (colorPallete1.some(e => e.col === colorButton[clickIndex].col)) {
				console.log('color repeated')
		}else{
			colorPallete1.push(colorButton[clickIndex])
			colorPallete1.shift()
			console.log('new color', colorButton[clickIndex].col, colorPallete1)
			
		}
	}
	if(clickIndex<=13 &&clickIndex>=7){
		tintColorObj=colorButton[clickIndex]
		
	}
	if(clickIndex<=20 &&clickIndex>=14){
		textColorObj=colorButton[clickIndex]
		
	}
	}
    }
  }










//******
class Colorbuttons{
	constructor(x_, y_,r_,col_){
		this.x=x_;
		this.y=y_;
		this.r=r_;
		this.col=col_

	}
	show(){
		fill(this.col)
		noStroke();
		ellipse(this.x,this.y,this.r)
	}
	clicked(mX,mY){
		let dis=dist(mX,mY,this.x,this.y);
		if(dis<=this.r){
			currentBx=this.x;
			currentBy=this.y;
			clicked=true;
			console.log(currentBx,currentBy,clicked)
			//cursor(POINTER)
		}
	}
	cursorChange(mX,mY){
		let dis=dist(mX,mY,this.x,this.y);
		if(dis<=this.r){
			cursor(HAND)
		}
	}
}


let Particle = function(loc_, dir_, speed_) {
  this.loc = loc_;
	this.dir = dir_;
	this.speed = speed_;
	this.d = 1;
	this.col;
	this.angle;
	this.vel;
	this.acc=createVector(0,0);
	this.maxspeed=2;
};

Particle.prototype.update = function() {
	this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.loc.add(this.vel);
    this.acc.mult(0);
};

// Method to move position
Particle.prototype.move = function(){
	this.angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength;
    this.dir.x = cos(this.angle)+sin(this.angle)-sin(this.angle);
    this.dir.y = sin(this.angle)-cos(this.angle)*sin(this.angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed*this.d);
    this.loc.add(this.vel);
};

// Method to chech edges 
Particle.prototype.checkEdges = function(){
 if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {    
      this.loc.x = random(width*9.2);
      this.loc.y = random(height);
    }
};
Particle.prototype.applyForce = function(force) {
    this.acc.add(force);
  }


// Method to update position
Particle.prototype.display = function(r){
	
   gra.ellipse(this.loc.x, this.loc.y, r);
};



// 2222222222
class VectorField{
	constructor(totalNum, canvasShader){
	  this.canvasShader = canvasShader;
	  this.drawPG = createGraphics(width,height);
	  this.shaderPG = createGraphics(width,height, WEBGL);
	  this.totalNum = totalNum;
	  this.positions = [];
	  this.directions = [];
	  this.scale = 0.002;
	  this.shiftx = 45253.534;
	  this.shifty = 63424.234;
	  this.speed = 0.4;
	  this.splatterframe = 80.0;
	  this.splattertime = 20.0;
	  this.positionArray = [];
	  this.showVectors = false;
	  this.drawBrush=false;
	  this.splatterrad = 0;
	  this.splatterpos = createVector();
	  this.splattercol = color(255);
	  this.gimage=g[0];
	  this.size=200;
  
	  let w = width / (width + height);
	  let h = height / (width + height);
	  
	  let stepnum = sqrt(totalNum / (w * h));
	  let wn = floor(stepnum * w);
	  let hn = floor(stepnum * h);
  
	  let mwidth = floor(width / wn) * wn;
	  let mheight = floor(height / hn) * hn;
  
	  for(let i=0; i<wn; i++){
		for(let n=0; n<hn; n++){
		  let x = i / (wn - 1) * mwidth;
		  let y = n / (hn - 1) * mheight;
  
		  this.positions.push(createVector(x, y));
		  this.positionArray.push(x, y);
		  
		  let dirx = noise(x * this.scale, y * this.scale, curTime * this.speed)-0.5;
		  let diry = noise(x * this.scale + this.shiftx, y * this.scale + this.shifty, curTime * this.speed)-0.5;
		  let dir = createVector(dirx, diry, 0);
		  dir.normalize();
		  this.directions.push(dir); 
		}
	  }
	}
  
	update(col){
	  this.drawPG.image(this.shaderPG, 0,0);
	  let directionArray = [];
	  for(let i=0; i<this.directions.length; i++){
		let pos = this.positions[i];
		let dirx = noise(pos.x * this.scale, pos.y * this.scale, curTime * this.speed)-0.5;
		let diry = noise(pos.x * this.scale + this.shiftx, pos.y * this.scale + this.shifty, curTime* this.speed)-0.5;
		let dir = createVector(dirx, diry, 0);
		dir.normalize();
		this.directions[i] = dir;
		directionArray.push(dir.x, dir.y);
	  }
  
	  
	  // if(frameCount % this.splatterframe == 0){
	  //   this.splatterrad = random(300, 600);
	  //   this.splatterpos = createVector(random() * width, random() * height, 0);
	  //   this.splattercol = color(colors[floor(random(1, colors.length))]);
	  //   this.gimage=g[floor(random(0,g.length))]
	  // }else if(frameCount % this.splatterframe < this.splattertime){
		//let t = pow(map(frameCount % this.splatterframe, 0, this.splattertime, 0.0, 1.0), 0.5);
		this.drawPG.noStroke();
		this.drawPG.fill(this.splattercol);
		//let rad = this.splatterrad * t;
		//this.drawPG.ellipse(this.splatterpos.x, this.splatterpos.y, rad, rad);
		//console.log(this.splattercol)
		if(this.drawBrush){
		this.size=map(dis2,0,150,50,150)
		
		this.drawPG.push()
		this.drawPG.tint(col);
		
		this.drawPG.image(this.gimage,x2-this.size/2, y2-this.size/2, this.size, this.size);
		//this.drawPG.image(this.gimage,mouseX-this.size/2, mouseY-this.size/2, this.size, this.size);
		//this.drawPG.ellipse(mouseX-100, mouseY-100, 200, 200);
		this.drawPG.pop()
		}
	  //}
  
  
  
	  this.canvasShader.setUniform("u_positions", this.positionArray);
	  this.canvasShader.setUniform("u_directions", directionArray);
	  this.canvasShader.setUniform("u_time", curTime);
	  this.canvasShader.setUniform("u_resolution", [width , height]);
	  this.canvasShader.setUniform("u_colbuffer", this.drawPG);
	  this.canvasShader.setUniform("u_backcol", color(colors[0])._array);
	  this.canvasShader.setUniform("u_ptnum", this.positionArray.length);
	  this.canvasShader.setUniform("u_speed", 3.0);
  
	  this.shaderPG.shader(this.canvasShader);
	  this.shaderPG.quad(-1, -1, 1, -1, 1, 1, -1, 1);
	}
  
	draw(){
  
	  gra1.image(this.shaderPG, 0, 0);
  
  
	  
	}
  }
  

