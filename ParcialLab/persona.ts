namespace Entidades{
  export abstract class Persona {
    protected _apellido : string;
    protected _nombre : string;
    protected _dni : number;
    protected _sexo : string;

    public constructor(nombre : string, apellido : string, dni : number, sexo : string ) {
      this._apellido = apellido;
      this._nombre = nombre;
      this._dni = dni;
      this._sexo = sexo;
    }

    public GetApellido() : string {
      return this._apellido;
    }

    public GetNombre() : string{
      return this._nombre;
    }

    public GetSexo() : string{
      return this._sexo;
    }

    public GetDni() : number{
      return this._dni;
    }

    public abstract Hablar(idioma : string) : string;

    public ToString() : string{
      return this._apellido + " - " + this._nombre + " - " + this._dni + " - " + this._sexo;
    }
  }
}
