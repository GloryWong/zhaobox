import path from 'path';
import log from './log.js';

function filename(imporMeta) {
  return new URL(imporMeta.url).pathname;
}

function dirname(importMeta) {
  return path.dirname(filename(importMeta));
}

export {
  filename,
  dirname,
  log
}