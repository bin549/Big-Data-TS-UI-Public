import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/store";
import ElementPlus from "element-plus";
import { getServerConfig } from "./config";
import { createApp, Directive } from "vue";
import { MotionPlugin } from "@vueuse/motion";
// import { useEcharts } from "@/plugins/echarts";
import { injectResponsiveStorage } from "@/utils/responsive";
import "uno.css";
// import Table from "@pureadmin/table";
// import PureDescriptions from "@pureadmin/descriptions";

import axios from "axios";
import "./style/reset.scss";
import "./style/index.scss";
import "./style/tailwind.css";
import "element-plus/dist/index.css";
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);

import * as directives from "@/directives";
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

// 全局注册`@iconify/vue`图标库
import {
  IconifyIconOffline,
  IconifyIconOnline,
  FontIcon
} from "./components/ReIcon";
app.component("IconifyIconOffline", IconifyIconOffline);
app.component("IconifyIconOnline", IconifyIconOnline);
app.component("FontIcon", FontIcon);

// 全局注册按钮级别权限组件
import { Auth } from "@/components/ReAuth";
app.component("Auth", Auth);

getServerConfig(app).then(async config => {
  app.use(router);
  await router.isReady();
  injectResponsiveStorage(app, config);
  setupStore(app);
  app.use(MotionPlugin).use(ElementPlus);
  // .use(useEcharts);
  // .use(Table);
  // .use(PureDescriptions);
  app.mount("#app");
});

// 添加请求拦截器
// 拦截器的第一部分，第二部分在router index.js里面
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (window.localStorage.getItem("token")) {
    config.headers.common["Access-Token"] =
      window.localStorage.getItem("token");
  }
  return config;
});
