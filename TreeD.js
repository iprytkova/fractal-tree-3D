var slider_size,
	slider_level,
	slider_branches,
	slider_angle1,
	slider_angle2,
	slider_angle3,
	slider_angle4;

var label_size,
	label_level,
	label_branches,
	label_angle1,
	label_angle2,
	label_angle3,
	label_angle4;
	
var div_inputs;

var	size, maxLevel, branches, angle1,angle2,angle3, angle4;
var prog = 1;
var button_rotate;	
var mouseX_,
	mouseY_,
	rotateX_ = 0,
	rotateY_ = 0,
	zoom = 2,
	doRotate = false;

function setup()
{	
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	
	slider_size = createSlider(0, 1, 0.5, 0.01);
	slider_size.position(10, 10);
	slider_level = createSlider(1, 12, 9, 1);
	slider_level.position(10, 30);
	slider_branches = createInput(branches);
	slider_branches.position(10, 50);
	slider_branches.style('width', '130px');
	slider_branches.style('height', '19px');
	slider_branches.style('border-radius','10px');
	slider_angle1 = createSlider(0, 180, 30, 1);
	slider_angle1.position(10, 70);
	slider_angle2 = createSlider(0, 180, 60, 1);
	slider_angle2.position(10, 90);
	slider_angle3 = createSlider(0, 180, 70, 1);
	slider_angle3.position(10, 110);
	slider_angle4 = createSlider(0, 180, 45, 1);
	slider_angle4.position(10, 130);

	slider_size.input(function(){readInputs(true)});
	slider_level.input(function(){readInputs(true)});
	slider_branches.input(function(){readInputs(true)});
	slider_angle1.input(function(){readInputs(true)});
	slider_angle2.input(function(){readInputs(true)});
	slider_angle3.input(function(){readInputs(true)});
	slider_angle4.input(function(){readInputs(true)});

	label_size = createSpan('Size');
	label_size.position(150, 10);
	label_level = createSpan('Max level');
	label_level.position(150, 30);
	label_branches = createSpan('Branches');
	label_branches.position(150, 50);
	label_angle1 = createSpan('Angle of first branch');
	label_angle1.position(150, 70);
	label_angle2 = createSpan('Angle of second branch');
	label_angle2.position(150, 90);
	label_angle3 = createSpan('Angle of third branch');
	label_angle3.position(150, 110);
	label_angle4 = createSpan('Angle of fourth branch');
	label_angle4.position(150, 130);
	div_inputs = createDiv('');
	
	mouseX_ = mouseX;
	mouseY_ = mouseY;
	mutate();
	readInputs(false);
	grow();
}

function mouseDragged()
{
	if ( mouseX < 330 && mouseY < 400 )
		return true;
	
	rotateX_ += (mouseY - mouseY_) / 500;
	rotateY_ += (mouseX - mouseX_) / 500;
	
	mouseX_ = mouseX;
	mouseY_ = mouseY;
	
	loop();
	
	return false;
}

function mouseMoved()
{
	mouseX_ = mouseX;
	mouseY_ = mouseY;
	
	if ( mouseX > 330 || mouseY > 400 )
		return false;
}
function mouseWheel(event)
{
	zoom *= (event.delta > 0 ? 1.1 : 1 / 1.1);
	loop();
	
	return false;
}

function readInputs()
{
	size = slider_size.value();
	maxLevel = slider_level.value();
	branches = slider_branches.value();
	angle1 = slider_angle1.value();
	angle2 = slider_angle2.value();
	angle3 = slider_angle3.value();
	angle4 = slider_angle4.value();
}

function mutate()
{
	var startTime = millis();
	readInputs(true);
	
	var diff = millis() - startTime;
	
	if ( diff < 20 )
		setTimeout(mutate, 20 - diff);
	else
		setTimeout(mutate, 1);
}

function draw()
{
	background(175);	
	
	scale(1, -1);
	
	translate(0, -height * (size+0.25), -zoom * height * size);
	
	rotate(-rotateX_, [1, 0, 0]);
	rotate(rotateY_, [0, 1, 0]);
	
	push();
	rotate(-PI/2, [1, 0, 0]);
	ambientMaterial(40, 114, 55);
	plane(1000, -1000);
	pop();
	
	ambientLight(20);
	pointLight(255, 255, 255, 1000, 1000, 1000);
	
	if ( doRotate )
		rotateY_ += 0.001;
	branch(1);

	noLoop();
}

function branch(level)
{
	if ( prog < level )
		return;
	
	var growthLevel = (prog - level > 1) || (prog >= maxLevel + 1) ? 1 : (prog - level);
	
	var width = 50 * size * Math.pow((maxLevel - level + 1) / maxLevel, 2);
	var len = growthLevel * size * height;
	
	translate(0, (len / level) / 2, 0);
	
	ambientMaterial(101, 67, 33);
	cylinder(width, len / level,8,4);
	
	translate(0, (len / level) / 2, 0);
	
		var a1 = angle1;
		var a2 = angle2;
		var a3 = angle3;
		var a3_1 = angle3+angle3/2;
		var a4 = angle4;
		var a4_2 = angle4 + 180;
		a1 = radians(a1);
		a2 = radians(a2);
		a3 = radians(a3);
		a4 = radians(a4);
		a3_1 = radians(a3_1);
		a4_2 = radians(a4_2);

	if ( level < maxLevel )
	{
		if(branches == 2){
			push();
			rotateX(a1);
			rotateY(-a1);
			branch(level + 1);
			pop();
		
			push();
			rotateX(-a2);
			rotateY(-a2);
			branch(level + 1);
			pop();

		} else if(branches == 3){
			push();
			rotateX(a1);
			rotateY(-a1);
			branch(level + 1);
			pop();
		
			push();
			rotateX(-a2);
			rotateY(-a2);
			branch(level + 1);
			pop();

			push();
			rotateX(a3);
			rotateY(-a3);
			rotateZ(a3_1);
			branch(level + 1);
			pop();

		}	else if(branches == 4 ){
			push();
			rotateX(a1);
			rotateY(-a1);
			branch(level + 1);
			pop();
		
			push();
			rotateX(-a2);
			rotateY(-a2);
			branch(level + 1);
			pop();

			push();
			rotateX(a3);
			rotateY(-a3);
			rotateZ(a3_1);
			branch(level + 1);
			pop();
		
			push();
			rotateX(a4_2);
			rotateY(-a4);
			rotateZ(a4_2);
			branch(level + 1);
			pop();
		} else{
			push();
			rotateX(a1);
			rotateY(-a1);
			branch(level + 1);
			pop();
		}
	}
	
	if ( level == maxLevel )
	{
		ambientMaterial(80, 200, 120);
		var flowerSize =  growthLevel * size * 50;
		ellipsoid(2,flowerSize,flowerSize/2 ,4);
	}
}

function grow()
{
	var startTime = millis();
	loop();
	var diff = millis() - startTime;

	prog += maxLevel / 8 *  20 / 1000;
	setTimeout(grow, Math.max(1, 20 - diff));
}