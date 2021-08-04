function setup() {
    createCanvas(1000, 1000);
    x = width/2;
    y = height/2;
  }
  
  function draw() {
    //background(255, 50);
    
    let speed = 10
    let perlinx = noise(millis() * 0.001) * width;
    let perliny = noise(500 +millis() * 0.001) * height;
    x = perlinx;
    y = perliny;
    
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    fill(r,g,b);
    noStroke()
    ellipse(x, y, 40,40);
    
    strokeWeight(10)
    stroke(0)
    line(0, height/2, width, height/2);
  }