/// <reference path="./perro.ts" />
let perro : Entidades.Perro;
perro = new Entidades.Perro("a", 2, 2 , "b", "c", "p");
console.log(perro.ToString());
let tabla = "<table border='1'>" +
            "<tr><td>Tipo</td><td>Velocidad</td><td>Planeta de origen</td><td>Foto</td><td>Velocidad WARP</td>"+
            "<td><button>Click Me!</button></td>" +
            "</tr>";