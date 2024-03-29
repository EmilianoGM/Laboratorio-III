///<reference path="node_modules/@types/jquery/index.d.ts"/>

// Manejadora de eventos. Asigna una funcion anonima al evento Ready 
// Este evento se dispara cuando finaliza el rendetizado de la pagina HTML

class Manejadora {

    /**
     * 
     */
    public static EnviarLogin() {
        console.log("EN login");
        let correo = <string>$("#correoLogin").val();
        let clave = <string>$("#claveLogin").val();

        let usuario = '{"correo": "' + correo + '", "clave": "' + clave + '"}';
        $.ajax({
            type: "POST",
            url: "./BACKEND/login",
            dataType: "json",
            data: "usuario=" + usuario,
        }).done(function (respuesta) {
            console.log(respuesta);
            if(respuesta.Exito){
                localStorage.setItem('token', respuesta.Jwt);
                window.location.replace('./principal.html');
            } else{
                $('#mensajeError').html("La contraseña o correo no coinciden con un usuario registrado.");
                $('#mensajeError').show();
                console.log("usuario no encontrado");
            }
        }).fail(function (e) {
            console.log("ERROR");
            console.log(e);
        }).always(function () {
        });
    }

    public static EnviarRegistro(){
        let apellido = <string>$('#apellido').val();
        let nombre = <string>$('#nombre').val();        
        let correo = <string>$('#correoRegistro').val();
        let perfil = <string>$('#perfil').val();
        let clave = <string>$('#claveRegistro').val();
        let foto = $('#foto').prop('files')[0];

        let usuario = '{"correo":"' + correo + '", "clave":"' + clave + '", "nombre":"' + nombre + '", "apellido":"' + apellido + '", "perfil":"' + perfil + '"}';

        let formData: FormData = new FormData();
        formData.append("usuario", usuario);
        formData.append("foto", foto);

        $.ajax({
            type: "POST",
            url: "../BACKEND/usuarios",
            dataType: "json",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,            
        })
            .done(function (respuesta: any) {
                $('#registro').hide();
                $('.modal-backdrop').hide();
                if(respuesta.Exito){
                    console.log("Agregado");
                } else {
                    $('#mensajeError').html(respuesta.Mensaje);
                    $('#mensajeError').show();
                }
                
            }).fail(function (e) {
                console.log("ERROR");
                console.log(e);
            }).always(function () {
            });
    }

    public static CargarListadoUsuarios() {
        let token = <string>localStorage.getItem('token');
        let lista = Manejadora.VerificarJWT(token);
        if(lista[0] ){
            $.ajax({
                type: "GET",
                url: "../BACKEND/",
                dataType: "json",
                headers: {
                    "token": token
                }
            })
                .done(function (respuesta: any) {
                    var usuario = lista[1];
                    if(respuesta.Exito){
                        let tabla = Manejadora.TablaUsuarios(usuario.perfil, respuesta.Listado);
                        $('#listadoUsuarios').html(tabla);
                    }
                   
                })
                .fail(function (respuesta: any) {
                    console.log("ERROR");
                    console.log(respuesta);
                })
                .always(function () {
                });
        }
    }

    public static VerificarJWT(token: any){
        var lista:any[] = new Array(2);
        lista[0] = false;
        $.ajax({
            type: "POST",
            url: "./BACKEND/usuarioJWT",
            dataType: "json",
            data: 'usuarioJWT={"jwt":"' + token +'"}',
        })
            .done(function (respuesta: any) {
                console.log("Conecto con verificar");
                console.log(respuesta);
                lista[0] = respuesta.Exito;
                if(respuesta.Exito){
                    lista[1] = respuesta.Usuario;
                }
            })
            .fail(function (respuesta: any) {
                console.log(respuesta);
                console.log("error verificar");
            })
            .always(function () {
            });
        return lista;
    }

    public static CargarListadoAutos() {
        let token = <string>localStorage.getItem('token');
        let lista = Manejadora.VerificarJWT(token);
        if(lista[0] ){
            $.ajax({
                type: "GET",
                url: "../BACKEND/listado",
                dataType: "json",
                headers: { "token": token }
            })
                .done(function (respuesta: any) {
                    var usuario = lista[1];
                    if(respuesta.Exito){
                        let tabla = Manejadora.TablaAutos(usuario.perfil, respuesta.Listado);
                        $('#listadoUsuarios').html(tabla);
                        if (usuario.perfil == 'propietario') {
                            Manejadora.FuncionalidadBotonesBorrar(respuesta.listado);
                            Manejadora.FuncionalidadBotonesModificar(respuesta.listado);
                        }
                        else if (usuario.perfil == 'encargado') {
                            Manejadora.FuncionalidadBotonesModificar(respuesta.listado);
                        }
                    }
                })
                .fail(function (respuesta: any) {
                    
                })
                .always(function () {
                });
        }

       
    }

    public static FuncionalidadBotonesBorrar(listado: any) {
        let token = <string>localStorage.getItem('token');
        let lista = Manejadora.VerificarJWT(token);
        if(lista[0] ){
            let botones = <HTMLCollection>document.getElementsByClassName('borrar');
            for (let i = 0; i < botones.length; i++) {
                botones[i].addEventListener('click', function () {
                    $('#confirmarTexto').html('Se eliminara el ' + listado[i].marca + ' ' + listado[i].modelo + '. ¿Esta seguro?');
                    $('#modal-btn-si').click(function () {
                        Manejadora.EliminarAuto(listado[i].id);
                    });
                
                    $('#modal-btn-no').click(function () {
                        $('#alertText').html('Se cancelo la eliminacion del auto');
                        $('.alert').show();
                    });
                });
            }
        }     
    }

