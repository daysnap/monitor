import {Log} from "./types";

export function logger(log: Log){
  // @ts-ignore
  const { accountId = '', appId = '', appName = '' } = window.$monitorConfig
  // 上报日志
  const localLogs = JSON.parse(localStorage.getItem('$monitorLog')) ?? []

  localLogs.push({
    ...log,
    accountId: accountId instanceof Function ? accountId() : accountId,
    appId,
    appName,
    time: +new Date(),
  })
  localStorage.setItem('$monitorLog', JSON.stringify(localLogs))
  if(localLogs.length === 10){// 达到上限就上传
    console.log('上传日志：', localLogs)
    localStorage.removeItem('$monitorLog')
  }
}
