import { Command } from 'commander/esm.mjs';
import { ZHAOBOX_PATH } from '../constant/index.js';
import Ora from 'ora';
import execa from 'execa';
import { initGit } from './_git.js';

const program = new Command();
program
  .action(function() {
    initGit();
    download();
  })
  .parse();

function download() {
  const ora = Ora('Pull from remote repository.').start();
  try {
    execa.sync('git', ['pull', 'origin', 'master'], {
      cwd: ZHAOBOX_PATH
    });
    ora.succeed();
  } catch (error) {
    ora.fail('Pull from remote repository: ' + error);
    process.exit(1);
  }
}