import { Command } from 'commander/esm.mjs';
import { dirname } from './util/base.js';
import path from 'path';

const program = new Command();
const SUB_COMMAND_PATH = path.join(dirname(import.meta), 'kit');

program
  .command('proxy', 'get or set proxy', { executableFile: path.join(SUB_COMMAND_PATH, 'proxy.js') })
  .parse();