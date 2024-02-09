<template>
    <div class="container center" style="text-align: center;">
        <div class="content">
            <h2>Lista de Clientes</h2>
            <table>
                <thead class="table table-striped table-bordered table-td-valign-middle">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Celular</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes" :key="cliente.id">
                        <td>{{ cliente.id }}</td>
                        <td>{{ cliente.name }}</td>
                        <td>{{ cliente.email }}</td>
                        <td>{{ cliente.celular }}</td>
                        <td>
                            <button @click="editarCliente(cliente.id)">Editar</button>
                            <button @click="eliminarCliente(cliente.id)">Eliminar</button>
                        </td>
                    </tr>
                    <tr v-if="clienteEditando">
                        <td colspan="5">
                            <form @submit.prevent="guardarEdicion">
                                <label for="name">Nombre:</label>
                                <input type="text" id="name" v-model="clienteActual.name" required>
                                <label for="email">Email:</label>
                                <input type="text" id="email" v-model="clienteActual.email" required>
                                <label for="celular">Celular:</label>
                                <input type="text" id="celular" v-model="clienteActual.celular" required>
                                <button type="submit">Guardar cambios</button>
                                <button type="button" @click="cancelarEdicion">Cancelar</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            clientes: [],
            clienteActual: null,
            clienteEditando: null
        };
    },
    created() {
        this.obtenerClientes();
    },
    methods: {
        async obtenerClientes() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clientes');
                this.clientes = response.data;
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        },
        async editarCliente(clienteId) {
            this.clienteActual = { ...this.clientes.find(cliente => cliente.id === clienteId) };
            this.clienteEditando = clienteId;
        },
        async guardarEdicion() {
            try {
                await axios.put(`http://127.0.0.1:8000/api/clientes/${this.clienteEditando}`, this.clienteActual);
                this.clienteActual = null;
                this.clienteEditando = null;
                this.obtenerClientes(); // Actualizar la lista de clientes después de editar uno
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
            }
        },
        cancelarEdicion() {
            this.clienteActual = null;
            this.clienteEditando = null;
        },
        async eliminarCliente(clienteId) {
            if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/clientes/${clienteId}`);
                    this.obtenerClientes(); // Actualizar la lista de clientes después de eliminar uno
                } catch (error) {
                    console.error('Error al eliminar cliente:', error);
                }
            }
        }
    }
};
</script>
