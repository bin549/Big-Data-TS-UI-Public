<script setup lang="ts">
import Motion from "./utils/motion";
import {useRoute, useRouter} from "vue-router";
import {message} from "@/utils/message";
import {loginRules} from "./utils/rule";
import {useNav} from "@/layout/hooks/useNav";
import type {FormInstance} from "element-plus";
import {useLayout} from "@/layout/hooks/useLayout";
import {avatar, nan} from "./utils/static";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import {ref, reactive, onMounted, onBeforeUnmount} from "vue";
import {useDataThemeChange} from "@/layout/hooks/useDataThemeChange";

import {setToken, getToken} from "@/utils/auth";
import {addPathMatch} from "@/router/utils";
import {usePermissionStoreHook} from "@/store/modules/permission";

import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import Lock from "@iconify-icons/ri/lock-fill";
import User from "@iconify-icons/ri/user-3-fill";

import {getLogin} from "@/api/user";
import md5 from "js-md5";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const ruleFormRef = ref<FormInstance>();

const {initStorage} = useLayout();
initStorage();

const {dataTheme, dataThemeChange} = useDataThemeChange();
dataThemeChange();
const {title} = useNav();

const ruleForm = reactive({
  username: "",
  password: ""
});

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      getLogin({
        username: ruleForm.username,
        password: md5(ruleForm.password)
      })
        .then(res => {
          if (res.code === 200) {
            message("登录成功", {type: "success"});
            const roles = [];
            roles.push(res.data.roleType);
            usePermissionStoreHook().handleWholeMenus([]);
            addPathMatch();
            const token = getToken().accessToken;
            setToken({
              username: ruleForm.username,
              roles: roles,
              accessToken: token
            } as any);
            router.push("/");
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

function onkeypress({code}: KeyboardEvent) {
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
    <div class="head-motion"/>
    <div class="head-motion1">
      <h1>小青牛大数据分析平台</h1>
    </div>
    <div class="login-container">
      <div class="left-img">
        <nan class="nan"/>
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="con-picture">
            <avatar class="avatar"/>
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
