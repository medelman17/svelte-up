import fs from 'fs'
import globalDirectories from 'global-dirs'

// returns if current sup bin is installed globally
export function isCurrentBinInstalledGlobally(): 'npm' | 'yarn' | false {
  try {
    const realSupPath = fs.realpathSync(process.argv[1])
    const usingGlobalYarn =
      realSupPath.indexOf(globalDirectories.yarn.packages) === 0
    const usingGlobalNpm =
      realSupPath.indexOf(fs.realpathSync(globalDirectories.npm.packages)) === 0

    if (usingGlobalNpm) {
      return 'npm'
    }
    if (usingGlobalYarn) {
      return 'yarn'
    } else {
      false
    }
  } catch (e) {
    //
  }
  return false
}
