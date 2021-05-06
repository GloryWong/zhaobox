import { ZHAOBOX_PATH } from '../constant/index.js';
import Ora from 'ora';
import fs from 'fs';
import path from 'path';
import execa from 'execa';
import { readLibConfig } from '../util/base.js';

function initGit() {
  const ora = Ora();
  ora.start('Init Git project in ZhaoBox');
  try {
    // git init
    if (!fs.existsSync(path.join(ZHAOBOX_PATH, '.git'))) {
      ora.text = 'Git Init...';
      execa.sync('git', ['init'], {
        cwd: ZHAOBOX_PATH
      });
    }

    // add remote
    ora.text = 'Git add remote repository';
    const libConfig = readLibConfig();
    const { repository } = libConfig;
    if (!repository) {
      throw '`repository` does not exist in lib.config';
    }
    try {
      execa.sync('git', ['remote', 'add', 'origin', repository], {
        cwd: ZHAOBOX_PATH
      });
    } catch (error) {
      ora.text = 'Git repository exists, set to new one';
      execa.sync('git', ['remote', 'set-url', 'origin', repository], {
        cwd: ZHAOBOX_PATH
      });
    }

    // execa.sync('git', ['branch', '-M', 'master'], {
    //   cwd: ZHAOBOX_PATH
    // });

    ora.succeed('Init Git project in ZhaoBox success.');
  } catch (error) {
    ora.fail('Init Git project in ZhaoBox: ' + error);
    process.exit(1);
  }
}

export {
  initGit
}