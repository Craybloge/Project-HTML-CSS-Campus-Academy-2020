(function(){
    var canv = document.getElementById('myCanvas'),
    c = canv.getContext('2d'),
        gravity = 0.05,
        dampening = 0.995,
        pullStrength = 0.005,
        circles = [ ],
        i, numCircles = 25,
        repulsion = 1,
        mouseDown = false,
        mouseX, mouseY;


    for(i = 0; i< numCircles; i++){
        circles.push({
            x: Math.random() * canv.width,
            y: Math.random() * canv.height,
            //(vx, vy) sont les vecteurs de vélocités
            vx: 0,
            vy: 0,    
            // radius: Math.random() *20 + 10
            radius: Math.random() *20 + 10
        });
    }



function executeFrame(){
    var i, j, circle;
    for(i = 0; i< numCircles; i++){
        circle = circles[i];
     
    //on modifie la position par rapport à la vitesse
    circle.x += circle.vx;
    circle.y += circle.vy;
    
    // on modifie la vitesse verticale avec l'accélération de la gravité
    circle.vy += gravity;
     
    //on ralentit
    circle.vy*= dampening;
    circle.vx*= dampening;

    //rebond au sol
    if(circle.y + circle.radius > canv.height){
        circle.vy = -Math.abs(circle.vy);
    }

    //rebond à droite
    if(circle.x + circle.radius > canv.width){
        circle.vx = -Math.abs(circle.vx);
    }

    // rebond à gauche
    if(circle.x - circle.radius < 0){
        circle.vx = Math.abs(circle.vx);
    }

    // rebond en haut
    if(circle.y - circle.radius < 0){
    circle.vy = Math.abs(circle.vy);
    }

    //Collision
    for(j = i+1; j < numCircles; j++){
        collide(circle, circles[j]);
      }


    c.beginPath();
    c.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    c.closePath();
    c.fillStyle = 'black';
    c.fill();
    }

    c.fillStyle = 'rgba(255,255,255, 0.1)';
    c.fillRect(0,0, canv.width, canv.height);

    //appel de la fonction qui gère l'interaction avec la souris
    executeInteraction();

    requestAnimFrame(executeFrame);
}

function collide(a,b){
      var dx = b.x - a.x,
          dy = b.y - a.y,
          d = Math.sqrt(dx*dx + dy*dy),
          // (ux, uy) = unit vector
          ux = dx / d,
          uy = dy / d;
  
      // si elles se superposes
      if(d < a.radius + b.radius){
        //alors elles se repoussent
        a.vx -= ux * repulsion;
        a.vy -= uy * repulsion;
        b.vx += ux * repulsion;
        b.vy += uy * repulsion;
      }
}
canv.addEventListener('mousedown', function(e){
    mouseDown = true;
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

canv.addEventListener('mouseup', function(e){
    mouseDown = false;
  });
canv.addEventListener('mousemove', function(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

function executeInteraction(){
    var dx, dy, i, circle;
    if(mouseDown){
      for(i = 0; i < numCircles; i++){
        circle = circles[i];
        dx = mouseX - circle.x;
        dy = mouseY - circle.y;
        circle.vx += dx * pullStrength;
        circle.vy += dy * pullStrength;
      }
    }
  }

// lancer l'animation
executeFrame();
})();
