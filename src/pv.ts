import {LogTypes, SdkConfig} from "./types"
import {logger} from "./log"

export default function (config: SdkConfig) {
  const win = window
  let lastVisit = ''
  function onload() {
    console.log('onload======>')
    logger({
      type: LogTypes.pv,
      data: { spa: config.spa, to: window.location.href }
    })
    lastVisit = window.location.href
  }
  function onHashChange() {
    console.log('hashchange======>')



    logger({
      type: LogTypes.pv,
      data: {
        spa: config.spa,
        from: lastVisit,
        to: window.location.href
      }
    })
    lastVisit = window.location.href
  }
  win.addEventListener('load', onload)
  window.addEventListener('hashchange',function(e) { console.log(e.oldURL);  console.log(e.newURL) },false);
  // win.addEventListener('hashchange', onHashChange)
}
