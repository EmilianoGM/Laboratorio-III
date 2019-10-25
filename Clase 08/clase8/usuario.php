<?php
class Usuario{
    public $id;
    public $nombre;
    public $apellido;
    public $clave;
    public $perfil;
    public $estado;
    public $correo;
    public $pathFoto;

  /*Solo funciona si tiene todos los parametros opcionales par ael fetch con otro obj
    public function __construct($nuevoId, $nuevoNombre, $nuevoApellido, $nuevaClave, $nuevoPerfil,
    $nuevoEstado, $nuevoCorreo)
    {
        $this->id = $nuevoId;
        $this->nombre = $nuevoNombre;
        $this->apellido = $nuevoApellido;
        $this->clave = $nuevaClave;
        $this->perfil = $nuevoPerfil;
        $this->estado = $nuevoEstado;
        $this->correo = $nuevoCorreo;
    }
*/
    function NuevoUsuario()
    {
        $retorno = false;
        if(!(Usuario::ExisteEnDB($this->clave,$this->correo))){
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO usuarios(nombre, apellido,clave,perfil,estado,correo, path_foto) "
            ."VALUES (:nombre,:apellido,:clave,:perfil,:estado,:correo,:path_foto)");
            $consulta->bindParam(':nombre', $this->nombre, PDO::PARAM_STR);
            $consulta->bindParam(':apellido', $this->apellido, PDO::PARAM_STR);
            $consulta->bindParam(':clave', $this->clave, PDO::PARAM_STR);
            $consulta->bindParam(':perfil', $this->perfil, PDO::PARAM_INT);
            $consulta->bindParam(':estado', $this->estado, PDO::PARAM_INT);
            $consulta->bindParam(':correo', $this->correo, PDO::PARAM_STR);
            $consulta->bindParam(':path_foto', $this->pathFoto, PDO::PARAM_STR);
            $retorno = $consulta->execute();   
        }
        return $retorno;
    }

    public static function TraerUsuarios()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios");        
        
        $consulta->execute();

        return $consulta;
    }

    public static function TraerUsuarioPorId($idABuscar){
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE id = :id");        
        
        $consulta->bindParam(':id', $idABuscar, PDO::PARAM_INT);
        $consulta->execute();

        return $consulta;
    }
    
    public static function ModificarUsuario($idABuscar, $nuevoNombre, $nuevoApellido, $nuevaClave, $nuevoPerfil,
    $nuevoEstado, $nuevoCorreo)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuarios SET nombre=:nombre,apellido=:apellido,clave=:clave,"
        . "perfil=:perfil,estado=:estado,correo=:correo WHERE id = :id");
        $consulta->bindParam(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindParam(':nombre', $this->nombre, PDO::PARAM_STR);
        $consulta->bindParam(':apellido', $this->apellido, PDO::PARAM_STR);
        $consulta->bindParam(':clave', $this->clave, PDO::PARAM_STR);
        $consulta->bindParam(':perfil', $this->perfil, PDO::PARAM_INT);
        $consulta->bindParam(':estado', $this->estado, PDO::PARAM_INT);
        $consulta->bindParam(':correo', $this->correo, PDO::PARAM_STR);
        $consulta->execute();
    }

    public static function ExisteEnDB($claveABuscar, $correoABuscar)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE clave = :clave AND correo = :correo");
        $consulta->bindParam(':clave', $claveABuscar,PDO::PARAM_STR);
        $consulta->bindParam(':correo', $correoABuscar, PDO::PARAM_STR);
        $consulta->execute();
        $resultado = $consulta->fetch(PDO::FETCH_ASSOC);
        $objRetorno = new stdClass();
        $objRetorno->Existe = !(empty($resultado));
        if(!(empty($resultado))){
            $objRetorno->Usuario = $resultado;
        }

        return $objRetorno;/*
        if(empty($resultado)){
            return "vacio";
        } else{
            return "consulta con resultado";
        }*/
    }
}
?>