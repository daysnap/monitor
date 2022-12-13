import {LogTypes, SdkConfig} from "./types"
import { logger } from "./log"

export default function (config: SdkConfig) {
  const win = window
  // 原本方法
  const originalOnError = win.onerror
  function errorHandler(msg: string, source?: string, line?: number, row?: number, error?: Error) {
    if(originalOnError) {
      try {
        originalOnError.call(win, msg, source, line, row, error)
      } catch (e) {}
    }

    if(error !== null){
      logger({
        type: LogTypes.jse,
        data: { msg, source, line, row, error }
      })
    }
  }
  win.onerror = function (msg, source, line, row, error) {
    errorHandler(msg as string, source, line, row, error)
  }
}
