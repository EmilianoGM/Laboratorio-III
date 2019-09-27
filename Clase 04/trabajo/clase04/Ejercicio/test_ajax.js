"use strict";
var xhttp = new XMLHttpRequest();
function Test() {
    xhttp.open("GET", "Backend/test.php", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
        }
    };
}
function Test_params() {
    var nombre = document.getElementById("nombre").value;
    var url = "Backend/test_params.php" + "?nombre=" + nombre;
    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
        }
    };
}
window.onload = function () {
    Test();
};
//# sourceMappingURL=test_ajax.js.map