# About
Load is a module to require with using aliases and root path.
# Example
```js
var load = require('load');

var loadConfig = {
  @public: 'public/',
  @css: '@public/css/',
  @img: '@public/img/',
  @favicon: '@img/favicon.ico',
  @db: 'db/',
  @dbModels: '@db/models/',
  @upload: 'upload/'
}

load.setConfig(loadConfig);

var modelUser = load('@dbModels/user.js');
var modelSession = load('@dbModels/session'); // without '.js'
var requireSomething = load('path/to/file'); // as node require
var imgAvatarPath = load.getPath('@img/avatar.png'); 
  // => 'public/img/avatar.png'
var imgAvatarFullPath = load.getFullPath('@img/avatar.png'); 
  // => load.rootPath + '/public/img/avatar.png'

```

## Root path
* The default `load.rootPath` = `process.env.INIT_CWD`

* But you can change it: `load.rootPath = something`

* By default `load(path)` using load.rootPath + path; 

* If you want to use relative path: `load(path, false)` = `require(load.getPath(path))`

* And `load(path)` = `require(load.getFullPath(path))`

# More
## Environment
You can set config for different environment

```js
var loadConfig = {
  default: {
    @public: 'public/',
    @temp: 'temp/'
  },
  production: {
    @temp: 'other/temp/path'
  }
}
```

All properties merge with default

## Node modules
For loading other node modules use:

```js
var util = load.module('util');
```

or

```js
var path = load.lib('path');
```
