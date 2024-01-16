<script setup lang="ts">
import Motion from "./utils/motion";
import { useRoute, useRouter } from "vue-router";
import { message } from "@/utils/message";
import { loginRules } from "./utils/rule";
import { useNav } from "@/layout/hooks/useNav";
import type { FormInstance } from "element-plus";
import { useLayout } from "@/layout/hooks/useLayout";
// import { useUserStoreHook } from "@/store/modules/user";
import { avatar, nan } from "./utils/static";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
// import { initRouter } from "@/router/utils";

import { setToken, getToken } from "@/utils/auth";
import { addPathMatch } from "@/router/utils";
import { usePermissionStoreHook } from "@/store/modules/permission";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";

import { getLogin } from "@/api/user";
// md5加密
import md5 from "js-md5";
// import axios from "axios";

// defineOptions({
//   name: "Login"
// });
// import { myStorage } from "@/utils/timer";
import SIdentify from "@/layout/components/Sidentify.vue";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const { initStorage } = useLayout();
initStorage();

const { dataTheme, dataThemeChange } = useDataThemeChange();
dataThemeChange();
const { title } = useNav();

const ruleForm = reactive({
  username: "",
  password: ""
});

/* 随机图形验证码 */
//获取路由器
const sidentifyMode = ref(""); //输入框验证码
const identifyCode = ref(""); //图形验证码
const identifyCodes = ref("1234567890abcdefjhijklinopqrsduvwxyz"); //验证码出现的数字和字母

//组件挂载
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes.value, 4);
});

// 生成随机数
const randomNum = (min, max) => {
  max = max + 1;
  return Math.floor(Math.random() * (max - min) + min);
};
// 随机生成验证码字符串
const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)];
  }
};
// 更新验证码
const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes.value, 4);
};

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 动态路由方式
      // useUserStoreHook()
      //   .loginByUsername({
      //     username: ruleForm.username,
      //     password: sha1(md5(ruleForm.password))
      //   })
      //   .then(res => {
      //     if (res.code === 200) {
      //       // 获取后端路由
      //       initRouter().then(() => {
      //         router.push("/");
      //         message("登录成功", { type: "success" });
      //       });
      //     }
      //   });
      getLogin({
        username: ruleForm.username,
        password: md5(ruleForm.password)
      })
        .then(res => {
          if (res.code === 200) {
            const roles = [];
            roles.push(res.data.roleType);
            // 全部采取静态路由模式
            usePermissionStoreHook().handleWholeMenus([]);
            addPathMatch();
            // //获取token
            // const token = ref("");
            // axios.post(baseUrlApi("user/login")).then(function (response) {
            //   token.value = response.headers["Authorization"];
            // });
            // console.log(token);
            const token = getToken().accessToken;
            setToken({
              username: ruleForm.username,
              roles: roles,
              // 设置token
              accessToken: token
              //accessToken: "eyJhbGciOiJIUzUxMiJ9.admin"
              //accessToken: res.data["Authentication-Token"]
            } as any);

            //验证验证码不为空
            if (!sidentifyMode.value) {
              message("验证码不能为空！", { type: "error" });
              loading.value = false;
              return;
            }
            //验证验证码是否正确
            if (sidentifyMode.value != identifyCode.value) {
              message("验证码错误！", { type: "error" });
              loading.value = false;
              refreshCode();
              return;
            } else {
              router.push("/");
              message("登录成功", { type: "success" });
            }
            // myStorage.setItem({
            //   name: "token",
            //   value: "123123",
            //   expires: 60000 //设置过期时间为30分钟
            // });
            // 定时器
            //   const intervalId = window.setInterval(function logname() {
            //     const getFlag = myStorage.getItem("token");
            //     // console.log(token);
            //     if (getFlag === false) {
            //       localStorage.clear();
            //       alert("登录已过期,请重新登录");
            //       router.push("/Login");
            //       clearInterval(intervalId); // 取消定时器
            //     }
            //     console.log("测试过期");
            //   }, 3000); // 每隔1分钟测试一次
          } else {
            message("登录失败！用户名或者密码不正确，请重新输入", {
              type: "error"
            });
            loading.value = false;
            return fields;
          }
        })
        .catch(error => {
          console.log(error);
          loading.value = false;
          return fields;
        });
    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div class="select-none">
    <div class="flex-c absolute right-5 top-3">
      <!-- 主题 -->
      <div class="top-0">
        <el-switch
          v-model="dataTheme"
          inline-prompt
          :active-icon="dayIcon"
          :inactive-icon="darkIcon"
          @change="dataThemeChange"
        />
      </div>
    </div>
    <!-- 头部head -->
    <div class="head-motion" />
    <div class="head-motion1">
      <h1>小青牛大数据分析平台</h1>
    </div>
    <div class="login-container">
      <!-- 左侧图片 -->
      <div class="left-img">
        <nan class="nan" />
      </div>
      <!-- 登录容器 -->
      <div class="login-box">
        <div class="login-form">
          <div class="con-picture">
            <avatar class="avatar" />
          </div>
          <div class="login-title">
            <Motion>
              <h2 class="outline-none">{{ title }}</h2>
            </Motion>
          </div>
          <el-form
            label-position="top"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="loginRules"
            size="large"
          >
            <Motion :delay="100">
              <el-form-item
                label="账号"
                :rules="[
                  {
                    required: true,
                    message: '请输入账号',
                    trigger: 'blur'
                  }
                ]"
                prop="username"
              >
                <el-input
                  clearable
                  v-model="ruleForm.username"
                  placeholder="账号"
                  :prefix-icon="useRenderIcon(User)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item
                prop="password"
                label="密码"
                :rules="[
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  clearable
                  show-password
                  v-model="ruleForm.password"
                  placeholder="密码"
                  :prefix-icon="useRenderIcon(Lock)"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-form-item
                label="验证码"
                :rules="[
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input
                  placeholder="请输入验证码"
                  v-model="sidentifyMode"
                  clearable
                />
              </el-form-item>
              <!-- 使用验证码组件 -->
              <div class="code" @click="refreshCode">
                <SIdentify :identifyCode="identifyCode" />
              </div>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
