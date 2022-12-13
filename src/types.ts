export interface SdkConfig {
  sendJsError: boolean // 是否发送js报错
  uploadUrl: string // 上传api
  [key: string]: any
}
