import { Command } from 'commander/esm.mjs';
import fs from 'fs';
import path from 'path';
import copydir from 'copy-dir';
import { log, dirname } from './util/base.js';

const program = new Command();
program.option('-f, --force', 'force to initialize. Existed Zhaobox will be overwritten.');
program.parse();

log.debug('User directory is', process.env.HOME);

const TEMPLATE_PATH = path.resolve(dirname(import.meta), '../template');
const RC_FILE_PATH = path.join(process.env.HOME, '.zhaoboxrc');
const ZHAOBOX_PATH = path.join(process.env.HOME, '.zhaobox');
log.debug(TEMPLATE_PATH);

/**
 * check if exists
 */
if (fs.existsSync(RC_FILE_PATH) && !program.opts().force) {
  log.error('Zhaobox exists, cannot be initialized again.', 'info:', 'Use -f or --force to overwrite.');
  process.exit(1);
}

/**
 * create rc file
 */
fs.copyFileSync(path.join(TEMPLATE_PATH, 'zhaoboxrc'), RC_FILE_PATH);
log.success(RC_FILE_PATH, 'created successfully!');

/**
 * create .zhaobox, .zhaobox/lib in $HOME
 */
// if .zhaobox exists, backup existed .zhaobox
if (fs.existsSync(ZHAOBOX_PATH)) {
  const backupPath = ZHAOBOX_PATH + '.backup.' + Date.now();
  fs.renameSync(ZHAOBOX_PATH, backupPath);
  log.warning(ZHAOBOX_PATH, `${ZHAOBOX_PATH} exists. Backup it to ${backupPath}`);
}
copydir.sync(path.join(TEMPLATE_PATH, 'zhaobox'), ZHAOBOX_PATH);
log.success(ZHAOBOX_PATH, 'created successfully!');


export default program;