$(document).ready(function () {
    SP.Manejadora.CargarLocalStorage();
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
                        message: 'El correo es requerido.'
                    },
                    emailAddress: {
                        message: 'El correo no tiene un formato valido'
                    }/*,
                    stringLength: {
                        min: 3,
                        message: 'El mínimo de caracteres admitido es de 3.'
                    }*/
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La contraseña es requerida.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Por favor, ingrese entre 4 y 8 caracteres.'
                    }
                }
            }
        }
    })
    //SI SUPERA TODAS LAS VALIDACIONES, SE PROVOCA EL SUBMIT DEL FORM
    .on('success.form.bv', function (e) {
        e.preventDefault();
        SP.Manejadora.VerificarExistencia();
    });

});