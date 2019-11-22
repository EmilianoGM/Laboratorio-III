/*
tsc --outfile main.js primero.ts segundo.ts tercero.ts
******Tipos******
Number
var numero : number = 56.5;

Null - cuando un objeto o variable no esta accesible
var obj : object | null = null;

Plantillas de string
var mensaje : string = "hola mundo";
var hmtl : string =  `<div>${mensaje}</div>`; //entre tilde invertido

Undefined - objeto o variable existe pero no tiene un valor
Any - puede ser cualquier tipo de objeto

function Identificador(param? : tipo) : tipoRetorno {return ;}

******Arrays******
var lista = [1, true, "rojo"];
var lista : number[] = [1,2,3];
var lista : Array<number> = [1,2,3];

******Enum******
enum Color {Rojo, Verde, Azul};
var c : Color = Color.Verde;

******Referenciar******
/// <reference path="./mascota.ts" />


*/