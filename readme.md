# Install 
`npm install load-alias`

# About  
This module can require files using aliases  

# Example
```js
let LoadAlias = require('load-alias');

let loadConfig = {
  public: 'public/',
  css: '@public/css/',
  img: '@public/img/',
  favicon: '@img/favicon.ico',
  db: 'db/',
  dbModels: '@db/models/',
  upload: 'upload/',
  test: function(alias, replacement) {
	  return 'some/thing';
  }	
}

let alias = new LoadAlias(loadConfig); // or new loadAlias(rootPath, loadConfig) 

let modelUser = alias.load('@dbModels/user.js');
let imgAvatarPath = alias.getPath('@img/avatar.png');  // => 'public/img/avatar.png'
let imgAvatarFullPath = alias.getFullPath('@img/avatar.png'); // => alias.rootPath + '/public/img/avatar.png'
let path = alias.require('path'); // gets nodejs path library
let something = alias.require('./relative/path/'); // doesn't merge with .rootPath

```

## Root path  
The default `alias.rootPath` = `process.cwd()`  
But you can change it: `alias.rootPath = something`

# Api  
### .load(path)
Loading file using full path

### .require(path)
Loading file using relative path.

### .getConfig() 
Getting config

### .setConfig(config)
Config will be merged with current

### .getConfig()
Getting config

### .get(name)
Getting alias

### .set(name, alias)
Adding or updating alias

### .del(name)
Deleting alias

### .getPath(path)
Getting transformed path without .rootPath

### .getFullPath(path)  
Getting the full transformed path including .rootPath


