/// <reference path="./mascota.ts" />
namespace Entidades{
    export class Perro extends Mascota {
        nombre : string;
        raza : string;
        pathFoto : string;
        constructor(tamanio : string, edad : number, precio : number, nombre : string, raza : string, pathFoto : string) {
            super(tamanio, edad, precio);
            this.nombre = nombre;
            this.raza = raza;
            this.pathFoto = pathFoto;
        }
        
        public ToString() : string {
            return super.ToString() + " soy Perro.";
        }
    }
}