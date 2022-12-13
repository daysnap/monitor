import {LogTypes, SdkConfig} from "./types"
import {logger} from "./log"

export default function (config: SdkConfig) {
  console.log('sendRequest', config)
  const win = window
  const xhrProto = window.XMLHttpRequest.prototype
  const originalOpen = xhrProto.open
  const originalSend = xhrProto.send

  xhrProto.open = function () {
    console.log([...arguments])
    const [method, url, async] = [...arguments]
    // 定制逻辑
    logger({type: LogTypes.req, data: {method, url, async}})
    originalOpen.apply(this, [...arguments])
  }
  xhrProto.send = function (data) {
    const _this = this
    console.log('99', [...arguments]);
    // _this.responseType = 'json'
    // 定制逻辑
    function handler() {
      console.log('_this.readyState', _this.readyState)
      if(_this.readyState === 4){
        // _this.responseType = 'json'
        logger({
          type: LogTypes.res,
          data: {
            requestData: data,
            responseData: _this.response,
            responseHeaders: _this.getAllResponseHeaders()
          }
        }
        )
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
