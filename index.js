const through = require('through2');
const DataURI = require('datauri');
const PluginError = require('gulp-util').PluginError;

const PLUGIN_NAME = 'gulp-generate-image-data-uri';

module.exports = function() {
	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file);
		} else if (file.isStream()) {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Not working with streams at the moment'));
		} else if (file.isBuffer()) {
			let datauri = new DataURI();
			datauri.format(file.relative, file.contents);
			file.contents = new Buffer(datauri.content, encoding);
			this.push(file);
		} else {
			this.emit('error', new PluginError(PLUGIN_NAME, 'Unrecognized filetype. WTF: What the File?'));
			callback(null, file);
		}
	});
};
