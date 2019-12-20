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
        
        Manejadora.EnviarLogin();

        console.log("afuera de manejadora");
    });

    $('#registroForm').bootstrapValidator({
        message: 'El valor no es válido',
        excluded: '',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nombre: {
                validators: {
                    notEmpty: {
                        message: 'El nombre es requerido.'
                    },
                    stringLength: {
                        inclusive: true,
                        max: 10,
                        message: 'El nombre no debe exceder los 10 caracteres'
                    }
                }
            },
            apellido: {
                validators: {
                    notEmpty: {
                        message: 'El apellido es requerido.'
                    },
                    stringLength: {
                        inclusive: true,
                        max: 15,
                        message: 'El apellido no debe exceder los 15 caracteres'
                    }
                }
            },
            mail: {
                validators: {
                    notEmpty: {
                        message: 'El email es requerido.'
                    },
                    emailAddress: {
                        message: 'El email no tiene un formato valido'
                    }
                }
            },
            foto: {
                validators: {
                    notEmpty: {
                        message: 'La foto es requerida.'
                    },
                    file: {
                        extension: 'jpeg,png,jpg',
                        type: 'image/jpeg,image/png,image/jpg',
                        message: 'El archivo seleccionado debe ser jpeg o png'
                    }
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: 'La clave es requerida.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'claveDuplicada',
                        message: 'La clave debe coincidir'
                    }
                }
            },
            claveDuplicada: {
                validators: {
                    notEmpty: {
                        message: 'La clave debe ser confirmada.'
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'La clave debe tener entre 4 y 8 caracteres'
                    },
                    identical: {
                        field: 'clave',
                        message: 'La clave debe coincidir'
                    }
                }
            }
        }
    })
    .on('success.form.bv', function (e) {
        e.preventDefault();
        Manejadora.EnviarRegistro();
    });

});