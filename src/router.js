import { createRouter, createWebHistory } from 'vue-router';
/* import App from './App.vue'; */
import Libro from './components/libros/FormularioLibro.vue';
import Autor from './components/autores/VerAutor.vue';
import Cliente from './components/clientes/FormularioCliente.vue';
import Prestamo from './components/prestamos/FormularioPrestamos.vue';
import PrimerReporte from './components/reportes/ClientesConLibrosVencidos.vue';
import SegundoReporte from './components/reportes/ListaPrestamosSegmentados.vue';
/* import About from './components/Autor.vue'; */

const routes = [
    //{ path: '/', component: App },
    { path: '/libro', component: Libro },
    { path: '/autor', component: Autor },
    { path: '/cliente', component: Cliente },
    { path: '/prestamo', component: Prestamo },
    { path: '/primer_reporte', component: PrimerReporte },
    { path: '/segundo_reporte', component: SegundoReporte }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;