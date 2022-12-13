import jsError from "./jsError";
import requset from "./request";
import pv from "./pv"
import { SdkConfig } from './types'

export function init(opt: SdkConfig) {
  // 默认参数
  const config = {
    sendJsError: true,// 上报js error
    sendRequest: true,// 上报请求日志
    sendPv: true,
    spa: true,
    ...opt
  }
  // @ts-ignore
  window.$monitorConfig = config

  config.sendJsError && jsError(config)
  config.sendRequest && requset(config)
  config.sendPv && pv(config)
}
