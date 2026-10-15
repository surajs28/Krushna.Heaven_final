const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {buildSync} = require('esbuild');
const context = {module:{exports:{}}};
vm.runInNewContext(buildSync({entryPoints:['src/site/menu-data.ts'],bundle:true,write:false,format:'cjs',platform:'node'}).outputFiles[0].text,context);
const {allMenuItems:items,menuChapters:chapters} = context.module.exports;
test('Every extracted source line survives, with only two duplicate flavour rows consolidated',()=>{
  assert.equal(items.length,188);
  assert.equal(items.reduce((n,i)=>n+i.sources.length,0),190);
  const evidence=require('../src/site/menu-source.json');
  const originals=Object.values(evidence.groups).flatMap(g=>g.flatMap(row=>row.items??[row]));
  for(const row of originals) assert.ok(items.some(item=>item.sources.some(ref=>ref.name===row.name)),row.name);
  assert.equal(new Set(items.map(i=>i.id)).size,188);
});
test('Final PDF prices override recommendation-image prices',()=>{
  for(const [name,price] of Object.entries({'Brownie Shake':220,'Cookie & Blast Shake':230,'Kesar Pista Falooda':230,'Dry Fruit Falooda':240,'Mango Falooda':190,'Sitaphal Mastani':220,'Choco Brownie Sundae':190,'Belgian Choco Sundae':220,'Cookie Madness Sundae':230,'Pistachio Kulfi Sundae':240})) assert.equal(items.find(i=>i.name===name)?.price,price,name);
});
test('Disputed family packs stay unpriced and unconfirmed additions stay out',()=>{
  assert.equal(items.filter(i=>i.sizes?.family===null).length,6);
  assert.equal(items.find(i=>i.name==='Dark Italian Chocolate').sizes.family,null);
  assert.equal(items.find(i=>i.name==='Belgian Chocolate').sizes.family,null);
  assert.ok(!items.some(i=>/CAD M|Royal Mastani|Jamun/.test(i.name)));
  for(const i of items) for(const p of i.sizes?Object.values(i.sizes):[i.price]) assert.ok(p===null || (Number.isFinite(p)&&p>0),i.name);
});
test('Only client-supplied recommendations are displayed',()=>{
  assert.equal(items.filter(i=>i.badge).length,10);
  assert.equal(items.find(i=>i.name==='Pasta Alfredo').badge,undefined);
  assert.equal(items.find(i=>i.name==='Pistachio Kulfi Sundae').badge,'Chef’s special');
});
test('The static page has unique anchors and all five carousel destinations',()=>{
  const html=fs.readFileSync('public/menu.html','utf8');
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,'Duplicate IDs');
  for(const chapter of chapters) assert.ok(ids.includes(chapter.id));
  assert.ok(ids.includes('desserts'));
  assert.equal((html.match(/data-menu-item\s/g)||[]).length,188);
});
