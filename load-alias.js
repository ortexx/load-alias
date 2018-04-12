"use strict";

let path = require('path');

class LoadAlias {
  constructor(rootPath, config) {
    if(!config) {
      config = rootPath;
      rootPath = undefined;
    }

    this.rootPath = rootPath || process.cwd();
    this.config = config || {};
  }

  load(link) {
    return require(this.getFullPath(link));
  }

  require(link) {
    return require(this.getPath(link));
  }

  getConfig() {
    return this.config;
  }

  setConfig(config) {
    return this.config = Object.assign(this.config, config);
  }

  get(name) {
    return this.config[name];
  }

  set(name, value) {
    this.config[name] = value;
  }

  del(name) {
    delete this.config[name];
  }

  getPath(link) {
    return this.transform(link);
  }

  getFullPath(link) {
    return path.join(this.rootPath, this.transform(link))
  }

  transform(link) {
    let isRepeat;
    let config = this.getConfig();

    function replaceFn() {
      let key = arguments[2];
      let alias = config[key];
      let replacement = alias;

      if (typeof alias == 'function') {
        replacement = alias(key, replacement);
      }

      let newLink = arguments[1] + (replacement || '') + arguments[3];

      if (newLink.match('@')) {
        isRepeat = true;
      }

      return newLink;
    }

    function next() {
      for (let k in config) {
        link = link.replace(new RegExp('(^|[\\/\\\\])@(' + k + ')($|[\\/\\\\])'), replaceFn);

        if (isRepeat) {
          isRepeat = false;
          next();
          break;
        }
      }
    }

    next();
    return link;
  }
}

module.exports = LoadAlias;


