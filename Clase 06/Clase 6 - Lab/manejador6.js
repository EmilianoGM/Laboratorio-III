function AjaxPOST() {
    var xhttp = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./testUsuario.php", true);
    var correo = document.getElementById("correo").value;
    var clave = document.getElementById("clave").value;
    //SETEO EL ENCABEZADO DE LA PETICION	
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    //ENVIO DE LA PETICION CON LOS PARAMETROS
    var usuario = 'usuario={"correo":"' + correo + '", "clave":"' + clave + '"}';
    xhttp.send(usuario);
    //FUNCION CALLBACK
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta.Ok);
        }
    };
}
function CrearUsuario() {
    var xhttp = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./registroUsuario.php", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    //INFO
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var perfil = document.getElementById("perfil").value;
    var correo = document.getElementById("correo").value;
    var clave = document.getElementById("clave").value;
    var usuario = '{"nombre":"' + nombre + '", "apellido":"' + apellido + '", "perfil":' + perfil
        + ', "correo":"' + correo + '", "clave":"' + clave + '"}';
    //--------------FOTO----
    var foto = document.getElementById("foto");
    //INSTANCIO OBJETO FORMDATA
    var form = new FormData();
    //AGREGO PARAMETROS AL FORMDATA:
    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);
    form.append('op', "subirFoto");
    form.append('usuario', usuario);
    //---------------FIN info FOTO----------------------
    //ENCABEZADO PARA FOTO
    xhttp.send(form);
    //FUNCION CALLBACK
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            var respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta.Ok);
        }
    };
}
