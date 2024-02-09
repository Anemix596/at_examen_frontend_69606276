<template>
    <div class="container" style="text-align: center;">
        <div id="content" class="content" style="margin: 0%;">
            <div class="panel panel-inverse">
                <div class="panel-body">
                    <h2>Lista de Libros</h2>
                    <table id="" class="table table-striped table-bordered table-td-valign-middle">
                        <thead style="margin: 0%;">
                            <tr style="margin: 0%;">
                                <th width="1%"></th>
                                <th width="10%">Título</th>
                                <th width="10%" class="text-nowrap">Descripción</th>
                                <th width="10%" class="text-nowrap">Autor</th>
                                <th width="10%" class="text-nowrap">Acciones</th>
                            </tr>
                        </thead>
                        <tbody style="margin: 0%;">
                            <tr style="margin: 0%;" v-for="(libro, index) in libros" :key="libro.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ libro.titulo }}</td>
                                <td>{{ libro.description }}</td>
                                <td>{{ libro.autor.name }}</td>
                                <td>
                                    <a href="#modal-dialog2" class="btn btn-sm btn-info" data-toggle="modal" @click="editarLibro(libro)">Editar</a>&nbsp;
                                    <button class="btn btn-danger" @click="confirmarEliminar(libro)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-dialog2">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Editar Información del Libro</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <form v-if="mostrarFormularioEditar" @submit.prevent="actualizarLibro">
                            <h3>Editar Libros</h3>
                            <label class="form-label">Título</label>
                            <input class="form-control" type="text" v-model="libroEdit.titulo">
                            <label class="form-label">Descripción</label>
                            <input class="form-control" type="text" v-model="libroEdit.description">
                            <label class="form-label">Autor</label>
                            <input class="form-control" type="text" v-model="libroEdit.autor.name">
                            <button class="btn btn-sm btn-success" type="submit">Guardar Cambios</button>&nbsp;
                            <button class="btn btn-sm btn-info" @click="cerrarFormularioEditar">Cerrar</button>
                        </form>                
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Formulario para editar libro -->

        <!-- Formulario para confirmar eliminación de libro -->
        <form v-if="mostrarFormularioEliminar" @submit.prevent="eliminarLibro">
            <h3>Confirmar Eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar este libro?</p>
            <button type="submit">Eliminar</button>
            <button @click="cerrarFormularioEliminar">Cancelar</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            libros: [],
            mostrarFormularioEditar: false,
            mostrarFormularioEliminar: false,
            libroEdit: null,
            libroEliminar: null
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
        editarLibro(libro) {
            this.libroEdit = { ...libro }; // Clonar el objeto para evitar la mutación directa
            this.mostrarFormularioEditar = true;
        },
        actualizarLibro() {
            axios.put(`http://127.0.0.1:8000/api/libros/${this.libroEdit.id}`, this.libroEdit)
                .then(response => {
                    console.log('Libro actualizado:', response.data);
                    this.cerrarFormularioEditar();
                    this.obtenerLibros(); // Actualizar la lista de libros después de editar
                })
                .catch(error => {
                    console.error('Error al actualizar el libro:', error);
                });
        },
        eliminarLibro() {
            axios.delete(`http://127.0.0.1:8000/api/libros/${this.libroEliminar.id}`)
                .then(() => {
                    console.log('Libro eliminado:', this.libroEliminar);
                    this.cerrarFormularioEliminar();
                    this.obtenerLibros(); // Actualizar la lista de libros después de eliminar
                })
                .catch(error => {
                    console.error('Error al eliminar el libro:', error);
                });
        },
        confirmarEliminar(libro) {
            this.libroEliminar = { ...libro }; // Establecer el libro a eliminar
            this.mostrarFormularioEliminar = true;
        },
        cerrarFormularioEditar() {
            this.mostrarFormularioEditar = false;
        },
        cerrarFormularioEliminar() {
            this.mostrarFormularioEliminar = false;
        }
    }
}
</script>
