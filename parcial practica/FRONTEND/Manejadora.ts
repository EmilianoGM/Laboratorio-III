/// <reference path="./Televisor.ts" />
namespace PrimerParcial{
    export class Manejadora{
        public static AgregarTelevisor(caso: string){
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            
            let codigo = +(<HTMLTextAreaElement>document.getElementById("codigo")).value;
            let marca = (<HTMLTextAreaElement>document.getElementById("marca")).value;
            let precio = +(<HTMLTextAreaElement>document.getElementById("precio")).value;
            let tipo = (<HTMLTextAreaElement>document.getElementById("tipo")).value;
            let paisOrigen = (<HTMLSelectElement>document.getElementById("pais")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            
            var pathFoto : string = codigo + ".jpg"; 
            var televisor : Entidades.Televisor = new Entidades.Televisor(codigo, marca, precio,tipo,paisOrigen,pathFoto);
            let form : FormData = new FormData();
            var cadenaJson = televisor.ToJson();
            form.append('foto', foto.files[0]);
            form.append('caso', caso);
            form.append('cadenaJson', cadenaJson);

            xhttp.send(form);

            Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var respuestaJson = JSON.parse(xhttp.responseText);

                    if(caso == "modificar" && respuestaJson.TodoOK == false){
                        console.log("No se pudo modificar");
                        alert("No se pudo modificar");
                    } else{
                        Manejadora.MostrarTelevisores();
                        console.log(xhttp.responseText);
                    }
                    Manejadora.LimpiarForm();
                }
            };
        }

