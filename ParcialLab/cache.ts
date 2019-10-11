if(localStorage.getItem("Empleados") == null){
    localStorage.setItem("Empleados", "Juan-123,Rosa-456,Carlos-666");
}

var emp = localStorage.getItem("Empleados");
let nombre;
let legajo;
if(emp != null){
    var empleados = emp.split(",");
    var noEncontrado = true;
    for (let index = 0; index < empleados.length; index++) {
      var datos = empleados[index].split("-");
      if(nombre == datos[0] && legajo == datos[1]){
        alert("Encontrado");
        window.location.href = "./principal.html";
        noEncontrado = false;
        break;
      }
    }
}