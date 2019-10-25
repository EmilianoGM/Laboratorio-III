/// <reference path= "node_modules/@types/jquery/index.d.ts" />
function AjaxPOST() {
    var xhttp = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./administrador.php", true);
    var correo = document.getElementById("correo").value;
    var clave = document.getElementById("clave").value;
    //SETEO EL ENCABEZADO DE LA PETICION	
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    //ENVIO DE LA PETICION CON LOS PARAMETROS
    var usuario = 'usuario={"correo":"' + correo + '", "clave":"' + clave + '"}';
    xhttp.send(usuario);
    //FUNCION CALLBACK
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                var respuesta = JSON.parse(xhttp.responseText);
                //(<HTMLDivElement>document.getElementById("mensaje")).className = "exito";
                if ($("#mensaje").attr("class") == "error") {
                    $("#mensaje").removeClass("error");
                }
                $("#mensaje").text("Usuario encontrado");
                $("#mensaje").addClass("exito");
                console.log(respuesta);
            }
            else {
                //(<HTMLDivElement>document.getElementById("mensaje")).className = "error";
                if ($("#mensaje").attr("class") == "exito") {
                    $("#mensaje").removeClass("exito");
                }
                $("#mensaje").text("Usuario inexistente");
                $("#mensaje").addClass("error");
                console.log(xhttp.responseText);
            }
            /*var respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta);
            /*
            if(respuesta.Existe){
                window.location.href = "./principal.php";
            } else{
                alert("No registrado");
            }
            console.log(respuesta.Usuario);
            console.log(respuesta.Existe);
            console.log(respuesta.Perfil);*/
        }
    };
}
