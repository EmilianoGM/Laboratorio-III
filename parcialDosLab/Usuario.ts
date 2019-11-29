namespace SP{
    export class Usuario {
        public apellido: string;
        public nombre: string;
        public correo: string;
        public legajo: number;
        public perfil: string;
        public foto: string;
        public clave: string;
        
        constructor(apellido: string, nombre: string, correo: string, legajo: number, perfil: string, foto: string, clave: string) {
            this.apellido = apellido;
            this.nombre = nombre;
            this.correo = correo;
            this.legajo = legajo;
            this.perfil = perfil;
            this.foto = foto;
            this.clave = clave;
        }

        public ToJson(){
            let datosJson = '{"apellido" : "'+ this.apellido + '",' +
            '"nombre" : "'+ this.nombre +'",'+
            '"correo" : "'+ this.correo +'",'+
            '"legajo" : '+ this.legajo +','+
            '"perfil" : "'+ this.perfil +'",'+
            '"foto" : "'+ this.foto +'",'+
            '"clave" : "'+ this.clave +'"}';

            return datosJson;
        }
    }
}