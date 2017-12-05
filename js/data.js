/*   

   Planet class containing different parameters
   
*/

//For planets on the celestial sphere
class PlanetBasic {
    constructor(id, name, ra ,dec, distance, radius, temperature) {
	this.id = id;
    this.name = name;
    this.ra = ra*Math.PI/180;
	this.dec = dec*Math.PI/180;
    this.dist = distance;
    this.radius = radius; // in pc
    this.temp = temperature;
    }
    get position(){
        return this.calcpos();
    }
    calcpos() {
        var x = this.radius * Math.cos(this.ra) * Math.sin(Math.PI/2.-this.dec);
        var y = this.radius * Math.sin(this.ra) * Math.sin(Math.PI/2.-this.dec);
        var z = this.radius * Math.cos(Math.PI/2.-this.dec);
        return [x,y,z];
    }
}

//For zoomed-in planet-star systems
class PlanetZoom {
    constructor(id, name, p, a, e, inc, rstar, tstar) {
	this.id = id;
    this.name = name;
    this.period = p;
	this.semimajor = a;
    this.eccentricity = e;
    this.inclination = inc;
    this.rstar = rstar;
    this.tstar = tstar; //stellar temperature
    }
    
}