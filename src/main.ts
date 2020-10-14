import { createApp, App } from 'vue';
import AppComponent from './App.vue';
import './registerServiceWorker';
import { VuePluginClass } from '@/plugin';
import { RouterGuardClass } from '@/router/guard';
import './styles/style';

const app: App = createApp(AppComponent);

VuePluginClass.getInstance(app).usePlugins();
RouterGuardClass.getInstance().beforeEach();

app.mount('#app');
