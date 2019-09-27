let xmlhttp : XMLHttpRequest = new XMLHttpRequest();

function Manejadora() : void{  
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let elemento = (<HTMLDivElement>document.getElementById("divGrilla"));
                elemento.innerHTML = xmlhttp.responseText;
            }
        }
        
        xmlhttp.open("POST", "./administracion.php", true);
        xmlhttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xmlhttp.send("queHago=mostrarGrilla");
}

window.onload = () =>{
    Manejadora();
}