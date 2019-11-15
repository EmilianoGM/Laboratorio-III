function Loggeo():void {
    let xhttp : XMLHttpRequest = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./api.php/login/", true);
    let correo = (<HTMLTextAreaElement>document.getElementById("correo")).value;
    let clave = (<HTMLTextAreaElement>document.getElementById("clave")).value;
    //SETEO EL ENCABEZADO DE LA PETICION	
    xhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
    
    //ENVIO DE LA PETICION CON LOS PARAMETROS
    var usuario = 'usuario={"correo":"' + correo + '", "clave":"' + clave + '"}';
    xhttp.send(usuario);

    //FUNCION CALLBACK
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("ok");
        }
    };
}