<template>
    <div class="container center">
        <div class="content">
            <h1 style="text-align: center;">Registrar Préstamo</h1>
            <formulario-registrar-prestamo />
            <formulario-ver-prestamo />
        </div>
    </div>
</template>

<script>
import FormularioPrestamo from '../prestamos/RegistrarPrestamo.vue';
import VerPrestamo from '../prestamos/VerPrestamo.vue';

export default {
    components: {
        'formulario-registrar-prestamo': FormularioPrestamo,
        'formulario-ver-prestamo': VerPrestamo,
    }
}
</script>
