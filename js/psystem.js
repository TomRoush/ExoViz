/*

   Javascript to animate planet-star systems

*/

var background = new Image();
var star = new Image();
var planet = new Image();
function animate_star() {
  background.src = 'https://i.ytimg.com/vi/voWpbz1De_M/maxresdefault.jpg';
  //star.src;
  planet.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

//test input
var p = 1.; //in years
var a = 1.;  // in AU
var e = 0.5; 
var inc = 0.;  //degrees

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'lighter';
  ctx.clearRect(0, 0, 400, 400);
  ctx.drawImage(background, 0, 0, 400, 400);
    
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.lineWidth = 5;
  ctx.save();
  ctx.translate(200, 200); //move orbit center 
    
  //Some quantities
  var b = a*Math.sqrt(1- e*e);
  var c = a*e;
  var omega = 2* Math.PI/p;
      
  // Draw planet
  var time = new Date();
  var ang_now = 0.;
  var ang_rotate = (omega / 60) * time.getSeconds() + (omega/ 60000) * time.getMilliseconds();
  //ctx.rotate(ang_rotate);
  ang_now = ang_now + ang_rotate;
  ctx.translate(a*150*Math.cos(ang_now), b*150*Math.sin(ang_now));
  ctx.drawImage(planet, -16, -16);
  
  ctx.restore();
  
  // Draw orbit
  ctx.beginPath();
  major = a * 150; //transfer to pixel
  minor = b * 150;
  ctx.ellipse(200, 200, major, minor, 0.,  0, Math.PI * 2, false);
  ctx.stroke();
 
  // Draw star (should actually on one of the focus)
  ctx.beginPath();
  var centerx = 200 - 150 * c/a;
  ctx.arc(centerx, 200, 20, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();

  window.requestAnimationFrame(draw);
}