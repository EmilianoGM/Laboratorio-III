function AjaxPOST():void {
    let xhttp : XMLHttpRequest = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./testUsuario.php", true);
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
            var respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta.Ok);
        }
    };
}

function CrearUsuario():void{
    let xhttp : XMLHttpRequest = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./registroUsuario.php", true);
    xhttp.setRequestHeader("enctype", "multipart/form-data");
    //INFO
    let nombre = (<HTMLTextAreaElement>document.getElementById("nombre")).value;
    let apellido = (<HTMLTextAreaElement>document.getElementById("apellido")).value;
    let perfil = (<HTMLTextAreaElement>document.getElementById("perfil")).value;
    let correo = (<HTMLTextAreaElement>document.getElementById("correo")).value;
    let clave = (<HTMLTextAreaElement>document.getElementById("clave")).value;
    var usuario = '{"nombre":"' + nombre + '", "apellido":"' + apellido + '", "perfil":' + perfil
    + ', "correo":"' + correo + '", "clave":"' + clave + '"}';
    //--------------FOTO----
    let foto : any = (<HTMLInputElement> document.getElementById("foto"));
    //INSTANCIO OBJETO FORMDATA
    let form : FormData = new FormData();
    //AGREGO PARAMETROS AL FORMDATA:
    //PARAMETRO RECUPERADO POR $_FILES
    form.append('foto', foto.files[0]);
    form.append('op', "subirFoto");
    form.append('usuario', usuario)
    //---------------FIN info FOTO----------------------
    //ENCABEZADO PARA FOTO
    
    xhttp.send(form);

    //FUNCION CALLBACK
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
            var respuesta = JSON.parse(xhttp.responseText);
            console.log(respuesta.Ok);
        }
    };
}

let xhttp : XMLHttpRequest = new XMLHttpRequest();

function Test(): void{
  xhttp.open("GET", "Backend/test.php", true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert(xhttp.responseText);
    }
  }
}

function Test_params():void {
  let nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
  let url = "Backend/test_params.php" + "?nombre=" + nombre;
  xhttp.open("GET", url , true);
  xhttp.send();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        alert(xhttp.responseText);
    }
  }
}
/*
(<HTMLInputElement> document.getElementById("tamaño")).value=cadenaJson.tamanio;
(<HTMLInputElement> document.getElementById("edad")).value=cadenaJson.edad;
(<HTMLInputElement> document.getElementById("precio")).value=cadenaJson.precio;
(<HTMLInputElement> document.getElementById("precio")).disabled=true;
(<HTMLInputElement> document.getElementById("nombre")).value=cadenaJson.nombre;
(<HTMLSelectElement> document.getElementById("raza")).value=cadenaJson.raza; 

(<HTMLImageElement> document.getElementById("imgFoto")).src = path;
(<HTMLInputElement> document.getElementById("btnAgregarBd")).value ="Modificar BD";
let foto : any = (<HTMLInputElement> document.getElementById("foto"));
(<HTMLImageElement> document.getElementById("imgFoto")).src = "./BACKEND/fotos/huella_default.png"
*/