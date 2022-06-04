import { createApp } from "vue";
import { createPinia } from "pinia";
import Page from "v-page";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Page);

app.mount("#app");
