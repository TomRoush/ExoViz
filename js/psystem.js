/*

   Javascript to animate planet-star systems

*/


//test input
/*
var p = 1.; //in years
var a = 1.;  // in AU
var e = 0.5;
var inc = 0.;  //degrees
var name = 'test planet';
*/
var background = new Image();
var star = new Image();
var planet = new Image();
var data;
background.src = 'https://i.ytimg.com/vi/voWpbz1De_M/maxresdefault.jpg';
planet.src = 'img/Canvas_earth.png';

function animate_star() {
  // background.src = 'https://i.ytimg.com/vi/voWpbz1De_M/maxresdefault.jpg';
  //star.src;
  // planet.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  var line = parseInt(document.getElementById("planet_id").value);
  canvas = document.getElementById('canvas');
  data = readingdata();
  animate_system();
}

function animate_system() {
    requestAnimationFrame(animate_system);
    draw_system(canvas, getprops(data[parseInt(document.getElementById("planet_id").value)])[1]);
}

function draw_system(canvas, planet_zoom) {
  var ctx = canvas.getContext('2d');
  var half = canvas.width / 2;
  var orbitScale = half / 4;

  ctx.globalCompositeOperation = 'lighter';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ctx.drawImage(background, 0, 0, 400, 400);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.lineWidth = 5;
  ctx.save();
  ctx.translate(half, half); //move orbit center

  //Some quantities
  // TODO: how to deal with empty values?
  var p = planet_zoom.period /365;
  var a = planet_zoom.semimajor;
  var e = planet_zoom.eccentricity;
  var inc = planet_zoom.inclination;
  var name = planet_zoom.name;
  var radius = planet_zoom.rstar; // in solar radii
  var temp = planet_zoom.tstar;
  var tmin = 2000.;
  var tmax = 12000.;
  var b = a*Math.sqrt(1- e*e);
  var c = a*e;
  var omega = 2* Math.PI/p;

  // Draw planet
  var time = new Date();
  var ang_now = 0.0;
  var ang_rotate = (omega / 60) * time.getSeconds() + (omega/ 60000) * time.getMilliseconds();
  //ctx.rotate(ang_rotate);
  ang_now = ang_now + ang_rotate;
  ctx.translate(a*orbitScale*Math.cos(ang_now), b*orbitScale*Math.sin(ang_now));
  ctx.drawImage(planet, -16, -16);

  ctx.restore();

  // Draw orbit
  ctx.beginPath();
  major = a * orbitScale; //transfer to pixel
  minor = b * orbitScale;
  ctx.ellipse(half, half, major, minor, 0.,  0, Math.PI * 2, false);
  ctx.stroke();

  // Draw star TODO?
  // ctx.beginPath();
  // var centerx = half - orbitScale * c/a;
  // ctx.arc(centerx, half, radius, 0, 2 * Math.PI, false);
  // ctx.fillStyle = rainbow_colormap(temp, tmin, tmax);
  // ctx.fill();
  // ctx.stroke();

  // Add text
  ctx.font = "25px Comic Sans MS";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(name, half, half + major + 0.0625 * canvas.height); // TODO min
}
