/// <reference path="node_modules/@types/jquery/index.d.ts" />

function mostrarMensaje() {
    //let archivo : any = (<HTMLInputElement>document.getElementById("foto"));
    let archivo = $("#foto");
    let formData : FormData = new FormData();
    //formData.append("archivo", archivo.files[0]);
    formData.append("archivo", archivo.prop("files")[0]);
    formData.append("mensaje", "" +  $("#mensaje").val());
    $.ajax({
        type: "POST",
        url: "./test.php",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        async: true
      })
      .done(function (objJson) {
          if(objJson.Ok){
              $("#foto-display").attr("src", objJson.pathFoto);
              $("#div_mensaje").html("Mensaje: " + objJson.mensaje + " - Fecha: " + objJson.fecha);
          } else{
            console.log(objJson);
          }
          
      })
      .fail(function(err) {
        console.log(err);
    });
    /*
    $.ajax({
      type: "POST",
      url: "./test.php",
      data: "mensaje=" + $("#mensaje").val(),
      dataType: "json"
    }).done(function (respuesta) {
      console.log(respuesta);
    }).fail(function(err) {
      console.log(err);
    });*/
}