"use strict";
var xmlhttp = new XMLHttpRequest();
function Manejadora() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var elemento = document.getElementById("divGrilla");
            elemento.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("POST", "./administracion.php", true);
    xmlhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("queHago=mostrarGrilla");
}
window.onload = function () {
    Manejadora();
};
//# sourceMappingURL=manejador.js.map