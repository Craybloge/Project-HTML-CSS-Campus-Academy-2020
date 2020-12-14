function setup() {
    createCanvas(1000, 1000);
  }
  
  function draw() {
    background(20);
    
    let res = 40;
    let cols = width / res;
    let rows = height / res;
    
    randomSeed(1000)
    
    rectMode(CENTER)
    for( let r=0; r<rows; r++){
      
    for(let c=0; c<cols; c++){
      let x = c*res + res/2;
      let y = r * res + res/2;
      
      let grey       = random(255)
      let offsetEven = r % 2;
      let even       = (c+ offsetEven) % 2;
      
      noStroke()
      fill(grey)
      rect(x,y, res, res);
      if(even == 0){
        fill(225);
      }else{
       fill(0) 
      }
      ellipse(x,y, res*0.5, res*0.5);
    }
    }
  }