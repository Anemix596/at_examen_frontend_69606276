<template>
    <div>
        <h5>Seleccionar Libro</h5>
        <select class="form-select" v-model="libroSeleccionado" @change="seleccionarLibro" required>
            <option value="">Seleccionar...</option>
            <option v-for="libro in libros" :key="libro.id" :value="libro">{{ libro.titulo }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            libros: [],
            libroSeleccionado: null // Cambiar a objeto
        };
    },
    mounted() {
        this.obtenerLibros();
    },
    methods: {
        obtenerLibros() {
            axios.get('http://127.0.0.1:8000/api/libros')
                .then(response => {
                    this.libros = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de libros:', error);
                });
        },
        seleccionarLibro() {
            this.$emit('libro-seleccionado', this.libroSeleccionado);
        }
    }
}
</script>
