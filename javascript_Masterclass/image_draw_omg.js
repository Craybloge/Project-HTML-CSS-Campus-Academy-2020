
let imgToSample;
let points = [];
let res;
let cols;
let rows;

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
      
      points.push(createVector(x,y));
    }
  }
}

function draw() {
  // background(20);
  

  
  randomSeed(1000);
  
  imageMode(CENTER);
  rectMode(CENTER)
  noStroke();
  for(let i=0; i<points.length; i++){
    let vec= points[i];
    
    let perlinx= noise(vec.x*0.01, vec.y*0.01, millis()/1000);
    let perliny= noise(vec.x*0.01 + 500, vec.y*0.01 +500, millis()/1000);
    perlinx    = perlinx * 2 - 1;
    perliny    = perliny * 2 - 1;
    
    vec.x     += perlinx;
    vec.y     += perliny;
    
    let rgb    = imgToSample.get(vec.x, vec.y);
    
    push();
    translate(vec.x, vec.y);
    fill(rgb);
    ellipse(0,0, res*0.25,res*0.25);
    pop();
  }
  
}