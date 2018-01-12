/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasTodasBorradas.suscribir(function() {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.limpiarFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem;
    nuevoItem = $("<li>").addClass("list-group-item");
    nuevoItem.attr("id",pregunta.id);

    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);

    var textoRespuestas = "";
    for (var i = 0; i < pregunta.cantidadPorRespuesta.length; i++) {
      textoRespuestas += pregunta.cantidadPorRespuesta[i].textoRespuesta + ", ";
    }
    textoRespuestas = textoRespuestas.slice(0,-2);
    interiorItem.find('small').text(textoRespuestas);
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    if(preguntas != null){
      for (var i=0;i<preguntas.length;++i){
        lista.append(this.construirElementoPregunta(preguntas[i]));
      }
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //Agregar Pregunta
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      $('#respuesta [name="option[]"]').each(function(index) {
        if($(this).val() != ""){
          respuestas.push($(this).val());
        }
        console.log(respuestas);
      });
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });

    //Agregar Respuesta
    e.botonAgregarRespuesta.click(function () {
      //console.log("AgregandoRespuesta");
      $("#respuesta").append('<input type="text" class="form-control" name="option[]" />');
    });

    // Borrar Pregunta
    e.botonBorrarPregunta.click(function () {
      //console.log("BorrandoPregunta");
      var preguntaSeleccionada = $(".list-group-item.active").attr("id");
      //console.log("Pregunta Seleccionada: " + preguntaSeleccionada);
      contexto.controlador.borrarPregunta(preguntaSeleccionada);
    });

    // Editar Pregunta
    e.botonEditarPregunta.click(function () {
      //console.log("EditandoPregunta");
      var preguntaSeleccionada = $(".list-group-item.active").attr("id");
      if(preguntaSeleccionada != undefined){
        var nuevoNombre = window.prompt("Ingresa el Nuevo Nombre de la Pregunta:");
      if(nuevoNombre != "" && nuevoNombre != null){
        contexto.controlador.editarPregunta(preguntaSeleccionada, nuevoNombre);
        } 
      }
    });

    //Borrar todo
    e.borrarTodo.click(function (params) {
      contexto.controlador.borrarTodasPreguntas();
    })
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
