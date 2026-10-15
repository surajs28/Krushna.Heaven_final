const esbuild=require('esbuild'),path=require('path');
require('./scripts/build-menu.cjs');
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/menu-discovery.ts')],bundle:true,minify:true,format:'iife',platform:'browser',target:['chrome100','safari15.4'],outfile:path.join(__dirname,'public/menu-discovery.js')});
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/menu-discovery.css')],minify:true,outfile:path.join(__dirname,'public/menu-discovery.css')});
for(const name of ['gelato','gelato-3d','krushna'])esbuild.buildSync({entryPoints:[path.join(__dirname,'src',name+'.js')],bundle:true,minify:true,format:'iife',platform:'browser',target:['chrome100','safari15.4'],outfile:path.join(__dirname,'public',name+'.js'),legalComments:'eof'});
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/site.ts')],bundle:true,minify:true,format:'iife',platform:'browser',target:['chrome100','safari15.4'],outfile:path.join(__dirname,'public/site.js'),legalComments:'eof'});
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/menu.tsx')],bundle:true,minify:true,format:'iife',platform:'browser',target:['chrome100','safari15.4'],jsx:'automatic',tsconfig:path.join(__dirname,'tsconfig.json'),define:{'process.env.NODE_ENV':'"production"'},outfile:path.join(__dirname,'public/menu.js'),legalComments:'eof'});