    public static FuncionalidadBotonesModificar(autos: any) {
        let token = <string>localStorage.getItem('token');
        let lista = Manejadora.VerificarJWT(token);
        if(lista[0] ){
            let botones = <HTMLCollection>document.getElementsByClassName('modificar');
            for (let i = 0; i < botones.length; i++) {
                botones[i].addEventListener('click', function () {
                    $('#id').val(autos[i].id);
                    $('#marca').val(autos[i].marca);
                    $('#color').val(autos[i].color);
                    $('#precio').val(autos[i].precio);
                    $('#modelo').val(autos[i].modelo);
                });
            }
        } else{
            alert('Se venció la sesión. Vuelva a iniciar sesión')
        }
        
        
    }

    public static EliminarAuto(id:number){
        let token = <string>localStorage.getItem('token');
        let lista = Manejadora.VerificarJWT(token);
        if(lista[0] ){
            $.ajax({
                type: "DELETE",
                url: "../BACKEND/autos",
                //dataType: "json",
                data: 'id=' + id,
            })
                .done(function (respuesta: any) {
                    if(respuesta.Exito){
                        Manejadora.CargarListadoAutos();
                    }            
                })
                .fail(function (respuesta: any) {
                    console.log("ERROR");
                    console.log(respuesta);
                })
                .always(function () {
                });
        }
    }

    public static ModificarAuto() {
        let id = $('#id').val();
        let marca = $('#marca').val();
        let color = $('#color').val();
        let precio = $('#precio').val();
        let modelo = $('#modelo').val();

        let auto = '{"id": "' + id + '", "marca": "' + marca + '", "color": "' + color + '", "precio": "' + precio + '", "modelo": "' + modelo + '"}';

        $.ajax({
            type: "PUT",
            url: "../BACKEND/autos",
            dataType: "json",
            data: "auto=" + auto,
        })
            .done(function (respuesta: any) {
                $('#modificarAuto').hide();
                $('.modal-backdrop').hide();
                if(respuesta.Exito){
                    Manejadora.CargarListadoAutos();
                } else{
                    $('#alertText').html('No se pudo modificar el auto');
                    $('.alert').show();
                }
            })
            .fail(function () {
            })
            .always(function () {
            });
    }

    public static TablaUsuarios(perfil: any, listado: any) {
        let tabla = "<table class='table table-striped'>";
        tabla += "<tr>";
        tabla += "<td>CORREO</td>";
        tabla += "<td>NOMBRE</td>";
        tabla += "<td>APELLIDO</td>";
        tabla += "<td>PERFIL</td>";
        tabla += "<td>FOTO</td>";
        tabla += "</tr>";
        for (let i = 0; i < listado.length; i++) {
            tabla += "<tr>";
            tabla += "<td>" + listado[i].correo + "</td>";
            tabla += "<td>" + listado[i].nombre + "</td>";
            tabla += "<td>" + listado[i].apellido + "</td>";
            tabla += "<td>" + listado[i].perfil + "</td>";
            if (perfil == 'empleado') {
                tabla += "<td><img class='img-rounded' heigth='50px' width='50px' src='../BACKEND/" + listado[i].foto + "'/></td>";
            }
            else if (perfil == 'encargado') {
                tabla += "<td><img class='img-thumbnail' heigth='50px' width='50px' src='../BACKEND/" + listado[i].foto + "'/></td>";
            }
            else {
                tabla += "<td><img heigth='50px' width='50px' src='../BACKEND/" + listado[i].foto + "'/></td>";
            }
            tabla += "</tr>";
        }
        tabla += "</table>";
        return tabla;
    }


    public static TablaAutos(perfil: any, listado: any) {
        let tabla = "<table class='table'>";
        tabla += "<tr>";
        tabla += "<td>ID</td>";
        tabla += "<td>MARCA</td>";
        tabla += "<td>COLOR</td>";
        tabla += "<td>PRECIO</td>";
        tabla += "<td>MODELO</td>";
        if (perfil == 'propietario') {
            tabla += "<td>ACCIONES</td>";
        }
        tabla += "</tr>";
        for (let i = 0; i < listado.length; i++) {
            tabla += "<tr>";
            tabla += "<td>" + listado[i].id + "</td>";
            tabla += "<td>" + listado[i].marca + "</td>";
            tabla += "<td>" + listado[i].color + "</td>";
            tabla += "<td>" + listado[i].precio + "</td>";
            tabla += "<td>" + listado[i].modelo + "</td>";
            if (perfil == 'propietario') {
                tabla += "<td><button type='button' class='btn btn-danger borrar' data-toggle='modal' data-target='#confirmarEliminar'>BORRAR</button>";
                tabla += "<button type='button' class='btn btn-warning modificar' data-toggle='modal' data-target='#modificarAuto'>MODIFICAR</button></td>";

            }
            else if (perfil == 'encargado') {
                tabla += "<td><button type='button' class='btn btn-warning modificar' data-toggle='modal' data-target='#modificarAuto'>MODIFICAR</button></td>";
            }
            tabla += "</tr>";
        }
        tabla += "</table>";
        return tabla;
    }
}