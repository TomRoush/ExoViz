/*

   Planet class containing different parameters

*/

//For planets on the celestial sphere
class PlanetBasic { // TODO default values for missing data
    constructor(id, name, ra ,dec, distance, radius, temperature) {
	this.id = id;
    this.name = name;
    this.ra = ra*Math.PI/180;
	this.dec = dec*Math.PI/180;
    this.dist = distance; //in pc
    this.radius = radius;
    this.temperature = !isNaN(temperature) ? temperature : 5335; // Average temp

    this.position = [
        this.dist * Math.cos(this.ra) * Math.sin(Math.PI/2.-this.dec),
        this.dist * Math.sin(this.ra) * Math.sin(Math.PI/2.-this.dec),
        this.dist * Math.cos(Math.PI/2.-this.dec)
    ];
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

// For reference stars
class BrightStars{
    constructor(name, ra ,dec, distance, radius, temperature) {

    this.name = name;
    this.ra = ra*Math.PI/180;
	this.dec = dec*Math.PI/180;
    this.dist = distance;
    this.radius = radius;
    this.temperature = temperature;

    this.position = [
        this.dist * Math.cos(this.ra) * Math.sin(Math.PI/2.-this.dec),
        this.dist * Math.sin(this.ra) * Math.sin(Math.PI/2.-this.dec),
        this.dist * Math.cos(Math.PI/2.-this.dec)
    ];
    }
}
