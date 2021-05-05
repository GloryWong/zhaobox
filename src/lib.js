import { Command } from 'commander/esm.mjs';
import { dirname } from './util/base.js';
import path from 'path';

const program = new Command();
const SUB_COMMAND_PATH = path.join(dirname(import.meta), 'lib');

program
  .command('config [key-value]', 'get or set lib config', { executableFile: path.join(SUB_COMMAND_PATH, 'config.js') })
  .command('collect', 'collect libs to ZhaoBox lib', { executableFile: path.join(SUB_COMMAND_PATH, 'collect.js') })
  .command('upload', 'upload all libs to remote repository', { executableFile: path.join(SUB_COMMAND_PATH, 'upload.js') })
  .command('download', 'download all libs from remote repository', { executableFile: path.join(SUB_COMMAND_PATH, 'download.js') })
  .command('install', 'install all libs', { executableFile: path.join(SUB_COMMAND_PATH, 'install.js') })
  .parse();