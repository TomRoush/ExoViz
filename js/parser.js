
//MAIN
function main() {
	readingdata();
    render();
}


function readingdata(){
    
var data;
$.ajax({
   type: "GET",  
   url: "data/testcsv.csv",
   dataType: "csv",       
 }).done(successFunction); 


/*var file = 'data/culmulative.csv';
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
console.log(data);

}

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

function generateHtmlTable(data) {
    var html = '<table  class="table table-condensed table-hover table-striped">';
 
      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
 $.each(data, function( index, row ) {
   //bind header
   if(index == 0) {
 html += '<thead>';
 html += '<tr>';
 $.each(row, function( index, colData ) {
 html += '<th>';
 html += colData;
 html += '</th>';
 });
 html += '</tr>';
 html += '</thead>';
 html += '<tbody>';
   } else {
 html += '<tr>';
 $.each(row, function( index, colData ) {
 html += '<td>';
 html += colData;
 html += '</td>';
 });
 html += '</tr>';
   }
 });
 html += '</tbody>';
 html += '</table>';
 alert(html);
 $('#csv-display').append(html);
   }
 } 

//function to 
