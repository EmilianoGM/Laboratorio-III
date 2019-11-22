var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo, marca, precio) {
            this.codigo = codigo;
            this.marca = marca;
            this.precio = precio;
        }
        Producto.prototype.ToString = function () {
            return '"codigo":' + this.codigo + ',"marca":"' + this.marca + '","precio":' + this.precio;
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto) {
            if (pathFoto === void 0) { pathFoto = ""; }
            var _this = _super.call(this, codigo, marca, precio) || this;
            _this.tipo = tipo;
            _this.paisOrigen = paisOrigen;
            _this.pathFoto = pathFoto;
            return _this;
        }
        Televisor.prototype.ToJson = function () {
            return '{' + _super.prototype.ToString.call(this) + ',"tipo":"' + this.tipo + '","paisOrigen":"' + this.paisOrigen +
                '","pathFoto":"' + this.pathFoto + '"}';
        };
        return Televisor;
    }(Entidades.Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
/// <reference path="./Televisor.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function (caso) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var codigo = +document.getElementById("codigo").value;
            var marca = document.getElementById("marca").value;
            var precio = +document.getElementById("precio").value;
            var tipo = document.getElementById("tipo").value;
            var paisOrigen = document.getElementById("pais").value;
            var foto = document.getElementById("foto");
            var pathFoto = codigo + ".jpg";
            var televisor = new Entidades.Televisor(codigo, marca, precio, tipo, paisOrigen, pathFoto);
            var form = new FormData();
            var cadenaJson = televisor.ToJson();
            form.append('foto', foto.files[0]);
            form.append('caso', caso);
            form.append('cadenaJson', cadenaJson);
            xhttp.send(form);
            Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var respuestaJson = JSON.parse(xhttp.responseText);
                    if (caso == "modificar" && respuestaJson.TodoOK == false) {
                        console.log("No se pudo modificar");
                        alert("No se pudo modificar");
                    }
                    else {
                        Manejadora.MostrarTelevisores();
                        console.log(xhttp.responseText);
                    }
                    Manejadora.LimpiarForm();
                }
            };
        };
        Manejadora.MostrarTelevisores = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var caso = "traer";
            xhttp.send("caso=" + caso);
            Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var listado = JSON.parse(xhttp.responseText);
                    var div = document.getElementById("divTabla");
                    var tabla = "<table border='1'>" +
                        "<tr><td>Codigo</td><td>Marca</td><td>Precio</td><td>Tipo</td><td>Pais</td>" +
                        "<td>Foto</td>" +
                        "</tr>";
                    var tablaDos = "<table border='1'>" +
                        "<tr><td>Codigo</td><td>Marca</td><td>Precio</td><td>Tipo</td><td>Pais</td>" +
                        "<td>Foto</td><td>Acciones</td>" +
                        "</tr>";
                    for (var index = 0; index < listado.length; index++) {
                        var televisor = listado[index];
                        /*tabla += "<tr><td>" + televisor["codigo"] + "</td><td>" + televisor["marca"] + "</td><td>" +
                        televisor["precio"] + "</td><td>"+ televisor["tipo"] + "</td><td>"+ televisor["paisOrigen"] +
                        "</td><td><img src='./BACKEND/fotos/" + televisor["pathFoto"] + "'height='100' width='100'></td></tr>";*/
                        tablaDos += "<tr><td>" + televisor["codigo"] + "</td><td>" + televisor["marca"] + "</td><td>" +
                            televisor["precio"] + "</td><td>" + televisor["tipo"] + "</td><td>" + televisor["paisOrigen"] +
                            "</td><td><img src='./BACKEND/fotos/" + televisor["pathFoto"] + "'height='100' width='100'></td>" +
                            '<td><input type="button" class="eliminar" value="Eliminar" />' +
                            '<input type="button" class="modificar" value="Modificar" /></td>' +
                            "</tr>";
                    }
                    tabla += "</table>";
                    tablaDos += "</table>";
                    Manejadora.AdministrarSpinner(false);
                    div.innerHTML = tablaDos;
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_1 = function (index) {
                        botonesEliminar[index].onclick = function () { Manejadora.EliminarTelevisor(listado[index]); };
                    };
                    for (var index = 0; index < botonesEliminar.length; index++) {
                        _loop_1(index);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_2 = function (index) {
                        botonesModificar[index].onclick = function () { Manejadora.ModificarTelevisor(listado[index]); };
                    };
                    for (var index = 0; index < botonesModificar.length; index++) {
                        _loop_2(index);
                    }
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var caso = "traer";
            xhttp.send("caso=" + caso);
            Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var listado = JSON.parse(xhttp.responseText);
                    localStorage.setItem("televisores_local_storage", JSON.stringify(listado));
                    if (localStorage.getItem("televisores_local_storage") != null) {
                        console.log("local storage hecho");
                    }
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            if (localStorage.getItem("televisores_local_storage") != null) {
                var flag = true;
                var items = localStorage.getItem("televisores_local_storage");
                var listado = JSON.parse("" + items);
                var codigo = +document.getElementById("codigo").value;
                for (var index = 0; index < listado.length; index++) {
                    var televisor = listado[index];
                    if (televisor["codigo"] == codigo) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    Manejadora.AgregarTelevisor("agregar");
                    Manejadora.GuardarEnLocalStorage();
                    console.log("Agregado");
                }
                else {
                    console.log("Ya existe");
                    alert("Ese televisor ya ha sido agregado");
                }
            }
        };
        Manejadora.EliminarTelevisor = function (televisor) {
            if (window.confirm('Desea eliminar el televisor código ' + televisor.codigo + ', de tipo ' + televisor.tipo + '?')) {
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "./BACKEND/administrar.php", true);
                xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                var caso = "eliminar";
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
        };
        Manejadora.ModificarTelevisor = function (televisor) {
            document.getElementById("codigo").value = televisor.codigo;
            document.getElementById("codigo").readOnly = true;
            document.getElementById("marca").value = televisor.marca;
            document.getElementById("precio").value = televisor.precio;
            document.getElementById("tipo").value = televisor.tipo;
            document.getElementById("pais").value = televisor.paisOrigen;
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\' + televisor.pathFoto;
            var boton = document.getElementById("btn-agregar");
            boton.value = "Modificar";
            boton.onclick = function () { Manejadora.AgregarTelevisor('modificar'); };
        };
        Manejadora.FiltrarTelevisoresPorPais = function () {
            var paisOrigen = document.getElementById("pais").value;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var caso = "traer";
            xhttp.send("caso=" + caso);
            Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var listado = JSON.parse(xhttp.responseText);
                    var div = document.getElementById("divTabla");
                    var tablaDos = "<table border='1'>" +
                        "<tr><td>Codigo</td><td>Marca</td><td>Precio</td><td>Tipo</td><td>Pais</td>" +
                        "<td>Foto</td><td>Acciones</td>" +
                        "</tr>";
                    for (var index = 0; index < listado.length; index++) {
                        var televisor = listado[index];
                        if (televisor.paisOrigen == paisOrigen) {
                            tablaDos += "<tr><td>" + televisor["codigo"] + "</td><td>" + televisor["marca"] + "</td><td>" +
                                televisor["precio"] + "</td><td>" + televisor["tipo"] + "</td><td>" + televisor["paisOrigen"] +
                                "</td><td><img src='./BACKEND/fotos/" + televisor["pathFoto"] + "'height='100' width='100'></td>" +
                                '<td><input type="button" class="eliminar" value="Eliminar" />' +
                                '<input type="button" class="modificar" value="Modificar" /></td>' +
                                "</tr>";
                        }
                    }
                    tablaDos += "</table>";
                    Manejadora.AdministrarSpinner(false);
                    div.innerHTML = tablaDos;
                    var botonesEliminar = document.getElementsByClassName('eliminar');
                    var _loop_3 = function (index) {
                        botonesEliminar[index].onclick = function () { Manejadora.EliminarTelevisor(listado[index]); };
                    };
                    for (var index = 0; index < botonesEliminar.length; index++) {
                        _loop_3(index);
                    }
                    var botonesModificar = document.getElementsByClassName('modificar');
                    var _loop_4 = function (index) {
                        botonesModificar[index].onclick = function () { Manejadora.ModificarTelevisor(listado[index]); };
                    };
                    for (var index = 0; index < botonesModificar.length; index++) {
                        _loop_4(index);
                    }
                    Manejadora.LimpiarForm();
                }
            };
        };
        Manejadora.CargarPaises = function () {
            var selectPaises = document.getElementById('pais');
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            var caso = "paises";
            xhttp.send("caso=" + caso);
            Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    Manejadora.AdministrarSpinner(false);
                    var listadoPaises = JSON.parse(xhttp.responseText);
                    console.log(xhttp.responseText);
                    ;
                    for (var index = selectPaises.options.length; index >= 0; index--) {
                        selectPaises.remove(index);
                    }
                    for (var index = 0; index < listadoPaises.length; index++) {
                        var opcion = new Option(listadoPaises[index].descripcion);
                        selectPaises.add(opcion);
                    }
                }
            };
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("codigo").value = '';
            document.getElementById("codigo").readOnly = false;
            document.getElementById("marca").value = '';
            document.getElementById("precio").value = '';
            document.getElementById("tipo").value = '';
            document.getElementById("pais").value = 'Argentina';
            document.getElementById("foto").value = '';
            document.getElementById("imgFoto").src = '.\\BACKEND\\fotos\\tv_defecto.jpg';
            var boton = document.getElementById("btn-agregar");
            boton.value = "Agregar";
            boton.onclick = function () { Manejadora.AgregarTelevisor('agregar'); };
        };
        Manejadora.AdministrarSpinner = function (mostrar) {
            var divSpinner = document.getElementById("divSpinner");
            if (mostrar == true) {
                divSpinner.style.display = "inline";
            }
            else {
                divSpinner.style.display = "none";
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
