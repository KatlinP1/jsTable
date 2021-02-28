$(document).ready(function() {
  getDataAndInitTable();
});

function getDataAndInitTable(){
  $.get("/get", {}, function(result){
      console.log(result);
      initTable(result);
  });
}

function initTable(dataSet){
  $('#example').DataTable( {
    data: dataSet,
    columns: [
        { title: "Name" },
        { title: "Position" },
        { title: "Office" },
        { title: "Age" },
        { title: "Start date" },
        { title: "Salary" }
    ]
} );
}