/*   

  Reading in data and passing variables
   
*/

function readingdata() {

// Method 1
/*var data;
$.ajax({
   type: "GET",
   url: "data/planets.csv",
   dataType: "csv",
 }).done(successFunction);
console.log(data); */

//Method 2
var fs = require(['fs']);
var $ = jQuery = require(['jQuery']);
require(['lib/jquery.csv.js']);

var sample = '../data/testcsv.csv';
fs.readFile(sample, 'UTF-8', function(err, csv) {
  $.csv.toArrays(csv, {}, function(err, data) {
    for(var i=0; i<data.length; i++) {
      console.log(data[i]);
    }
  });
});

// Method 3
/*var file = 'data/planets.csv';
var reader = new FileReader();
reader.readAsText(file);
reader.onload = function(event) {
    var csvData = event.target.result;
     data = $.csv.toArrays(csvData);
    if (data && data.length > 0) {
    alert('Imported -' + data.length + '- rows successfully!');
     } else {
    alert('No data to import!');
    }
};
    reader.onerror = function() {
    alert('Unable to read ' + file.fileName);
    };
 */

}

/*   
function successFunction(data) {
  var allRows = data.split(/\r?\n|\r/);
  var table = '<table>';
  for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
    if (singleRow === 0) {
      table += '<thead>';
      table += '<tr>';
    } else {
      table += '<tr>';
    }
    var rowCells = allRows[singleRow].split(',');
    for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
      if (singleRow === 0) {
        table += '<th>';
        table += rowCells[rowCell];
        table += '</th>';
      } else {
        table += '<td>';
        table += rowCells[rowCell];
        table += '</td>';
      }
    }
    if (singleRow === 0) {
      table += '</tr>';
      table += '</thead>';
      table += '<tbody>';
    } else {
      table += '</tr>';
    }
  }
  table += '</tbody>';
  table += '</table>';
  $('body').append(table);
}
*/
    
//function to get certain quantities from one data object 
function getprops(line){
    var id = line[0]; 
    var name = line[1]; 
    var radius = line[10];
    var ra = line[13];
    var dec = line[15];
    var distance = line[16];
    var temperature = line[19];
    
    var pl = new PlanetBasic(id, name, ra ,dec, distance, radius, temperature);
    return pl;
}
