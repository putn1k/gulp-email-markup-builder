import gulp from 'gulp';
import bs from 'browser-sync';
import fileInclude from 'gulp-file-include';
import notify from 'gulp-notify';
import beautifyHTML from 'gulp-html-beautify';
import gulpIf from 'gulp-if';
import fs from 'fs';
import path from 'path';
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
const Folders = {
  Src: './src/',
  Build: './build/',
  HTML: 'html/',
};
let isProd = false;
let SITEMAP_LINKS;

const templatePage = ( template ) => {
  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitemap</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        max-width: 1100px;
        margin: 0 auto;
        padding-right: 15px;
        padding-left: 15px;
      }

      .link-list {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: flex-start;
        margin: -6px 0;
      }

      .link-list > li {
        margin: 6px 0;
      }
    </style>
  </head>
  <body>
    <h1>Список страниц</h1>
    <ol class="link-list">${template}</ol>
  </body>
  </html>`;
};

const createSitemap = ( done ) => {
  fs.readdir( Folders.Src, ( err, files ) => {
    SITEMAP_LINKS = [];
    files.forEach( file => {
      if ( !fs.lstatSync( path.resolve( Folders.Src, file ) ).isDirectory() && file !== 'template.html' ) {
        SITEMAP_LINKS.push( `<li><a href="${file}">${file}</a></li>` );
      }
    } );
    fs.writeFileSync( 'sitemap.html', templatePage( SITEMAP_LINKS.join( '' ) ) );
  } );
  done();
};

const cleanBuildFolder = () => deleteAsync( [ `${Folders.Build}*` ] );

const getHTML = () => {
  return src( [ `${Folders.Src}*.html` ], {
      ignore: `${Folders.Src}template.html`
    } )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( "error", notify.onError() ) )
    .pipe( beautifyHTML( {
      'indent_size': 2
    } ) )
    .pipe( dest( Folders.Build ) )
    .pipe( gulpIf( !isProd, browserSync.stream() ) );
};

const watchFiles = () => {
  browserSync.init( {
    server: {
      baseDir: `${Folders.Build}`
    },
    index: '../sitemap.html',
    notify: false,
    ui: false,
  } );

  watch( [ `${Folders.Src}*.html`, `${Folders.Src}${Folders.HTML}**/*.html` ], getHTML );
  watch( `${Folders.Src}*.html`, createSitemap );
}

const toProd = ( done ) => {
  isProd = true;
  done();
};

const buildDevelopment = series(
  cleanBuildFolder,
  createSitemap,
  getHTML,
  watchFiles
);

const buildProd = series(
  toProd,
  cleanBuildFolder,
  createSitemap,
  getHTML
);

export default buildDevelopment;
export {
  cleanBuildFolder as clean,
  buildProd as build
};
