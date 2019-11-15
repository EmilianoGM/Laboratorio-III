$(document).ready(function () {

    $("#loginForm").bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            correo: {
                validators: {
                    notEmpty: {
                        message: 'El correo es requerido!!!'
                    },
                    stringLength: {
                        min: 3,
                        message: 'El mínimo de caracteres admitido es de 3!!!'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida!!!'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: 'Por favor, ingrese entre 6 y 20 caracteres!!!'
                    }
                }
            }
        }
    })
    //SI SUPERA TODAS LAS VALIDACIONES, SE PROVOCA EL SUBMIT DEL FORM
    .on('success.form.bv', function (e) {

        Loggeo();

    });

});
/*
function Loggeo() {
    var xhttp = new XMLHttpRequest();
    //METODO; URL; ASINCRONICO?
    xhttp.open("POST", "./api.php/login/", true);
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
            console.log("ok");
        }
    };
}
*/