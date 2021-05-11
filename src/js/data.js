fetch(
    "data.js"
  ).then((res) => {
    res.json().then((data) => {
      if (data.length > 0) {
        var temp = "";
        data.shift(); //remove first line of data
        data.forEach((itemData) => {
          var geoname = itemData[1].split(",");
          temp += "<tr>";
          temp += "<td>" + geoname[0] + "</td>"; //city
          temp += "<td>" + geoname[1] + "</td>"; //state
          temp += "<td>" + parseInt(itemData[0]) + "</td></tr>"; //population
        });
        document.getElementById("data").innerHTML = temp;
        sorttable.makeSortable(temp);
      }
    });
  });
 
  
  //Filter state function
  function filterState() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("stateInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
  //Filter min/max population function
  function filterPop() {
    // Declare variables
    var minInput, maxInput, table, tr, td, i, txtValue;
    minInput = parseFloat(document.getElementById("min").value);
    maxInput = parseFloat(document.getElementById("max").value);
    console.log(minInput, maxInput);
  
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
  
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue >= minInput && txtValue <= maxInput) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }