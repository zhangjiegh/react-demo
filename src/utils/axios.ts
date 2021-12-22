/**
 *  参考 https://github.com/zhangjiegh/iview-admin/blob/master/src/libs/api.request.js
 */
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import type { HttpErrorLog } from "types";
const addErrorLog = (errorInfo: HttpErrorLog) => {
  const {
    statusText,
    status,
    request: { responseURL },
  } = errorInfo;
  const info = {
    type: "ajax",
    code: status,
    mes: statusText,
    url: responseURL,
  };
  // if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
};

class HttpRequest {
    baseUrl:any

    queue:any={}
  constructor(baseUrl:any) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      },
    };
    return config;
  }

  destroy(url:string) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance:AxiosInstance, url:string) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true;
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
    // 响应拦截
    instance.interceptors.response.use(
      (res: { data: any; status: any }) => {
        this.destroy(url);
        const { data, status } = res;
        return { data, status };
      },
      (error: { response: any }) => {
        this.destroy(url);
        let errorInfo = error.response;
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config,
          } = JSON.parse(JSON.stringify(error));
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url },
          };
        }
        addErrorLog(errorInfo);
        return Promise.reject(error);
      },
    );
  }

  request(options: AxiosRequestConfig<any>) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url||'');
    return instance(options);
  }
}
export default HttpRequest;
