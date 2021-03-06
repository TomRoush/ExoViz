/*

  Reading in data and passing variables

*/
var data, data_ref;
function readingdata() {

    console.log("Start data file loading...");
    $.when(
        $.ajax({
            mimeType: 'text/plain; charset=x-user-defined',
            url: "data/planets.csv",
            dataType: "text",
        }),
        $.ajax({
            mimeType: 'text/plain; charset=x-user-defined',
            url: "data/ref.csv",
            dataType: "text",
            }),
    ).done(function(resPlanet, resRef) {
        data = parseCSV(resPlanet[0]);
        data_ref = parseCSV(resRef[0]);

        init();
    });
    //   .done(successFunction).fail(function( jqXHR, textStatus ) {
    //   alert( "Request failed: " + textStatus );
    // });

    return data;
}

function parseCSV(d) {
    var allRows = d.split(/\r?\n|\r/);
    var result = [];

    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (allRows[singleRow].startsWith('#') || // Comment line
            allRows[singleRow].startsWith('rowid')) continue; // Header line

        var rowCells = allRows[singleRow].split(',');
        var line = [];
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
            line.push(rowCells[rowCell]);
        }
        result.push(line);
    }
    return result;
}


//function to get certain quantities from one data object
function getprops(line){ // TODO cache

    // id 0
    // name 1
    // planet letter 2
    // planets in system 3
    // orbital period 4
    // orbital semimajor 5
    // orbital eccentricity 6
    // orbital inclination 7
    // planet mass 8
    // planet mass provence 9
    // planet radius 10
    // planet density 11
    // planet ra sexagesimal 12
    // planet ra decimal 13
    // planet dec sexagesimal 14
    // planet dec decimal 15
    // planet distance 16
    // planet optical magnitude 17
    // planet optical mag band 18
    // stellar temperature 19
    // stellar mass 20
    // stellar radius 21
    // planet temperature 22

    //Basic quantities
    var id = line[0];
    var name = line[1];
    var radius = line[10];
    var ra = line[13];
    var dec = line[15];
    var distance = line[16];
    var temperature = line[22];

    // Planet-Star Systems
    var p = line[4];
	var a = line[5];
    var e = line[6];
    var inc = line[7];
    var rstar = line[21];
    var tstar = line[19];

    var pl = new PlanetBasic(id, name, ra ,dec, distance, radius, temperature);
    var pstar = new PlanetZoom(id, name, p, a, e, inc, rstar, tstar);
    return [pl, pstar];
}

//for reference stars and planets

function getprops_ref(line){

    var name = line[0];
    var distance = line[3];
    var temperature = line[5];
    var radius = line[8];
    var ra = line[11];
    var dec = line[12];

    var ref_star = new BrightStars(name, ra ,dec, distance, radius, temperature);

    return ref_star;
}
