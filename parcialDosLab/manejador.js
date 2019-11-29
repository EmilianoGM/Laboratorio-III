var SP;
(function (SP) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.CargarLocalStorage = function () {
            var datos = localStorage.getItem("datos_usuarios");
            if (datos != null && datos === "") {
                console.log("El local storage ya ha sido cargado");
            }
            else {
                var arrayDatos = '[{"apellido":"Lopez","nombre":"Juan","correo":"jl@mail.com","legajo":1,"perfil":"admin","foto":"usu1.png","clave":"aaaa"},' +
                    '{"apellido":"Medina","nombre":"Pedro","correo":"mp@mail.com","legajo":2,"perfil":"invitado","foto":"usu2.png","clave":"bbbb"},' +
                    '{"apellido":"Perez","nombre":"Francisco","correo":"pf@mail.com","legajo":3,"perfil":"admin","foto":"usu3.png","clave":"cccc"},' +
                    '{"apellido":"Gomez","nombre":"Federico","correo":"gf@mail.com","legajo":4,"perfil":"invitado","foto":"usu4.png","clave":"dddd"},' +
                    '{"apellido":"Correa","nombre":"Nicolas","correo":"cn@mail.com","legajo":5,"perfil":"invitado","foto":"usu5.png","clave":"eeee"}]';
                localStorage.setItem("datos_usuarios", arrayDatos);
            }
        };
        Manejadora.VerificarExistencia = function () {
            if (localStorage.getItem("datos_usuarios") != null) {
                var flag = false;
                var items = localStorage.getItem("datos_usuarios");
                var listado = JSON.parse("" + items);
                var form = new FormData(document.getElementById("loginForm"));
                var correo = form.get("correo");
                var clave = form.get("clave");
                var usuarioEncontrado;
                for (var index = 0; index < listado.length; index++) {
                    var usuario = listado[index];
                    if (usuario["correo"] == correo && usuario["clave"] == clave) {
                        usuarioEncontrado = usuario;
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    var datosJSON = JSON.stringify(usuarioEncontrado);
                    localStorage.setItem("user_loggeado", datosJSON);
                    window.location.href = "http://localhost/parcialDosLab/principal.html";
                }
                else {
                    var divSpinner = document.getElementById("mensajeError");
                    divSpinner.style.display = "inline";
                }
            }
        };
        Manejadora.MostrarTabla = function () {
            var userLoggeadoJSON = localStorage.getItem("user_loggeado");
            var dataJSON = localStorage.getItem("datos_usuarios");
            var userLoggeado = JSON.parse("" + userLoggeadoJSON);
            var listado = JSON.parse("" + dataJSON);
            console.log(userLoggeado);
            console.log(listado);
            var div = document.getElementById("divTabla");
            var flag = false;
            var tabla = '<div class="table-responsive">' +
                '<table class="table table-striped" id="tablaUsers">' +
                '<thead>' +
                '<th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Legajo</th><th>Foto</th>';
            if (userLoggeado != null && userLoggeado.perfil == "admin") {
                flag = true;
                tabla += '<th>Acciones</th>';
            }
            tabla += '</thead><tbody>';
            for (var index = 0; index < listado.length; index++) {
                var usuario = listado[index];
                tabla += "<tr><td>" +
                    usuario.correo + "</td><td>" +
                    usuario.nombre + "</td><td>" +
                    usuario.apellido + "</td><td>" +
                    usuario.perfil + "</td><td>" +
                    usuario.legajo + "</td><td>" +
                    "<img src='./fotos/" + usuario.foto + "'height='50' width='50'></td>";
                if (flag) {
                    tabla += "<td><button type=\"button\" class=\"btn btn-danger\" onclick='SP.Manejadora.Eliminar(\"" + usuario.correo + "\")' data-toggle=\"modal\" data-target=\"#confirmarEliminar\">Eliminar</button></td>";
                }
            }
            div.innerHTML = tabla;
            /*
            let botonesEliminar: HTMLCollection = document.getElementsByClassName('eliminar');
            for (let index = botonesEliminar.length - 1; index > -1; index--) {
                var usuarioBoton = listado[index];
                console.log(usuarioBoton);
                console.log(<HTMLButtonElement>botonesEliminar[index]);
                console.log(usuarioBoton.correo);
                Manejadora.Eliminar(usuarioBoton.correo);
                //(<HTMLButtonElement>botonesEliminar[index]).onclick = () => { Manejadora.Eliminar(usuarioBoton.correo) };
            }*/
        };
        Manejadora.Eliminar = function (correo) {
            alert(correo);
            var texto = document.getElementById("confirmarTexto");
            texto.innerHTML = "Desea eliminar el usuario con correo " + correo + "?";
            var botonConfirmar = document.getElementById('modal-btn-si');
            botonConfirmar.onclick = function () { Manejadora.EliminarUsuario(correo); };
        };
        Manejadora.EliminarUsuario = function (correo) {
            var items = localStorage.getItem("datos_usuarios");
            var listado = JSON.parse("" + items);
            var nuevoListado = new Array();
            for (var index = 0; index < listado.length; index++) {
                var usuario = listado[index];
                if (usuario.correo === correo) {
                    //salteo el usuario
                    continue;
                }
                else {
                    nuevoListado.push(usuario);
                }
            }
            localStorage.setItem("datos_usuarios", JSON.stringify(nuevoListado));
            Manejadora.MostrarTabla();
        };
        return Manejadora;
    }());
    SP.Manejadora = Manejadora;
})(SP || (SP = {}));
