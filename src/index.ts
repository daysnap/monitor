import jsError from "./jsError";
import requset from "./request";

export function init(opt: any) {
  // 默认参数
  const config = {
    sendJsError: true,// 上报js error
    sendRequest: true,// 上报请求日志
    ...opt
  }
  // window.$monitorConfig = config
  config.sendJsError && jsError(config)
  config.sendRequest && requset(config)
}

export const monitor = {
  init
}

export default monitor
