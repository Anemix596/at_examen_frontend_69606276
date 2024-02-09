<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Editar Autor</h2>
            <!-- Formulario para editar el autor -->
            <form @submit.prevent="editarAutor">
                <input type="text" v-model="nombre" placeholder="Nombre">
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['autor'],
    data() {
        return {
            nombre: this.autor.name
        };
    },
    methods: {
        editarAutor() {
            this.$emit('editar', { id: this.autor.id, nombre: this.nombre });
        }
    }
}
</script>
