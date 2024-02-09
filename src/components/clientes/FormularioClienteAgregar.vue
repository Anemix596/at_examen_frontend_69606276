<template>
    <div class="container center">
        <div class="content">
            <h2 style="text-align: center;">Agregar Cliente</h2>
            <form @submit.prevent="agregarCliente">
                <label for="name" class="form-label">Nombre:</label>
                <input class="form-control" type="text" id="name" v-model="name" required>
                <label for="email" class="form-label">Email:</label>
                <input class="form-control" type="email" id="email" v-model="email" required>
                <label for="celular" class="form-label">Celular:</label>
                <input class="form-control" type="text" id="celular" v-model="celular" required>
                <button class="btn btn-success" type="submit">Agregar Cliente</button>
            </form>
        </div> 
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: '',
            celular: ''
        };
    },
    methods: {
        agregarCliente() {
            const nuevoCliente = {
                name: this.name,
                email: this.email,
                celular: this.celular
            };
            axios.post('http://127.0.0.1:8000/api/clientes', nuevoCliente)
                .then(response => {
                    console.log('Cliente agregado:', response.data);
                    // Emitir evento cliente-agregado
                    this.$emit('cliente-agregado');
                    // Resetear el formulario después de agregar el cliente
                    this.resetForm();
                })
                .catch(error => {
                    console.error('Error al agregar cliente:', error);
                });
        },
        resetForm() {
            // Método para resetear el formulario después de agregar un cliente
            this.name = '';
            this.email = '';
            this.celular = '';
        }
    }
}
</script>
