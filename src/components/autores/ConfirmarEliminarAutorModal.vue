<template>
    <div class="modal">
        <div class="modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar este autor?</p>
            <button @click="eliminarAutor">Confirmar</button>
            <button @click="cancelar">Cancelar</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['autor'],
    methods: {
        eliminarAutor() {
            this.$emit('eliminar');
        },
        cancelar() {
            this.$emit('cerrar');
        }
    }
}
</script>
