<template>
    <div>
        <h2>Lista de Préstamos Segmentados por Semana y Mes</h2>
        <div v-for="(mes, mesIndex) in prestamos" :key="mesIndex">
            <h3>{{ mesIndex }}</h3>
            <div v-for="(semana, semanaIndex) in mes" :key="semanaIndex">
                <h4>Semana {{ semanaIndex }}</h4>
                <p>El autor más popular esta semana es: {{ semana.autor }}</p>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cliente</th>
                            <th>Título del Libro</th>
                            <th>Autor</th>
                            <th>Fecha de Préstamo</th>
                            <th>Días de Préstamo</th>
                            <th>Fecha de Devolución</th>
                            <th>Estado del Préstamo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(prestamo, prestamoIndex) in semana.prestamos" :key="prestamoIndex">
                            <td>{{ prestamoIndex + 1 }}</td>
                            <td>{{ prestamo.cliente.name }}</td>
                            <td>{{ prestamo.libro.titulo }}</td>
                            <td>{{ prestamo.libro.autor.name }}</td>
                            <td>{{ formatDate(prestamo.fecha_prestamo) }}</td>
                            <td>{{ prestamo.dias_prestamo }}</td>
                            <td>{{ formatDate(prestamo.fecha_devolucion) }}</td>
                            <td>{{ prestamo.estado }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
        this.obtenerPrestamosSegmentados();
    },
    methods: {
        async obtenerPrestamosSegmentados() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/prestamos/segundo-reporte');
                this.prestamos = response.data;
            } catch (error) {
                console.error('Error al obtener préstamos segmentados:', error);
            }
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString();
        }
    },
};
</script>
