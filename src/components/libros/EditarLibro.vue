<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Editar Libro</h2>
            <!-- Formulario para editar el libro -->
            <form @submit.prevent="editarLibro">
                <input type="text" v-model="titulo" placeholder="Título">
                <textarea v-model="description" placeholder="Descripción"></textarea>
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['libro'],
    data() {
        return {
            titulo: this.libro.titulo,
            descripcion: this.libro.description
        };
    },
    methods: {
        editarLibro() {
            // Lógica para enviar la solicitud de edición al servidor
            // y luego cerrar el modal
            this.$emit('cerrar');
        }
    }
}
</script>

