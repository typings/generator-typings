'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('beta', function() {
  describe('npm dryrun', function() {
    before(function() {
      this.timeout(60000);
      return helpers.run(path.join(__dirname, '../generators/beta'))
        .withPrompts({
          sourceDeliveryType: 'npm',
          sourceDeliveryPackageName: 'nop',
          sourceUsages: ['commonjs'],
          sourcePlatforms: ['node'],
          usePresetValues: false,
          useExistingRepository: false,
          username: 'unional',
          repositoryOrganization: 'typed-typings',
          repositoryName: 'npm-nop',
          repositoryNamePrefix: 'typed-',
          testFramework: 'blue-tape',
          browserTestHarness: 'tape-run+jspm',
          license: 'MIT',
          licenseSignature: 'unional'
        })
        .withOptions({
          skipGit: true
        })
        .toPromise();
    });

    it('creates files', function() {
    });
  });
  describe.skip('http dryrun', function() {
    before(function(done) {
      this.timeout(60000);
      helpers.run(path.join(__dirname, '../generators/beta'))
        .withPrompts({
          sourceDeliveryType: 'http',
          sourceDeliveryPackageName: '6px',
          sourceDeliveryUrl: 'https://cdnjs.cloudflare.com/ajax/libs/6px/1.0.3/6px.min.js',
          sourceUsages: ['script'],
          sourceVersion: '1.0.3',
          sourcePlatforms: ['browser'],
          useExistingRepository: false,
          username: 'unional',
          fullname: 'Homa Wong',
          email: 'homawong@gmail.com',
          repositoryOrganization: 'typed-typings',
          repositoryNamePrefix: 'typed-',
          testFrameworkInNode: 'blue-tape',
          testFrameworkInBrowser: 'blue-tape',
          license: 'MIT'
        })
        .withOptions({
          skipInstall: true
        })
        .on('end', done);
    });

    it('creates files', function() {
    });
  });
  describe.skip('bower dryrun', function() {
    before(function(done) {
      this.timeout(60000);
      helpers.run(path.join(__dirname, '../generators/beta'))
        .withPrompts({
          sourceDeliveryType: 'bower',
          sourceDeliveryPackageName: 'domready',
          sourceUsages: ['commonjs'],
          sourcePlatforms: ['node'],
          useExistingRepository: false,
          username: 'unional',
          repositoryOrganization: 'typed-typings',
          repositoryNamePrefix: 'typed-',
          testFrameworkInNode: 'blue-tape',
          testFrameworkInBrowser: 'blue-tape',
          license: 'MIT'
        })
        .on('end', done);
    });

    it('creates files', function() {
    });
  });
});
