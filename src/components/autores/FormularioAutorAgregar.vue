<template>
    <div class="modal fade" id="modal-dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Agregar Nuevo Autor</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="agregarAutor">
                        <label for="name" class="form-label">Nombre del Autor</label>
                        <input type="text" class="form-control" id="name" v-model="nuevoAutor.name" required>
                        <br>
                        <button type="submit" class="btn btn-success">Agregar Autor</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            nuevoAutor: {
                name: ''
            }
        };
    },
    methods: {
        agregarAutor() {
            axios.post('http://127.0.0.1:8000/api/autores', this.nuevoAutor)
                .then(response => {
                    console.log('Autor agregado:', response.data);
                    this.$emit('autor-agregado'); // Emitir evento autor-agregado
                })
                .catch(error => {
                    console.error('Error al agregar el autor:', error);
                });
        }
    }
}
</script>
