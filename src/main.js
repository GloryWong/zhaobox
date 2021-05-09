import { Command } from 'commander';
import path from 'path';
import { dirname, log } from './util/base.js';

const SUB_COMMAND_PATH = dirname(import.meta);
const VERSION = '1.0.0';

export default function exec() {
  const program = new Command();
  program
    .version(VERSION, '-v, --version', 'output the current version')
    .command('init', 'init ZhaoBox.', { executableFile: path.join(SUB_COMMAND_PATH, 'init.js')})
    .command('lib', 'manage lib.', { executableFile: path.join(SUB_COMMAND_PATH, 'lib.js')})
    .command('kit', 'tool kit', { executableFile: path.join(SUB_COMMAND_PATH, 'kit.js')})
    .parse();
}