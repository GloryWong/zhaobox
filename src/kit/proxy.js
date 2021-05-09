import { Command } from 'commander/esm.mjs';
import path from 'path';
import { readKitProxyConfig } from '../util/base.js';
import log from '@glorywong/log';
import Ora from 'ora';
import execa from 'execa';

new Command()
  .option('--app <appName>')
  .option('--status <status>')
  .action(function({ app, status }, { args }) {
    if (!app && !status) {
      showAllProxy();
      return;
    }

    if (!status) {
      showProxy(app);
      return;
    }
  })
  .parse();

function resolveProxyServer(proxyServer) {
  try {
    for (const key in proxyServer) {
      const val = proxyServer[key];
      proxyServer[key] = val.startWith(':') ? proxyServer(val.slice(1)) : val;
    }
  } catch (error) {
    throw `resolve proxyServer failed: ${error}`;
  }
}

function evaluateApp(app, proxyServer) {
  try {
    for (const key in app) {
      const val = app[key];
      app[key] = val.replace(/^\$\{([http|https|socks])\}$/, (match, p1) => {
        return proxyServer[p1];
      });
    }
  } catch (error) {
    throw `evaluate apps failed: ${error}`;
  }
}

function showProxy(appName) {
  try {
    const { proxyServer, apps } = readKitProxyConfig();
    // if (!proxyServer) {
    //   throw `${proxyServer} does not exist in kit.proxy.config`;
    // }

    // resolveProxyServer(proxyServer);

    const app = apps.find(({name}) => name === appName);
    const { stdout } = execa.sync(...app.get);
    log.info(stdout);
  } catch (error) {
    throw ('get proxy of', appName, 'failed:', error);
  }
}

function showAllProxy() {
  try {
    const { apps } = readKitProxyConfig();
    apps.forEach(({ name, get }) => {
      const { stdout } = execa.sync(...get);
      log.info('success:', name, 'info:', 'proxy -', stdout);
    });
  } catch (error) {
    log.error('show all proxy failed:', error);
  }
}