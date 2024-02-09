<template>
    <div class="container center">
        <div class="content">
            <formulario-autor-agregar @autor-agregado="actualizarListaAutores"></formulario-autor-agregar>
            <h2 style="text-align: center;">Lista de Autores</h2>
            <table class="table table-striped table-bordered table-td-valign-middle">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(autor, index) in autores" :key="autor.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ autor.name }}</td>
                        <td>
                            <button @click="editarAutor(autor)" class="btn btn-info">Editar</button>&nbsp;
                            <button @click="confirmarEliminar(autor)" class="btn btn-success">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Formulario para editar autor -->
            <div v-if="autorEdit" class="editar-autor-form">
                <h3>Editar Autor</h3>
                <form @submit.prevent="guardarCambiosAutor">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" v-model="autorEdit.name">
                    </div>
                    <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FormularioAutorAgregar from '../autores/FormularioAutorAgregar.vue';

export default {
    data() {
        return {
            autores: [],
            autorEdit: null
        };
    },
    components: {
        'formulario-autor-agregar': FormularioAutorAgregar
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
        editarAutor(autor) {
            this.autorEdit = { ...autor };
        },
        guardarCambiosAutor() {
            axios.put(`http://127.0.0.1:8000/api/autores/${this.autorEdit.id}`, { name: this.autorEdit.name })
                .then(() => {
                    console.log('Autor editado:', this.autorEdit);
                    this.autorEdit = null;
                    this.obtenerAutores();
                })
                .catch(error => {
                    console.error('Error al editar el autor:', error);
                });
        },
        confirmarEliminar(autor) {
            if (confirm(`¿Estás seguro de que deseas eliminar al autor "${autor.name}"?`)) {
                this.eliminarAutor(autor);
            }
        },
        eliminarAutor(autor) {
            axios.delete(`http://127.0.0.1:8000/api/autores/${autor.id}`)
                .then(() => {
                    console.log('Autor eliminado:', autor);
                    this.obtenerAutores();
                })
                .catch(error => {
                    console.error('Error al eliminar el autor:', error);
                });
        }
    }
};
</script>
