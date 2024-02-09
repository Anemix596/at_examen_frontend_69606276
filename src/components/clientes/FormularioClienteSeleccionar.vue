<template>
    <div>
        <h5>Seleccionar Cliente:</h5>
        <select class="form-select" v-model="clienteSeleccionado" @change="seleccionarCliente" required>
            <option value="">Seleccionar...</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.name }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            clientes: [],
            clienteSeleccionado: null
        };
    },
    mounted() {
        this.obtenerClientes();
    },
    methods: {
        obtenerClientes() {
            axios.get('http://127.0.0.1:8000/api/clientes')
                .then(response => {
                    this.clientes = response.data;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de clientes:', error);
                });
        },
        seleccionarCliente() {
            this.$emit('cliente-seleccionado', this.clienteSeleccionado);
        }
    }
}
</script>
