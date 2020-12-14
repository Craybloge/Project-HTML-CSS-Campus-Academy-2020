let imgToSample;
let points  = [];
let opoints = []
let res;
let cols;
let rows;
let zoff    = [];

function preload(){
  imgToSample  = loadImage("sunflower.jpg");
}

function setup() {
  createCanvas(imgToSample.width, imgToSample.height);
  
  res   = 20;
  cols  = width / res;
  rows  = height / res;
  
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      let x = c * res + res * 0.5;
      let y = r * res + res * 0.5;
      
      let randx = random(-1, 1) * res * 0.5;
      let randy = random(-1, 1) * res * 0.5;
      
      x += randx;
      y += randy;
      
      points.push(createVector(x, y));
      opoints.push(createVector(x, y));
      zoff.push(0);//random(0, 1000))
    }
  }
  
}

function draw() {
  //background(20);
  
  imageMode(CENTER);
  rectMode(CENTER)
  noStroke();
  for(let i=0; i<points.length; i++){
    let vec   = points[i];
    let ovec  = opoints[i];
    
    let perlinx = noise(vec.x * 0.01, vec.y * 0.01, zoff[i]);
    let perliny = noise(vec.x * 0.01 + 500.0, vec.y * 0.01 + 500, zoff[i]);
    let perlins = noise(vec.x * 0.01 + 250.0, vec.y * 0.01 + 500, millis()*0.01);
    perlinx     = perlinx * 2.0 - 1.0;
    perliny     = perliny * 2.0 - 1.0;
    
    let prev    = vec.copy();
    vec.x       += perlinx;
    vec.y       += perliny;
    
    let angle   = atan2(vec.y - prev.y, vec.x - prev.x);
  
    let rgb     = imgToSample.get(ovec.x, ovec.y);
    
    if(vec.x < 0 || vec.x > width || vec.y < 0 || vec.y > height){
      vec.x       = random(0, width);
      vec.y       = random(0, height);
      opoints[i]  = vec.copy();
      // zoff[i]     = random(0, 1000);
    }
    
    
    push();
    translate(vec.x, vec.y);
    rotate(angle)
    fill(rgb)
    rect(0, 0, res * 0.5, res * 0.25*perlins*2);
    pop();
  }
  
  // noLoop();
}