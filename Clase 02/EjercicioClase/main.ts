function Mostrar() : void {
    var nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
    var edad = (<HTMLInputElement>document.getElementById("edad")).value;
    var result = nombre + " " + edad;
    alert(result);
}

