namespace Entidades{
    export class Televisor extends Producto{
        public tipo : string;
        public paisOrigen : string;
        public pathFoto : string;
        
        constructor(codigo : number, marca : string, precio: number, tipo : string, paisOrigen : string, pathFoto : string = "")  {
            super(codigo,marca,precio);
            this.tipo = tipo;
            this.paisOrigen = paisOrigen;
            this.pathFoto = pathFoto;
        }

        public ToJson() : string{
            return '{' + super.ToString() + ',"tipo":"' + this.tipo + '","paisOrigen":"' + this.paisOrigen +
            '","pathFoto":"' + this.pathFoto + '"}';
        }
    }
}