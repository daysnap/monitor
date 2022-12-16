export interface SdkConfig {
  accountId?: string // 用户id
  appName?: string // 应用名称
  appId?: string // 应用id
  sendJsError?: boolean // 是否发送js报错
  sendRequest?: boolean // 是否发送请求日志
  sendPv?: boolean // 是否发送页面访问日志
  uploadUrl: string // 上传api
  spa: boolean //  是否是spa
  [key: string]: any
}
export enum LogTypes {// 0-api请求 1-api响应 2-js错误 3-页面访问 4-其他
  req,
  res,
  jse,
  pv,
  ot
}
export interface Log {
  appName?: string
  appId?: string
  accountId?: string | Function
  type: LogTypes
  data: Record<string, any> | string
}
