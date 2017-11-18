
//MAIN
function main() {
	render();
}

//--Function: render-------------------------------------
//Main drawing function

function render(canvas){
    
  var canvas = document.getElementById('example');
  if (! canvas) {
    console.log(' Failed to retrieve the < canvas > element');
    return false;
  }
  else {
	console.log(' Got < canvas > element ');
  }

var ctx = canvas.getContext('2d');

var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);

var data;
 $.ajax({
   type: "GET",  
   url: "culmulative.csv",
   dataType: "text",       
   success: function(response)  
   {
 data = $.csv.toArrays(response);
 generateHtmlTable(data);
   }   
 });


    

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