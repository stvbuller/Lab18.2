$(document).ready(function(){
  $("button").click(function(e){
    $.getJSON("/animals/" + $(this).val(), function(response) {
      $("tbody").empty();
      response.forEach(function(animal) {
        var newTr = "<tr>";
        newTr += "<td>" + animal.name + "</td>";
        newTr += "<td>" + animal.numLegs + "</td>";
        newTr += "<td>" + animal.class + "</td>";
        newTr += "<td>" + animal.weight + "</td>";
        newTr += "</tr>";
        $("tbody").append(newTr);
      });
    });
  });
});
