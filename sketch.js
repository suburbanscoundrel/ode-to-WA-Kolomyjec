// Liz Li
// An Ode To W. A. Kolomyjec
// Made for DMA173: Generative Online Art at UCLA

let rectW = 15;
let isPressed = false;
let resetButton = false;
let blockies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create array of blocks
  for (let i = 100; i < width - 100; i += 20){
    for (let j = 100; j < height - 100; j += 20) {
      let b = new Blockie((rectW/2 + 2) + (1 * i), (rectW/2 + 2) + (1 * j), rectW);
      blockies.push(b);
    } 
  }
}

function draw() {
  // show blocks
  background(250, 20);
  for (let i = 0; i < blockies.length; i++) {
    blockies[i].move();
    blockies[i].show();
  }

  // reset blocks
  if (resetButton === true) {
    isPressed = false;
    resetButton = false;
    background (250, 100);
    blockies = [];
    for (let i = 100; i < width - 100; i += 20){
      for (let j = 100; j < height - 100; j += 20) {
        let b = new Blockie((rectW/2 + 2) + (1 * i), (rectW/2 + 2) + (1 * j), rectW);
        blockies.push(b);
      } 
    }
    for (let i = 0; i < blockies.length; i++) {
      blockies[i].move();
      blockies[i].show();
    }
  }
}

// trigger moving shapes on mouse click
function mouseClicked() {
  if (isPressed === false) {
    isPressed = true;
  } else if (isPressed === true) {
    isPressed = false;
  }
}

// trigger reset blocks with any key
function keyPressed() {
  if (resetButton === false) {
    resetButton = true;
  }
}

// class for blocks
class Blockie {
  constructor(x, y, rectW){
    this.x = x;
    this.y = y;
    this.xSpeed = random(-2.5, 2.5);
    this.ySpeed = random(-2.5, 2.5);
    this.deg = 0;
    this.rectW = rectW;
    this.clickDist = random(25, 150);
    this.speedCap = 0.01;
    this.outlineC = color(75, 75, 75);
  }

  // function for moving blocks
  move() {
    // movement if the mouse is pressed or near the block
    let d = dist(mouseX, mouseY, this.x, this.y)
    if (isPressed === true & d < this.clickDist) {
      // bounce if block hits wall
      if (this.x < 0 || this.x > width) {
        this.xSpeed *= -1;
      }
      if (this.y < 0 || this.y > height) {
        this.ySpeed *= -1;
      }

      // slow down the blocks moving in y direction
      if (this.ySpeed > this.speedCap) {
        this.ySpeed -= 0.005;
        this.outlineC = color(random(0, 255), random(0, 255), random(0, 255));
      }
      if (this.ySpeed < -this.speedCap) {
        this.ySpeed += 0.005;
        this.outlineC = color(random(0, 255), random(0, 255), random(0, 255));
      }
      // block stop moving in y direction
      if (this.ySpeed > -this.speedCap && this.ySpeed < this.speedCap) {
        this.ySpeed = 0;
        this.outlineC = this.outlineC;
      }

      // slow down the blocks moving in x direction
      if (this.xSpeed > this.speedCap) {
        this.xSpeed -= 0.01;
        this.outlineC = color(random(0, 255), random(0, 255), random(0, 255));
      }
      if (this.xSpeed < -this.speedCap) {
        this.xSpeed += 0.01;
        this.outlineC = color(random(0, 255), random(0, 255), random(0, 255));
      }
      // block stop moving in x direction
      if (this.xSpeed > -this.speedCap && this.xSpeed < this.speedCap) {
        this.xSpeed = 0;
        this.outlineC = this.outlineC;
      }

      // block moving forward
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.deg = this.deg + 1;
    } else if (isPressed === false) {
      noFill();
      // stop moving if mouse is not near block
      this.x = this.x;
      this.y = this.y;
      this.deg = this.deg;
      this.outlineC = this.outlineC;
    }
  }

  // function for drawing the blocks
  show() {
    rectMode(CENTER);
    // blendMode(MULTIPLY);
    noFill();
    strokeWeight(1.01);
    stroke(this.outlineC);
    rect(this.x, this.y, this.rectW, this.rectW, 2);
  }

}