<template>
    <div>
        <h2>Lista de Clientes con Libros Prestados Vencidos</h2>
        <table>
            <thead>
                <tr>
                    <th>Número</th>
                    <th>Cliente</th>
                    <th>Título del Libro</th>
                    <th>Fecha de Préstamo</th>
                    <th>Días de Devolución</th>
                    <th>Fecha Probable Devolución</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(clienteId, index) in Object.keys(prestamos)" :key="index">
                    <template v-for="(prestamo, prestamoIndex) in prestamos[clienteId]" :key="prestamoIndex">
                        <td>{{ prestamoIndex + 1 }}</td>
                        <td>{{ prestamo.cliente.name }}</td>
                        <td>{{ prestamo.libro.titulo }}</td>
                        <td>{{ formatDate(prestamo.fecha_prestamo) }}</td>
                        <td>{{ prestamo.dias_prestamo }}</td>
                        <td>{{ formatDate(prestamo.fecha_devolucion) }}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            prestamos: {},
        };
    },
    mounted() {
        this.obtenerPrestamos();
    },
    methods: {
        async obtenerPrestamos() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/prestamos/primer-reporte');
                this.prestamos = response.data;
            } catch (error) {
                console.error('Error al obtener préstamos:', error);
            }
        },
        formatDate(dateString) {
            const parts = dateString.split(' ');
            return parts[0];
        }
    },
};
</script>
