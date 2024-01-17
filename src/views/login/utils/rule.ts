import { reactive } from "vue";
import type { FormRules } from "element-plus";

const loginRules = reactive(<FormRules>{
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        }
        else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
});

export { loginRules };
