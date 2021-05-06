import getos from 'getos';

/**
 * @return Promise, os
 *  {
 *    os: "linux",
 *    dist: "Ubuntu",
 *    codename: "precise",
 *    release: "12.04"
 *  }
 */
function getOS() {
  return new Promise((resolve, reject) => {
    getos((error, os) => {
      if (error) reject(error);
      resolve(os);
    });
  })
}

/**
 * key: os, dist, codename, release
 */
async function getOSDetail(key) {
  const os = await getOS();
  return os[key];
}

export default {
  getOS,
  getOSDetail
};