// import chalk from 'chalk';
// import fs from 'fs';
// import path from 'path';
// import { promise } from 'util';

// export default function exec(options) {
//   const { init, addedLibConf, commit } = options;
  
//   if (init) {
//     init
//   }
// }

import { Command } from 'commander';
import path from 'path';
import { dirname } from './util/base.js';

export default function exec() {
  const program = new Command();
  program
    .command('init', 'init ZhaoBox', { executableFile: path.join(dirname(import.meta), 'init.js'), isDefault: true })
    .command('add <lib...>', 'add one or more libs to zhaobox lib manager', { executableFile: path.join(dirname(import.meta), 'add-lib.js') })
    .command('upload', 'upload all libs to remote repository', { executableFile: path.join(dirname(import.meta), 'upload.js') })
    .command('download', 'download all libs from remote repository', { executableFile: path.join(dirname(import.meta), 'download.js') })
    .command('install', 'install all libs', { executableFile: path.join(dirname(import.meta), 'install.js') });

  program.parse();
}