<template>
    <div>
        <h4>Seleccionar Autor:</h4>
        <div class="form-group">
            <select class="form-select" v-model="autorSeleccionado" @change="seleccionarAutor" required>
                <option value="">Seleccionar...</option>
                <option v-for="autor in autores" :key="autor.id" :value="autor.id">{{ autor.name }}</option>
            </select><br>
            <a class="btn btn-warning" href="#modal-dialog" data-toggle="modal">Añadir autor</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            autores: [],
            autorSeleccionado: ''
        };
    },
    mounted() {
        this.obtenerAutores();
    },
    methods: {
        obtenerAutores() {
            axios.get('http://127.0.0.1:8000/api/autores')
                .then(response => {
                    this.autores = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de autores:', error);
                });
        },
        seleccionarAutor() {
            this.$emit('autor-seleccionado', this.autorSeleccionado);
        }
    }
}
</script>