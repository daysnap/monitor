import { SdkConfig } from "./types"
import { logger } from "./log"

export default function (config: SdkConfig) {
  console.log('sendRequest', config)
  const win = window
  const xhrProto = window.XMLHttpRequest.prototype
  const originalOpen = xhrProto.open
  const originalSend = xhrProto.send

  xhrProto.open = function (method: string, url: string) {
    console.log(this.getResponseHeader(this), [...arguments])
    // 定制逻辑
    logger([...arguments])
    originalOpen.apply(this, [...arguments])
  }
  xhrProto.send = function () {
    const _this = this
    // 定制逻辑
    function handler() {
      if(_this.readyState === 4){
        logger(_this.response)
      }
    }
    const originalStateChange = _this.onreadystatechange
    _this.onreadystatechange = function () {
      handler.apply(this, [...arguments])
      originalStateChange && originalStateChange.apply(this, [...arguments])
    }
    return originalSend.apply(this, [...arguments])
  }
}
