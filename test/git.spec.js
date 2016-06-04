const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const extend = require('extend');
const simpleGit = require('simple-git');


const GENERATOR_NAME = 'beta';

const template = {
  username: 'unional',
  repositoryOrganization: 'unional',
  repositoryNamePrefix: 'typed-',
  testFramework: 'blue-tape',
  browserTestHarness: 'tape-run+jspm',
  license: 'MIT',
  licenseSignature: 'unional'
};

describe(`${GENERATOR_NAME} git tests`, () => {
  it('should use current and parent dir as repo name and org when it is not a git repo', () => {
    var generator;
    return helpers.run(path.join(__dirname, `../generators/${GENERATOR_NAME}`))
      .withOptions({
        skipConfiguring: true,
        skipDefault: true,
        skipWriting: true,
        skipInstall: true,
        skipGit: true
      })
      .on('ready', (gen) => {
        generator = gen;
      })
      .toPromise()
      .then((dir) => {
        var currentDir = path.basename(dir);
        var parentDir = path.basename(path.resolve(dir, '..'));
        assert.objectContent(generator.props, {
          repositoryName: currentDir,
          repositoryOrganization: parentDir,
        });
      });
  });
  it('should clone the github repo', function () {
    var generator;
    this.timeout(5000);
    return helpers.run(path.join(__dirname, `../generators/${GENERATOR_NAME}`))
      .withOptions({
        skipConfiguring: true,
        skipDefault: true,
        skipWriting: true,
        skipInstall: true
      })
      .withPrompts({
        sourceDeliveryType: 'npm',
        sourceDeliveryPackageName: 'nop',
        sourceUsages: ['commonjs'],
        sourcePlatforms: ['node'],
        usePresetValues: false,
        repositoryName: 'generator-typings-blank-repo-for-test',
        repositoryOrganization: 'typings'

      })
      .on('ready', (gen) => {
        generator = gen;
      })
      .toPromise()
      .then((dir) => {
        assert.objectContent(generator.props, {
          repositoryName: 'generator-typings-blank-repo-for-test',
          repositoryOrganization: 'typings'
        });
        assert.file('.git');
      });
  });
  it('when it is a cloned git repo', () => {
    var generator;
    return helpers.run(path.join(__dirname, `../generators/${GENERATOR_NAME}`))
      .withOptions({
        skipConfiguring: true,
        skipDefault: true,
        skipWriting: true,
        skipInstall: true,
        skipGit: true
      })
      .inTmpDir((dir) => {
        var git = simpleGit(dir);
        return new Promise((resolve) => {
          git.clone('https://github.com/typings/generator-typings-blank-repo-for-test', '.', () => {
            resolve();
          });
        });
      })
      .on('ready', (gen) => {
        generator = gen;
      })
      .toPromise()
      .then((dir) => {
        assert.objectContent(generator.props, {
          repositoryName: 'generator-typings-blank-repo-for-test',
          repositoryOrganization: 'typings',
        });
      });
  });
});
