import gulp from 'gulp';
import bs from 'browser-sync';
import fileInclude from 'gulp-file-include';
import notify from 'gulp-notify';
import beautifyHTML from 'gulp-html-beautify';
import gulpIf from 'gulp-if';
import {
  deleteAsync
} from 'del';

const {
  src,
  dest,
  series,
  watch
} = gulp;
const browserSync = bs.create();
const Path = {
  Src: './src/',
  Build: './build/',
  HTML: 'html/',
};

const cleanBuildFolder = () => deleteAsync( [ `${Path.Build}*` ] );
let isProd = false;

const getHTML = () => {
  return src( [ `${Path.Src}*.html` ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( "error", notify.onError() ) )
    .pipe( beautifyHTML( {
      'indent_size': 2
    } ) )
    .pipe( dest( Path.Build ) )
    .pipe( gulpIf( !isProd, browserSync.stream() ) );
};

const watchFiles = () => {
  browserSync.init( {
    server: {
      baseDir: `${Path.Build}`
    },
    notify: false,
    ui: false,
  } );

  watch( [ `${Path.Src}*.html`, `${Path.Src}${Path.HTML}**/*.html` ], getHTML );
}

const toProd = ( done ) => {
  isProd = true;
  done();
};

const buildDevelopment = series(
  cleanBuildFolder,
  getHTML,
  watchFiles
);

const buildProd = series(
  toProd,
  cleanBuildFolder,
  getHTML
);

export default buildDevelopment;
export {
  cleanBuildFolder as clean,
  buildProd as build
};