        public static MostrarTelevisores(){
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
	
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            let caso = "traer";

            xhttp.send("caso=" + caso);
        
            Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var listado = JSON.parse(xhttp.responseText);
                    var div = (<HTMLDivElement>document.getElementById("divTabla"));
                    let tabla = "<table border='1'>" +
                    "<tr><td>Codigo</td><td>Marca</td><td>Precio</td><td>Tipo</td><td>Pais</td>"+
                    "<td>Foto</td>" +
                    "</tr>";

                    let tablaDos = "<table border='1'>" +
                    "<tr><td>Codigo</td><td>Marca</td><td>Precio</td><td>Tipo</td><td>Pais</td>"+
                    "<td>Foto</td><td>Acciones</td>" +
                    "</tr>";

                    for (let index = 0; index < listado.length; index++) {
                        var televisor = listado[index];
                        /*tabla += "<tr><td>" + televisor["codigo"] + "</td><td>" + televisor["marca"] + "</td><td>" +
                        televisor["precio"] + "</td><td>"+ televisor["tipo"] + "</td><td>"+ televisor["paisOrigen"] +
                        "</td><td><img src='./BACKEND/fotos/" + televisor["pathFoto"] + "'height='100' width='100'></td></tr>";*/
                        tablaDos += "<tr><td>" + televisor["codigo"] + "</td><td>" + televisor["marca"] + "</td><td>" +
                        televisor["precio"] + "</td><td>"+ televisor["tipo"] + "</td><td>"+ televisor["paisOrigen"] +
                        "</td><td><img src='./BACKEND/fotos/" + televisor["pathFoto"] + "'height='100' width='100'></td>" +
                        '<td><input type="button" class="eliminar" value="Eliminar" />' +
                        '<input type="button" class="modificar" value="Modificar" /></td>' +
                        "</tr>";
                    }
                    tabla +="</table>";
                    tablaDos +="</table>";
                    Manejadora.AdministrarSpinner(false);
                    div.innerHTML = tablaDos;

                    let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
                    for (let index = 0; index < botonesEliminar.length; index++) {
                        (<HTMLButtonElement>botonesEliminar[index]).onclick = () => { Manejadora.EliminarTelevisor(listado[index]) };
                    }

                    let botonesModificar: HTMLCollection = document.getElementsByClassName('modificar');
                    for (let index = 0; index < botonesModificar.length; index++) {
                        (<HTMLButtonElement>botonesModificar[index]).onclick = () => { Manejadora.ModificarTelevisor(listado[index]) };
                    }
                }
            };
        }

        public static GuardarEnLocalStorage(){
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
	
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            let caso = "traer";

            xhttp.send("caso=" + caso);
        
            Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var listado = JSON.parse(xhttp.responseText);
                    localStorage.setItem("televisores_local_storage", JSON.stringify(listado));
                    if(localStorage.getItem("televisores_local_storage") != null){
                        console.log("local storage hecho");
                    }
                }
            };
        }

        public static VerificarExistencia(){
            if(localStorage.getItem("televisores_local_storage") != null){
                var flag = true;
                var items = localStorage.getItem("televisores_local_storage");
                var listado = JSON.parse("" + items);
                let codigo = +(<HTMLTextAreaElement>document.getElementById("codigo")).value;
                for (let index = 0; index < listado.length; index++) {
                    var televisor = listado[index];
                    if(televisor["codigo"] == codigo){
                        flag = false;
                            break;
                    }
                }
                if(flag){
                    Manejadora.AgregarTelevisor("agregar");
                    Manejadora.GuardarEnLocalStorage();
                    console.log("Agregado");     
                }else{
                    console.log("Ya existe");
                    alert("Ese televisor ya ha sido agregado");
                }
            }
        }

        public static EliminarTelevisor(televisor: any){
            if (window.confirm('Desea eliminar el televisor código ' + televisor.codigo + ', de tipo ' + televisor.tipo + '?')) {
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "./BACKEND/administrar.php", true);
	
                xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                let caso = "eliminar";
            
                xhttp.send("caso=" + caso + "&cadenaJson=" + JSON.stringify(televisor));

                Manejadora.AdministrarSpinner(true);

                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        Manejadora.AdministrarSpinner(false);
                        Manejadora.MostrarTelevisores();
                        console.log(JSON.parse(xhttp.responseText));
                    }
                };
            }
        }

        public static ModificarTelevisor(televisor: any) {
            (<HTMLInputElement>document.getElementById("codigo")).value = televisor.codigo;
            (<HTMLInputElement>document.getElementById("codigo")).readOnly = true;
            (<HTMLInputElement>document.getElementById("marca")).value = televisor.marca;
            (<HTMLInputElement>document.getElementById("precio")).value = televisor.precio;
            (<HTMLInputElement>document.getElementById("tipo")).value = televisor.tipo;
            (<HTMLSelectElement>document.getElementById("pais")).value = televisor.paisOrigen;
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\' + televisor.pathFoto;

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Modificar";
            boton.onclick = () => { Manejadora.AgregarTelevisor('modificar') };
        }

        public static FiltrarTelevisoresPorPais() {
            let paisOrigen = (<HTMLSelectElement>document.getElementById("pais")).value;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
	
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            let caso = "traer";

            xhttp.send("caso=" + caso);

            Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var listado = JSON.parse(xhttp.responseText);
                    var div = (<HTMLDivElement>document.getElementById("divTabla"));

                    let tablaDos = "<table border='1'>" +
                    "<tr><td>Codigo</td><td>Marca</td><td>Precio</td><td>Tipo</td><td>Pais</td>"+
                    "<td>Foto</td><td>Acciones</td>" +
                    "</tr>";

                    for (let index = 0; index < listado.length; index++) {
                        var televisor = listado[index];
                        if(televisor.paisOrigen == paisOrigen){
                            tablaDos += "<tr><td>" + televisor["codigo"] + "</td><td>" + televisor["marca"] + "</td><td>" +
                            televisor["precio"] + "</td><td>"+ televisor["tipo"] + "</td><td>"+ televisor["paisOrigen"] +
                            "</td><td><img src='./BACKEND/fotos/" + televisor["pathFoto"] + "'height='100' width='100'></td>" +
                            '<td><input type="button" class="eliminar" value="Eliminar" />' +
                            '<input type="button" class="modificar" value="Modificar" /></td>' +
                            "</tr>";
                        }      
                    }
                    tablaDos +="</table>";
                    Manejadora.AdministrarSpinner(false);

                    div.innerHTML = tablaDos;

                    let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
                    for (let index = 0; index < botonesEliminar.length; index++) {
                        (<HTMLButtonElement>botonesEliminar[index]).onclick = () => { Manejadora.EliminarTelevisor(listado[index]) };
                    }

                    let botonesModificar: HTMLCollection = document.getElementsByClassName('modificar');
                    for (let index = 0; index < botonesModificar.length; index++) {
                        (<HTMLButtonElement>botonesModificar[index]).onclick = () => { Manejadora.ModificarTelevisor(listado[index]) };
                    }

                    Manejadora.LimpiarForm();
                }
            };
        }
        
        public static CargarPaises() {
            let selectPaises = <HTMLSelectElement>document.getElementById('pais');

            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            let caso = "paises";

            xhttp.send("caso=" + caso);

            Manejadora.AdministrarSpinner(true);
            
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    let listadoPaises = JSON.parse(xhttp.responseText);
                    console.log(xhttp.responseText);;
                    for(let index = selectPaises.options.length; index >= 0 ; index--)
                    {
                        selectPaises.remove(index);
                    }
                    for (let index = 0; index < listadoPaises.length; index++) {
                        var opcion = new Option(listadoPaises[index].descripcion);
                        selectPaises.add(opcion);
                    }
                }
            }
        }   

        public static LimpiarForm() {
            (<HTMLInputElement>document.getElementById("codigo")).value = '';
            (<HTMLInputElement>document.getElementById("codigo")).readOnly = false;
            (<HTMLInputElement>document.getElementById("marca")).value = '';
            (<HTMLInputElement>document.getElementById("precio")).value = '';
            (<HTMLInputElement>document.getElementById("tipo")).value = '';
            (<HTMLSelectElement>document.getElementById("pais")).value = 'Argentina';
            (<HTMLInputElement>document.getElementById("foto")).value = '';
            (<HTMLImageElement>document.getElementById("imgFoto")).src = '.\\BACKEND\\fotos\\tv_defecto.jpg';

            let boton = (<HTMLButtonElement>document.getElementById("btn-agregar"));
            boton.value = "Agregar";
            boton.onclick = () => { Manejadora.AgregarTelevisor('agregar') };
        }

        public static AdministrarSpinner(mostrar: boolean) {
            let divSpinner = <HTMLDivElement>document.getElementById("divSpinner");
            if (mostrar == true) {
                divSpinner.style.display = "inline";
            }
            else {
                divSpinner.style.display = "none";
            }
        }
    }
}

