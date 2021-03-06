const through = require('through2');
const DataURI = require('datauri');
const path = require('path');
const camelCase = require('camelcase');
const PluginError = require('plugin-error');

const PLUGIN_NAME = 'gulp-generate-image-data-uri';

module.exports = function(isJS = false) {
	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file);
		} else if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Not working with streams at the moment'));
		} else if (file.isBuffer()) {
			let datauri = new DataURI();
			datauri.format(file.relative, file.contents);
			const pathData = path.parse(file.path);
			if (isJS) {
				const fileName = camelCase(file.relative);
				file.contents = new Buffer(`const ${fileName} = '${datauri.content}';`, encoding);
				file.path = path.join(pathData.dir, pathData.name + '.js');
			} else {
				file.contents = new Buffer(datauri.content, encoding);
				file.path = path.join(pathData.dir, pathData.name + '.txt');
			}
		}
		this.push(file);
		callback();
	});
};
