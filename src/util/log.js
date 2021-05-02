import chalk from 'chalk';

let colorMap = {
  'info': 'white',
  'success': 'green',
  'warning': 'orange',
  'error': 'red',
  'debug': 'gray'
};
let flags = Object.keys(colorMap).map(v => v + ':');

function log(...params) {
  let type = 'info';
  let content = [];
  let output = [];
  params.forEach(v => {
    if (flags.includes(v)) {
      if (content.length) {
        output.push(chalk.keyword(colorMap[type])(...content));
        content.splice(0);
      }
      type = v.slice(0, v.length - 1);
      return;
    }
    content.push(v);
  });

  if (content.length) {
    output.push(chalk.keyword(colorMap[type])(...content));
  }

  console.log(...output);
}
log.info = function info(...content) {
  log('info:', ...content);
};
log.success = function success(...content) {
  log('success:', ...content);
};
log.warning = function warning(...content) {
  log('warning:', ...content);
};
log.error = function error(...content) {
  log('error:', ...content);
};
log.debug = function debug(...content) {
  log('debug:', 'Debug info: ', ...content);
};

export default log;