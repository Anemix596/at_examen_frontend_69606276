<template>
    <div>
        <h2>Editar Cliente</h2>
        <form @submit.prevent="guardarEdicion">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="cliente.nombre" required>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="cliente.email" required>
            <label for="celular">Celular:</label>
            <input type="text" id="celular" v-model="cliente.celular" required>
            <button type="submit">Guardar Cambios</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cliente: {
                id: null,
                nombre: '',
                email: '',
                celular: ''
            }
        };
    },
    mounted() {
        // Llama a la API para obtener los datos del cliente a editar usando this.$route.params.id
    },
    methods: {
        guardarEdicion() {
            axios.put(`http://localhost:8000/api/clientes/${this.cliente.id}`, this.cliente)
                .then(response => {
                    console.log('Cliente editado:', response.data);
                    // Aquí puedes redirigir a la página de listar clientes o hacer alguna otra acción
                })
                .catch(error => {
                    console.error('Error al editar cliente:', error);
                });
        }
    }
}
</script>
