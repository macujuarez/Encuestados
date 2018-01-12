/*
 Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function (preguntaId) {
    this.modelo.borrarPregunta(preguntaId);
  },
  editarPregunta: function (preguntaId, nombre) {
    console.log("-|| CONTROLADOR => EDITAR PREGUNTA")
    this.modelo.editarPregunta(preguntaId, nombre);
  },
  borrarTodasPreguntas: function () {
    this.modelo.borrarTodasPreguntas();
  },
  agregarVoto: function(pregunta,respuestaTexto){
    this.modelo.agregarVoto(pregunta,respuestaTexto);
  },
  cargarPreguntas: function(){
    return this.modelo.cargarPreguntas();
  },
};

