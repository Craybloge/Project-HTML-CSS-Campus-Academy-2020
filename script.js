(function(){
    var canv = document.getElementById('myCanvas'),
    c = canv.getContext('2d'),
    gravity = 0.1,
    dampening = 0.99,
    pullStrength = 0.01,
    circles = [ ],
    i, numCircles = 10,
    repulsion = 1;


    for(i = 0; i< numCircles; i++){
        circles.push({
            x: Math.random() * canv.width,
            y: Math.random() * canv.height,
            //(vx, vy) sont les vecteurs de vélocités
            vx: 0,
            vy: 0,    
            radius: Math.random() *20 + 10
        });
    }



function executeFrame(){
    var i, circle;
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
        // circle.y = canv.height - circle.radius;
        circle.vy = -Math.abs(circle.vy);
    }

    //rebond à droite
    if(circle.x + circle.radius > canv.width){
        // circle.y = canv.height - circle.radius;
        circle.vx = -Math.abs(circle.vx);
    }

    // // rebond à gauche
    // if(circle.x - circle.radius < 0){
    //     // circle.y = canv.height - circle.radius;
    //     circle.vx = -Math.abs(circle.vx);
    // }

    //Collision
    for(j = i+1; j < numCircles; j++){
        collide(circle, circles[j])
    }


    c.beginPath();
    c.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
    c.closePath();
    c.fillStyle = 'black';
    c.fill();
    }

    c.fillStyle = 'rgba(255,255,255, 0.2)';
    c.fillRect(0,0, canv.width, canv.height);

    requestAnimFrame(executeFrame);
}

function collide(a,b){
    var dx = b.x -a.x,
        dy = b.y -a.y,
        d = Math.sqrt(dx*dx + dy*dy),
        ux = dx / d,
        uy = uy / d;

    if(d < a.radius + b.radius){
        a.vx -= ux * repulsion;
        a.by -= uy * repulsion;
        b.vx += ux * repulsion;
        b.vy += uy * repulsion;
    }
}

canv.addEventListener('mousedown', function(e){
    var dx, dy, i, circle;
    for(i = 0; i< numCircles; i++){
        circle = circles[i];
        dx = e.pageX - circle.x;
        dy = e.pageY - circle.y;
        circle.vx += dx * pullStrength;
        circle.vy += dy * pullStrength;
    }
});

// lancer l'animation
executeFrame();
})();
