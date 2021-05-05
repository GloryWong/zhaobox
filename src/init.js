import { Command } from 'commander/esm.mjs';
import fs from 'fs-extra';
import path from 'path';
import { log, dirname } from './util/base.js';
import { RC_FILE_PATH, ZHAOBOX_PATH } from './constant/index.js';
import execa from 'execa';
import { execSync, spawn, spawnSync } from 'child_process';

const program = new Command();
program.option('-f, --force', 'force to initialize. Existed Zhaobox will be overwritten.');
program.parse();

log.debug('User directory is', process.env.HOME);

const TEMPLATE_PATH = path.resolve(dirname(import.meta), '../template');
log.debug(TEMPLATE_PATH);

/**
 * check if exists
 */
if (fs.existsSync(RC_FILE_PATH) && !program.opts().force) {
  log.error('Zhaobox exists, cannot be initialized again.', 'Use -f or --force to overwrite.');
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
  log.warning(`${ZHAOBOX_PATH} exists. Backup it to ${backupPath}`);
}
fs.copySync(path.join(TEMPLATE_PATH, 'zhaobox'), ZHAOBOX_PATH);
log.success(ZHAOBOX_PATH, 'created successfully!');

log('Initialize finised.');


export default program;