import axios from "axios";
import router from "./router/router";
import { Message, Loading } from "element-ui";
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,0.7)"
  });
}
function endLoading() {
  loading.close();
}
//请求拦截
axios.interceptors.request.use(
  config => {
    //加载动画
    startLoading();
    if (localStorage.eleToken) {
      //设置统一请求的header
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截
axios.interceptors.response.use(
  response => {
    //结束加载动画
    endLoading();
    return response;
  },
  error => {
    //错误提醒
    endLoading();
    Message.error(error.response.data);
    //获取状态码
    const { status } = error.response;
    if (status == 401) {
      Message.error("Token已经失效，请重新登录！");
      //清除token
      localStorage.removeItem("eleToken");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
export default axios;
