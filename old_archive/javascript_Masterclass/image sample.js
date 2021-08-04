let brush;
let imgToSample;

function preload(){
  brush        = loadImage("brush.png");
  imgToSample  = loadImage("sunflower.jpg");
}

function setup() {
  createCanvas(imgToSample.width, imgToSample.height);
}

function draw() {
  background(20);
  
  let res   = 20;
  let cols  = width / res;
  let rows  = height / res;
  
  randomSeed(1000);
  
  imageMode(CENTER);
  rectMode(CENTER)
  noStroke();
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      let x = c * res + res * 0.5;
      let y = r * res + res * 0.5;
      
      let rand = 1; 
      let xoff = random(-rand, rand) * (res * 0.5);
      let yoff = random(-rand, rand) * (res * 0.5);
      
      x += xoff;
      y += yoff;
      
      let perlin = noise(c * 0.1, r * 0.1, millis() * 0.001);
      let angle  = perlin * TWO_PI;
      let rgb    = imgToSample.get(x, y);  
      let bright = brightness(rgb)/255;
      let offsc  = random(0, 10);
      
      push();
      translate(x, y);
      rotate(angle)
      // fill(rgb);a
      // rect(0, 0, 0.5*res + res*bright + offsc, 0.5*res + res*bright + offsc)
      tint(rgb)
      image(brush, 0, 0, 1*res + res*bright + offsc, 1*res + res*bright + offsc)
      pop();
    }
  }
  
}