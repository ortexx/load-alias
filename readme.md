# Install 
`npm install load-alias`
# About
Load is a module to require with using aliases and root path. (using node require)
# Example
```js
var LoadAlias = require('load-alias');

var loadConfig = {
  public: 'public/',
  css: '@public/css/',
  img: '@public/img/',
  favicon: '@img/favicon.ico',
  db: 'db/',
  dbModels: '@db/models/',
  upload: 'upload/',
  test: function(instance, alias, replacement) {
	return 'something';
  }	
}

var load = new LoadAlias(loadConfig) // or new loadAlias(rootPath, loadConfig) 

global.load = load;

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
You can set config for different environments

```js
var loadConfig = {
  default: {
    public: 'public/',
    temp: 'temp/'
  },
  production: {
    temp: 'other/temp/path'
  }
}
```

All properties will be merged with default

## Node modules
For loading other node modules use:

```js
var util = load.module('util');
```

or

```js
var path = load.lib('path');
```

# Api
### .setConfig(config)
Config will be merged with current
### .getConfig()
Get current environment config
### .addAlias(name, path)
Add new alias
### .deleteAlias(name)
Delete alias
### .getPath(path)
Get relative path after aliases will be replaced
### .getFullPath(path)
Get full path after aliases will be replaced
### .module(name)
Get node module
### .lib(name)
Get node module

