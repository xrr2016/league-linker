import fs from 'node:fs'
// 导入原生模块，需要确保 la-tools-win64.node 文件存在于正确的路径
import toolkit from './la-tools-win64.node'

const WMIC_PATH = 'C:\\Windows\\System32\\wbem\\WMIC.exe'

export function checkWmicAvailability() {
  const isExists = fs.existsSync(WMIC_PATH)
  if (!isExists) {
    throw new Error('WMIC unavailable, League Akari relies on this tool to obtain process information')
  }
}

export function queryUxCommandLineNative(clientName: string) {
  let stdout = ''
  const pids = toolkit.getPidsByName(clientName)
  console.log(pids)

  try {
    const stdout = toolkit.getCommandLine1(pids[0])
    return stdout
  } catch (e) {
    console.error(e)
  }

  return stdout
}
