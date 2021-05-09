import { Command } from 'commander/esm.mjs';
import fs from 'fs-extra';
import path, { resolve } from 'path';
import { dirname, os } from '../util/base.js';
import { ZHAOBOX_PATH } from '../constant/index.js';
import Ora from 'ora';
import execa from 'execa';
import log from '@glorywong/log';

const program = new Command();
program
  .action(function() {
    installHomeBrew();
  })
  .parse();

function installHomeBrew() {
  const ora = Ora('Install homebrew');
  try {
    execa.sync('/bin/bash', ['-c', '"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"']);
    ora.succeed();
  } catch (error) {
    ora.fail('Install home brew failed: ' + error);
  }
}