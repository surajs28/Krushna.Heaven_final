const esbuild=require('esbuild'),path=require('path');
require('./scripts/build-menu.cjs');
// Only the four live pages are built. Retired Mr Gelato and concept bundles live in legacy/ (see FIXES.md F04).
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/menu-page.ts')],bundle:true,minify:true,format:'iife',platform:'browser',target:['chrome100','safari15.4'],outfile:path.join(__dirname,'public/menu-page.js')});
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/site.ts')],bundle:true,minify:true,format:'iife',platform:'browser',target:['chrome100','safari15.4'],outfile:path.join(__dirname,'public/site.js'),legalComments:'eof'});
