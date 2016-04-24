var mpath = require('path');
var util = require('util');

var loadAlias = function(rootPath, config) {
	if(!config) {
		config = rootPath;
		rootPath = false;
	}
	
	rootPath = rootPath || process !== undefined? process.env.INIT_CWD: '';

	var load = function (path, FullPath) {    
		return require(FullPath === false? load.getPath(path): load.getFullPath(path));
	}

	load.aliasesConfig = {};
	load.rootPath = rootPath;

	load.setConfig = function (config) {
		if (config.default) {
			load.aliasesConfig.default = util._extend(load.aliasesConfig.default || {}, config.default);

			for (var k in config) {
				if (k != 'default') {
					load.aliasesConfig[k] = util._extend(load.aliasesConfig.default, load.aliasesConfig[k] || {}, config[k]);
				}
			}
		}
		else {
			load.aliasesConfig.default = util._extend(load.aliasesConfig.default || {}, config);
		}   
	}

	load.getConfig = function () {
		if (load.aliasesConfig[process.env.NODE_ENV]) {
			return load.aliasesConfig[process.env.NODE_ENV];
		}
		else {
			return load.aliasesConfig.default;
		}
	}

	load.addAlias = function (alias, path) {
		load.getConfig()[alias] = path;
	}

	load.deleteAlias = function (alias) {
	   delete load.getConfig()[alias];
	}

	load.getFullPath = function (path) {
		var fullPath = load.replacedPath(path);
		
		if (load.rootPath) {
			fullPath = mpath.join(load.rootPath, fullPath);
		}

		return fullPath;
	}

	load.module = load.lib = function(path) {
		return require(load.getPath(path));
	}

	load.getPath = load.replacedPath = function (path) {
		var isRepeatAlias;

		function replaceMask() {
			for (var k in load.getConfig()) {
				path = path.replace(new RegExp('(^|[\\/\\\\])@(' + k + ')($|[\\/\\\\])'), function () {
					var alias = load.getConfig()[arguments[2]];
					var replacement = alias;
					
					if(typeof alias == 'function') {
						replacement = alias(load, arguments[2], replacement);
					}
					
					var newPath = arguments[1] + (replacement || '') + arguments[3];

					if (newPath.match('@')) {
						isRepeatAlias = true;
					}

					return newPath;
				});
				
				if (isRepeatAlias) {
					isRepeatAlias = false;
					replaceMask();
					break;
				}
			}
		}
		
		replaceMask();

		return path;
	}
	
	if(config) {
		load.setConfig(config);
	}
	
	return load
}

module.exports = loadAlias;


