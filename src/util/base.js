import path from 'path';
import { LIB_CONFIG_PATH, KIT_PROXY_CONFIG_PATH } from '../constant/index.js';
import jsonfile from 'jsonfile';

function filename(imporMeta) {
  return new URL(imporMeta.url).pathname;
}

function dirname(importMeta) {
  return path.dirname(filename(importMeta));
}

function readKitProxyConfig() {
  try {
    return jsonfile.readFileSync(KIT_PROXY_CONFIG_PATH);
  } catch (error) {
    throw ('Read kit-proxy-config failed', error);
  }
}

function readLibConfig() {
  try {
    return jsonfile.readFileSync(LIB_CONFIG_PATH);
  } catch (error) {
    throw ('Read lib-config failed:', error);
  }
}

function writeLibConfig(key, value) {
  try {
    const libConfig = readLibConfig();

    if (value === void 0) {
      delete libConfig[key];
    } else {
      libConfig[key] = value;
    }
    jsonfile.writeFileSync(LIB_CONFIG_PATH, libConfig);
  } catch (error) {
    throw `Write \`${key}: ${value}\` to lib-config failed: ${error}`;
  }
}

export {
  filename,
  dirname,
  readLibConfig,
  writeLibConfig,
  readKitProxyConfig
}