import {LogTypes, SdkConfig} from "./types"
import {logger} from "./log"

export default function (config: SdkConfig) {
  const win = window
  let lastVisit = ''
  function onload() {
    logger({
      type: LogTypes.pv,
      data: { href: window.location.href }
    })
    lastVisit = window.location.href
  }
  function onHashChange() {
    console.log('hashchange')
    logger({
      type: LogTypes.pv,
      data: {
        spa: config.spa,
        from: lastVisit
      }
    })
    lastVisit = window.location.href
  }
  win.addEventListener('load', onload)
  win.addEventListener('hashchange', onHashChange)
}
