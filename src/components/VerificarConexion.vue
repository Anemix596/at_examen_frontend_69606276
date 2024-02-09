<template>
    <div>
        <h1>Verificar Conexión</h1>
        <p v-if="responseData">{{ responseData }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            responseData: null,
            error: null
        };
    },
    methods: {
        verificarConexion() {
            axios.get('http://127.0.0.1:8000/api/verificar-conexion')
                .then(response => {
                    this.responseData = response.data.message;
                })
                .catch(error => {
                    this.error = 'Error al conectar con el backend'+error.message;
                });
        }
    },
    mounted() {
        this.verificarConexion();
    }
}
</script>
