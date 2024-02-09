<template>
    <div>
        <form @submit.prevent="registrarPrestamo">

            <formulario-libro @libro-seleccionado="actualizarLibro"></formulario-libro>

            <formulario-cliente @cliente-seleccionado="actualizarCliente"></formulario-cliente>
            <div class="col-lg-12">
                <div class="row center">
                    <div class="col-lg-5">
                        <label class="form-label" for="fecha_prestamo">Fecha de Préstamo:</label>
                    </div>
                    <div class="col-lg-7">
                        <input class="form-control" type="date" v-model="nuevoPrestamo.fecha_prestamo" required>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="row center">
                    <div class="col-lg-5">
                        <label class="form-label" for="fecha_prestamo">Dias de Préstamo:</label>
                    </div>
                    <div class="col-lg-7">
                        <input class="form-control" type="text" v-model="nuevoPrestamo.dias_prestamo" required>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="row center">
                    <div class="col-lg-5">
                        <label class="form-label" for="fecha_prestamo">Cantidad Dsiponible:</label>
                    </div>
                    <div class="col-lg-7">
                        <input class="form-control" type="number" v-model="cantidadDisponible" readonly>
                    </div>
                </div>
            </div>
            <button style="margin: auto;" class="btn btn-info" type="submit" :disabled="cantidadDisponible <= 0">Registrar Préstamo</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import FormularioClienteSeleccionar from '../clientes/FormularioClienteSeleccionar.vue';
import FormularioLibroSeleccionar from '../libros/FormularioLibroSeleccionar.vue';

export default {
    components: {
        'formulario-cliente': FormularioClienteSeleccionar,
        'formulario-libro': FormularioLibroSeleccionar
    },
    data() {
        return {
            nuevoPrestamo: {
                libro_id: null,
                cliente_id: null,
                fecha_prestamo: '',
                dias_prestamo: '',
                fecha_devolucion: ''
            },
            cantidadDisponible: null,
            libros: [],
            clientes: []
        };
    },
    created() {
        this.obtenerLibros();
        this.obtenerClientes();
    },
    methods: {
        async obtenerLibros() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/libros');
                this.libros = response.data;
            } catch (error) {
                console.error('Error al obtener libros:', error);
            }
        },
        async obtenerClientes() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/clientes');
                this.clientes = response.data;
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        },
        async actualizarLibro(libroSeleccionado) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/prestamos/${libroSeleccionado.id}/lote`);
                this.cantidadDisponible = response.data.lote;
                this.nuevoPrestamo.libro_id = libroSeleccionado.id;
            } catch (error) {
                console.error('Error al obtener la cantidad disponible:', error);
            }
        },
        async actualizarCliente(clienteSeleccionadoId) {
            this.nuevoPrestamo.cliente_id = clienteSeleccionadoId;
        },
        async registrarPrestamo() {
            try {
                await axios.post('http://127.0.0.1:8000/api/prestamos', this.nuevoPrestamo);
                this.nuevoPrestamo = {
                    libro_id: null,
                    cliente_id: null,
                    fecha_prestamo: '',
                    dias_prestamo: '',
                    fecha_devolucion: ''
                };
                this.cantidadDisponible = null;
                alert('Préstamo registrado exitosamente');
            } catch (error) {
                console.error('Error al registrar préstamo:', error);
            }
        }
    }
};
</script>
