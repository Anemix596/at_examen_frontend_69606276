<template>
  <div class="modal">
    <div class="modal-content">
      <h2>Confirmar Eliminación</h2>
      <p>¿Estás seguro de que deseas eliminar este libro?</p>
      <button @click="eliminarLibro">Confirmar</button>
      <button @click="cancelar">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['libro'],
  methods: {
    eliminarLibro() {
      // Lógica para enviar la solicitud de eliminación al servidor
      // y luego cerrar el modal
      this.$emit('cerrar');
    },
    cancelar() {
      // Cerrar el modal sin realizar ninguna acción
      this.$emit('cerrar');
    }
  }
}
</script>
