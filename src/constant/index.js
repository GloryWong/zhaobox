import path from 'path';

const RC_FILE_PATH = path.join(process.env.HOME, '.zhaoboxrc');
const ZHAOBOX_PATH = path.join(process.env.HOME, '.zhaobox');
const LIB_PATH = path.join(ZHAOBOX_PATH, 'lib');
const LIB_CONFIG_PATH = path.join(ZHAOBOX_PATH, 'lib.config.json');
const KIT_PROXY_CONFIG_PATH = path.join(ZHAOBOX_PATH, 'kit.proxy.config.json');

export {
  RC_FILE_PATH,
  ZHAOBOX_PATH,
  LIB_PATH,
  LIB_CONFIG_PATH,
  KIT_PROXY_CONFIG_PATH
};