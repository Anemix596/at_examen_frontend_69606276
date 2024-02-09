<template>
    <div class="container center">
        <div class="content">
            <h2 style="text-align: center;">Formulario libro</h2>
            <h5>Agregar Nuevo Libro</h5>
            <form @submit.prevent="agregarLibro" class="form">
                <div class="container">
                    <label for="titulo" class="form-label">Título:</label>
                    <input type="text" class="form-control" id="titulo" v-model="nuevoLibro.titulo" required>
                    <label for="description" class="form-label">Descripción:</label>
                    <input type="text" class="form-control" id="description" v-model="nuevoLibro.description" required>
                    <label for="lote" class="form-label">Cantidad:</label>
                    <input type="text" class="form-control" id="lote" v-model="nuevoLibro.lote" required>

                    <formulario-autor @autor-seleccionado="actualizarAutor"></formulario-autor>
                    <formulario-autor-agregar @autor-agregado="actualizarListaAutores"></formulario-autor-agregar>
                </div>
                <!-- Agrega otros campos del libro aquí -->
                <button class="btn btn-success" type="submit">Agregar Libro</button>
            </form>
            <br>
            <formulario-ver-libro />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FormularioAutor from '../autores/FormularioAutor.vue';
import FormularioAutorAgregar from '../autores/FormularioAutorAgregar.vue';
import VerLibro from '../libros/VerLibro.vue';


export default {
    components: {
        'formulario-autor': FormularioAutor,
        'formulario-autor-agregar': FormularioAutorAgregar,
        'formulario-ver-libro': VerLibro
    },
    data() {
        return {
            nuevoLibro: {
                titulo: '',
                description: '',
                lote: '',
                autor_id: ''
            },
            autores: []
        };
    },
    mounted() {
        this.obtenerAutores();
    },
    methods: {
        agregarLibro() {
            axios.post('http://127.0.0.1:8000/api/libros', this.nuevoLibro)
                .then(response => {
                    console.log('Libro agregado:', response.data);
                    // Actualiza la lista de libros o realiza alguna acción adicional
                })
                .catch(error => {
                    console.error('Error al agregar el libro:', error);
                });
        },
        obtenerAutores() {
            axios.get('http://127.0.0.1:8000/api/autores')
                .then(response => {
                    this.autores = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de autores:', error);
                });
        },
        actualizarListaAutores() {
            setTimeout(() => {
                this.obtenerAutores();
            }, 1000); // Espera 1 segundo (1000 milisegundos) antes de volver a cargar los autores
        },
        actualizarAutor(autorSeleccionado) {
            this.nuevoLibro.autor_id = autorSeleccionado;
        }
    }
}
</script>
