import { Command } from 'commander/esm.mjs';
import fs from 'fs-extra';
import path from 'path';
import { dirname, log } from '../util/base.js';
import { ZHAOBOX_PATH } from '../constant/index.js';
import Ora from 'ora';
import execa from 'execa';
import { initGit } from './_git.js';

const program = new Command();
program
  .action(function() {
    initGit();
    upload();
  })
  .parse();

function upload() {
  const ora = Ora('Push to remote repository.').start();
  try {
    execa.sync('git', ['add', '*'], {
      cwd: ZHAOBOX_PATH
    });
    execa.sync('git', ['commit', '-m', `upload (${Date.now()})`], {
      cwd: ZHAOBOX_PATH
    });
    execa.sync('git', ['push', 'origin', 'master'], {
      cwd: ZHAOBOX_PATH
    });
    ora.succeed();
  } catch (error) {
    ora.fail('Push to remote repository: ' + error);
    process.exit(1);
  }
}