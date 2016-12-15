# gulp-generate-image-data-uri

> Does exactly as it says on the tin. A gulp plugin to generate datauris for images.

## Install
I use [Yarn](https://github.com/yarnpkg/yarn), and love it. I totally recommend using it as well!

To install via Yarn:
```
$ yarn add gulp-generate-image-data-uri -D
```
To install via npm:
```
$ npm install gulp-generate-image-data-uri -D
```


## Usage

As with most Gulp plugins, this is relatively easy to set up. 

```js
const gulp = require('gulp');
const dataURI = require('gulp-generate-image-data-uri');

gulp.task('default', () =>
	gulp.src('src/img.jpg')
		.pipe(dataURI())
		.pipe(gulp.dest('dist'))
);
```
This will output a file, img.txt, which contains the data-uri.

## API

### datauri([options])

#### options

##### isJS

Type: `boolean`  
Default: `false`

Outputs datauris to JS instead, one defintion per file. The format being:
```js
const camelCaseFileName = 'dataURI';
```

## Credit ##
This plugin would not be possible without the Node module [datauri](https://github.com/data-uri/datauri), which is used to generate the datauris
## License

MIT © Aaron Kelly-Barker
