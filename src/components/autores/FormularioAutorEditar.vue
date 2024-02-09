<template>
    <div>
        <h2>Editar Autor</h2>
        <form @submit.prevent="editarAutor">
            <label for="nombre">Nombre:</label>
            <input type="text" id="name" v-model="autorEditado.name" required>
            <button type="submit">Guardar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['autor'],
    data() {
        return {
            autorEditado: {
                nombre: this.autor.name
            }
        };
    },
    methods: {
        editarAutor() {
            axios.put(`http://localhost:8000/api/autores/${this.autor.id}`, this.autorEditado)
                .then(response => {
                    console.log('Autor editado:', response.data);
                    this.$emit('autor-editado');
                })
                .catch(error => {
                    console.error('Error al editar autor:', error);
                });
        }
    }
}
</script>
