import { Command } from 'commander/esm.mjs';
import fs from 'fs-extra';
import path from 'path';
import { readLibConfig } from '../util/base.js';
import Ora from 'ora';
import { LIB_PATH } from '../constant/index.js';

const program = new Command();
program
  .arguments('[lib...]')
  .option('-a, --all', 'collect all libs')
  .addHelpText('after', '\nHint: `lib` refers to a lib name in lib.config.json')
  .action(function(lib, options) {
    if (lib.length) {
      collectLibs(lib);
      return;
    }
    if (options.all) {
      collectAllLibs();
      return;
    }
    this.help({ error: true });
  })
  .parse();

function getLibsFromConfig() {
  try {
    const { libs } = readLibConfig();

    if (!libs) {
      throw new Error('`libs` does not exist in lib.config.');
    }

    if (!Array.isArray(libs)) {
      throw new Error('`libs` format error: should be Array type');
    }

    if (!libs.length) {
      throw new Error('`libs` is empty');
    }

    return libs;
  } catch (error) {
    throw error; 
  }
}

function _collectLib({ name, location }) {
  if (!location) {
    throw new Error(`'${location}' of '${name}' does not exist.`);
  }

  try {
    const libDir = path.join(LIB_PATH, name);
    fs.mkdirsSync(libDir);
    for (const key in location) {
      fs.copySync(location[key], path.join(libDir, key));
    }
  } catch (error) {
    throw error;
  }
}

function _collectLibs(names) {
  try {
    let libs = getLibsFromConfig();

    if (names && names.length) {
      libs = libs.filter(({ name: _name }) => names.includes(_name));
    }

    libs.forEach((lib) => {
      _collectLib(lib);
    });
  } catch (error) {
    throw error;
  }
}

function collectLibs(names) {
  const ora = new Ora();
  try {
    ora.start(`Copy libs \`${names.join(', ')}\` from original location`);
    _collectLibs(names);
    ora.succeed();
  } catch (error) {
    ora.fail('Copy libs from original location failed: ' + error);
  }
}

function collectAllLibs() {
  const ora = new Ora();
  try {
    ora.start('Copy all libs from original location');
    _collectLibs();
    ora.succeed();
  } catch (error) {
    ora.fail('Copy all libs from original location failed: ' + error);
  }
}

export default program;