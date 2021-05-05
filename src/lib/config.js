import { Command } from 'commander/esm.mjs';
import { ZHAOBOX_PATH } from '../constant/index.js';
import Ora from 'ora';
import execa from 'execa';
import { readLibConfig, writeLibConfig, log } from '../util/base.js';

const program = new Command();
program
  .option('--unset <key>')
  .action(function({ unset }, { args }) {
    if (unset) {
      unsetConfig(unset);
      return;
    }

    if (args.length === 0) {
      showAllConfig();
      return;
    }

    if (args.length > 1) {
      log.warning('Only one key=value is supported. The rest is ignored.');
    }

    const kv = args[0].split('=');
    if (kv.length === 1) {
      showConfig(kv[0]);
      return;
    }
    if (kv.length === 2) {
      setConfig(kv[0], kv[1]);
      return;
    }

    log.error('Arguments format is incorrect.');
  })
  .parse();

function unsetConfig(key) {
  try {
    writeLibConfig(key);
  } catch (error) {
    log.error(error);
  }
}

function showAllConfig() {
  try {
    log.info(readLibConfig());
  } catch (error) {
    log.error(error);
  }
}

function showConfig(key) {
  try {
    const libConfig = readLibConfig();
    let value = void 0;
    for (const _key in libConfig) {
      if (Object.hasOwnProperty.call(libConfig, _key) && key === _key) {
        value = libConfig[_key];
      }
    }

    if (value === void 0) {
      throw `\`${key}\` does not exists in lib.config`;
    }

    log.info(value);
  } catch (error) {
    log.error(error);
  }
}

function setConfig(key, value) {
  try {
    writeLibConfig(key, value);
  } catch (error) {
    log.error(error);
  }
}