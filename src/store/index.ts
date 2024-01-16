import type { App } from "vue";
import { createPinia } from "pinia";
//引入pinia持久化储存插件
import piniaPluginPersist from "pinia-plugin-persist";
const store = createPinia();
//使用插件
store.use(piniaPluginPersist);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
