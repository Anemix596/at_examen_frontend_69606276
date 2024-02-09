<template>
    <div>
        <h4>Lista de Registros de Préstamos</h4>
        <table class="table table-striped table-bordered table-td-valign-middle">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre Libro</th>
                    <th>Nombre Cliente</th>
                    <th>Fecha de Préstamo</th>
                    <th>Fecha de Devolucion</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="prestamo in prestamos" :key="prestamo.id">
                    <td>{{ prestamo.id }}</td>
                    <td>{{ prestamo.libro ? prestamo.libro.titulo : 'N/A' }}</td>
                    <td>{{ prestamo.cliente.name }}</td>
                    <td>{{ prestamo.fecha_prestamo }}</td>
                    <td>{{ prestamo.fecha_devolucion }}</td>
                    <td>{{ prestamo.estado }}</td>
                    <td>
                        <a href="#modal-dialog" class="btn btn-sm btn-info" data-toggle="modal" v-if="prestamo.estado !== 'Finalizado'" @click="editarPrestamo(prestamo)">Registrar Dev.</a>
                        <button class="btn btn-sm btn-danger" v-if="prestamo.estado !== 'Finalizado'" @click="eliminarPrestamo(prestamo.id)">Anular</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="modal-dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Registrar Devolución</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <b-modal v-if="prestamoActual" v-model="mostrarModal" title="Registrar Devolución">
                            <form @submit.prevent="registrarDevolucion">
                                <!-- ID del libro -->
                                <input type="hidden" id="libro_id" v-model="libroId" disabled>
                                <label for="titulo" class="form-label">Título del Libro:</label>
                                <input type="text" class="form-control" id="titulo" :value="tituloLibro" disabled>
                                <!-- ID del libro -->
                                <input type="hidden" id="cliente_id" v-model="clienteId" disabled>
                                <label for="name" class="form-label">Nombre del Cliente:</label>
                                <input type="text" class="form-control" id="name" :value="nombreCliente" disabled>
                                <!-- Fecha devolucion -->
                                <label for="fecha_devolucion" class="form-label">Fecha de Devolución:</label>
                                <input type="date" class="form-control" id="fecha_devolucion" v-model="prestamoActual.fecha_devolucion" required><br>
                                <label class="form-label" v-if="!fechaValida">¡La fecha de devolución no puede ser menor a la de préstamo!</label>
                                <label v-else>&nbsp;</label>
                                <button href="javascript:;" class="btn btn-success" type="submit" :disabled="!fechaValida">Registrar Devolución</button>
                            </form>
                        </b-modal>
                    </div>
                    <div class="modal-footer">
                        <a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
                    </div>
                </div>
            </div>
		</div>
        <!-- Modal para registrar devolucion -->
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            prestamos: [],
            prestamoActual: null,
            mostrarModal: false
        };
    },
    computed: {
        libroId() {
            return this.prestamoActual ? this.prestamoActual.libro_id : '';
        },
        tituloLibro() {
            return this.prestamoActual && this.prestamoActual.libro ? this.prestamoActual.libro.titulo : 'N/A';
        },
        clienteId() {
            return this.prestamoActual ? this.prestamoActual.cliente_id : '';
        },
        nombreCliente() {
            return this.prestamoActual && this.prestamoActual.cliente ? this.prestamoActual.cliente.name : 'N/A';
        },
        fechaValida() {
            return this.prestamoActual ? this.prestamoActual.fecha_devolucion >= this.prestamoActual.fecha_prestamo : false;
        }
    },
    created() {
        this.obtenerPrestamos();
    },
    methods: {
        async obtenerPrestamos() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/prestamos');
                this.prestamos = response.data;
            } catch (error) {
                console.error('Error al obtener prestamos:', error);
            }
        },
        editarPrestamo(prestamo) {
            this.prestamoActual = { ...prestamo }; // Clonar el prestamo para evitar modificar el original directamente
            this.mostrarModal = true;
        },
        async registrarDevolucion() {
            try {
                await axios.put(`http://127.0.0.1:8000/api/prestamos/${this.prestamoActual.id}`, this.prestamoActual);
                this.mostrarModal = false;
                this.obtenerPrestamos(); // Actualizar la lista de prestamos después de registrar la devolución
            } catch (error) {
                console.error('Error al registrar la devolución:', error);
            }
        },
        async eliminarPrestamo(prestamoId) {
            if (confirm('¿Estás seguro de que deseas finalizar este préstamo?')) {
                try {
                    await axios.put(`http://127.0.0.1:8000/api/prestamos/${prestamoId}/finalizar`);
                    this.obtenerPrestamos();
                } catch (error) {
                    console.error('Error al finalizar el préstamo:', error);
                }
            }
        }


    }
};
</script>
