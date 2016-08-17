import rc = require('rc')

import { PROJECT_NAME } from './utils/constants'
import { Config } from './config'

export interface OldConfig {
  username: string,
  repositoryNamePrefix: string,
  repositoryOrganization: string,
  testFramework: 'blue-tape',
  browserTestHarness: 'tape-run+jspm',
  license: 'Apache-2.0' | 'MIT' | 'unlicense' | 'BSD-2-Clause-FreeBSD' | 'BSD-3-Clause' | 'ISC' | 'nolicense',
  licenseSignature: string
}

export function createDefaultConfig(): Config {
  // const { username } = loadGitConfig()
  const username = ''
  return {
    githubUsername: username,
    githubOrganization: username,
    license: 'MIT',
    licenseSignature: username,
    mode: 'with-test',
    features: ['source', 'travis']
  }
}

export function readRaw() {
  const defaultConfig = createDefaultConfig()
  const config = readConfig()
  // the `config` property is assed by `rc` storing location of the file.
  if (!(config as any).config) {
    const oldConfig = readOldConfig()
    return (oldConfig as any).config ? convertOldConfig(oldConfig) : defaultConfig
  }

  return config
}

export function readConfig(): Config {
  return rc(PROJECT_NAME) as Config
}

export function readOldConfig(): OldConfig {
  return rc('generator-typings') as OldConfig
}

export function convertOldConfig(oldConfig: OldConfig): Config & { config: string } {
  return {
    githubUsername: oldConfig.username,
    githubOrganization: oldConfig.repositoryOrganization,
    license: oldConfig.license,
    licenseSignature: oldConfig.licenseSignature,
    mode: 'with-test',
    features: [],
    serverTestFramework: oldConfig.testFramework,
    browserTestFramework: oldConfig.testFramework,
    browserTestHarness: oldConfig.browserTestHarness,
    config: (oldConfig as any).config
  }
}
