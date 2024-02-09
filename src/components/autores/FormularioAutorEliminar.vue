<template>
    <div>
        <button @click="confirmarEliminar">Eliminar</button>

        <!-- Modal para confirmar eliminación de autor -->
        <div v-if="mostrarModalEliminar">
            <div class="modal">
                <div class="modal-content">
                    <h3>Confirmar eliminación de autor</h3>
                    <p>¿Estás seguro de que deseas eliminar este autor?</p>
                    <button @click="eliminarAutor(autor)">Eliminar</button>
                    <button @click="cerrarModal">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['autor'],
    data() {
        return {
            mostrarModalEliminar: false
        };
    },
    methods: {
        confirmarEliminar() {
            this.mostrarModalEliminar = true;
        },
        eliminarAutor(autor) {
            axios.delete(`http://127.0.0.1:8000/api/autores/${autor.id}`)
                .then(response() => {
                    console.log('Autor eliminado:', autor);
                    this.cerrarModalEliminar();
                    this.obtenerAutores();
                })
                .catch(error => {
                    console.error('Error al eliminar el autor:', error);
                });
        },


        cerrarModal() {
            this.mostrarModalEliminar = false;
        }
    }
}
</script>
