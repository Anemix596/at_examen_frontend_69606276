/* import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app') */

/* import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app'); */

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el enrutador desde el archivo router.js
import 'bootstrap/dist/css/bootstrap.min.css';

// Crea una aplicación Vue y monta la instancia del enrutador
createApp(App).use(router).mount('#app');


