<template>
    <div class="container center" style="text-align: center;">
        <formulario-cliente-agregar @cliente-agregado="actualizarVerCliente" />
        <div class="content">
            <h2>Lista de Clientes</h2>
            <table class="table table-striped table-bordered table-td-valign-middle">
                <thead>
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
                            <a href="#modal-dialog1" class="btn btn-sm btn-info" data-toggle="modal" @click="editarCliente(cliente)">Editar</a>&nbsp;
                            <button class="btn btn-sm btn-danger" @click="eliminarCliente(cliente)">Eliminar</button>
                        </td>
                    </tr>
                    <div class="modal fade" id="modal-dialog1">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Editar Información Personal</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                </div>
                                <div class="modal-body">
                                    <tr v-if="clienteEditando" class="col-lg-12">
                                        <td colspan="8">
                                            <form @submit.prevent="guardarEdicion">
                                                <label for="name" class="form-label">Nombre:</label>
                                                <input type="text" class="form-control" id="name" v-model="clienteActual.name" required>
                                                <label for="email" class="form-label">Email:</label>
                                                <input type="text" class="form-control" id="email" v-model="clienteActual.email" required>
                                                <label for="celular" class="form-label">Celular:</label>
                                                <input type="text" class="form-control" id="celular" v-model="clienteActual.celular" required>
                                                <button class="btn btn-sm btn-success" type="submit">Guardar cambios</button>&nbsp;
                                                <button class="btn btn-sm btn-warning" type="button" @click="cancelarEdicion">Cancelar</button>
                                            </form>
                                        </td>
                                    </tr>
                                </div>
                                <div class="modal-footer">
                                    <a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FormularioClienteAgregar from '../clientes/FormularioClienteAgregar.vue';

export default {
    components: {
        'formulario-cliente-agregar': FormularioClienteAgregar
    },
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
        async editarCliente(cliente) {
            this.clienteActual = { ...cliente };
            this.clienteEditando = cliente.id;
        },
        async guardarEdicion() {
            try {
                console.log(this.clienteActual)
                await axios.put(`http://127.0.0.1:8000/api/clientes/${this.clienteEditando}`, this.clienteActual);
                this.clienteActual = null;
                this.clienteEditando = null;
                this.obtenerClientes(); // Actualizar la lista de clientes después de editar uno
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
            }
        },
        async eliminarCliente(cliente) {
            if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
                try {
                    await axios.delete(`http://127.0.0.1:8000/api/clientes/${cliente.id}`);
                    console.log(cliente.data)
                    this.obtenerClientes(); // Actualizar la lista de clientes después de eliminar uno
                } catch (error) {
                    console.error('Error al eliminar cliente:', error);
                }
            }
        },

        cancelarEdicion() {
            this.clienteActual = null;
            this.clienteEditando = null;
        },
        // Método para actualizar la lista de clientes después de agregar uno nuevo
        actualizarVerCliente() {
            this.obtenerClientes();
        },
    }
};
</script>
