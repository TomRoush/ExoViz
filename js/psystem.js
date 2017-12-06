/*

   Javascript to animate planet-star systems

*/

var star = new Image();
var planet = new Image();
function animate_star() {
  star.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  planet.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

//test input
var p = 1.; //years
var a = 1.;  // AU
var e = 0.5;
var inc = 0.;  //degrees

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();
  ctx.translate(150, 150);

  // Draw planet
  var time = new Date();
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // Shadow
  ctx.drawImage(planet, -12, -12);
  
  ctx.restore();
  
  // Draw orbit
  ctx.beginPath();
  var b = a*Math.sqrt(1- e*e);
  major = a * 100; //transfer to pixel
  minor = b * 100;
  ctx.ellipse(150, 150, major, minor, inc,  0, Math.PI * 2, false);
  ctx.stroke();
 
  // Draw star
  ctx.drawImage(star, 0, 0, 300, 300);

  window.requestAnimationFrame(draw);
}