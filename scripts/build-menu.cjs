const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {buildSync} = require('esbuild');
const root = path.resolve(__dirname,'..');
const bundled = buildSync({entryPoints:[path.join(root,'src/site/menu-data.ts')],bundle:true,write:false,format:'cjs',platform:'node'}).outputFiles[0].text;
const context = {module:{exports:{}}}; vm.runInNewContext(bundled,context);
const {menuChapters,allMenuItems} = context.module.exports;
const esc = v => String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sizes = {single:'Single scoop',double:'Double scoop',family:'Family pack',large:'Large pack'};
const price = value => value===null?'Please ask us':`₹${value}`;
function row(item) {
  const prices = item.sizes ? `<dl class="menu-prices">${Object.entries(item.sizes).map(([size,value])=>`<div data-price-size="${size}"><dt>${sizes[size]}</dt><dd${value===null?' class="menu-price-pending"':''}>${price(value)}</dd></div>`).join('')}</dl>` : `<p class="menu-price">₹${item.price}</p>`;
  return `<article class="menu-dish" data-menu-item data-item-id="${esc(item.id)}" data-badge="${esc(item.badge??'')}" data-search="${esc(item.name+' '+item.description)}"><div class="menu-dish__copy"><h4>${esc(item.name)}</h4>${item.badge?`<span class="menu-badge">${esc(item.badge)}</span>`:''}${item.description?`<p>${esc(item.description)}</p>`:''}</div>${prices}</article>`;
}
const categories = menuChapters.map(c=>`<a href="#${c.id}" data-menu-category="${c.id}">${esc(c.short)}</a>`).join('');
const main = `<main id="main">
  <section class="menu-opening container" aria-labelledby="menu-title">
    <div class="menu-opening__copy"><p class="section-index">The Krushna’s Heaven menu</p><h1 id="menu-title">What are you<br />craving?</h1><p>A scoop for you. A pizza for the table.<br />Something for everyone to come together over.</p><a class="menu-opening__link" href="#menu-browser">Find your favourite <span aria-hidden="true">↓</span></a></div>
    <figure class="menu-opening__photo"><img src="assets/krushna/gallery/01-brownie-gelato.webp" alt="Brownie topped with gelato and berries" width="768" height="1024" fetchpriority="high" /><figcaption>A sweeter kind of together.</figcaption></figure>
  </section>
  <div id="menu-browser" class="menu-browser">
    <nav class="menu-category-bar" aria-label="Menu categories"><div class="container menu-category-track"><a href="#all" data-menu-category="all">Full menu</a>${categories}</div></nav>
    <div class="container menu-discovery" data-menu-controls hidden>
      <div class="menu-search"><label for="menu-search">Find something you love</label><div class="menu-search__field"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="menu-search" type="search" placeholder="Try brownie, coffee or paneer…" autocomplete="off" enterkeyhint="search" /><button type="button" data-menu-clear aria-label="Clear search" hidden>×</button></div></div>
      <div class="menu-pick"><label for="menu-recommendation">A little inspiration</label><select id="menu-recommendation"><option value="">All items</option value="Bestseller">Bestsellers</option><option value="Must try">Must try</option><option value="Chef’s special">Chef’s specials</option></select></div>
    </div>
    <div class="container menu-results-bar"><p data-menu-status role="status" aria-live="polite">${allMenuItems.length} items across five cravings</p><label class="menu-jump" data-menu-controls hidden>Jump to <select data-menu-jump aria-label="Jump to a menu section"><option value="">Choose a section</option></select></label></div>
    <div class="container menu-empty" data-menu-empty hidden><h2>No matches this time.</h2><p>Try a different name or ingredient, or return to the full menu.</p><button class="button" type="button" data-menu-reset>Show the full menu</button></div>
    <div class="container menu-catalogue" id="all" data-menu-catalogue>${menuChapters.map(c=>`
      <section id="${c.id}" class="menu-chapter" data-menu-chapter="${c.id}" aria-labelledby="${c.id}-title">
        <header class="menu-chapter__header"><div><h2 id="${c.id}-title">${esc(c.title)}</h2><p>${esc(c.description)}</p>${c.id==='gelato'?'<p class="menu-franchise">Featuring Mr Gelato at Krushna’s Heaven</p>':''}</div><img src="${c.image}" alt="" width="480" height="480" loading="lazy" /></header>
        ${c.id==='gelato'?`<div class="menu-size-panel" data-menu-controls hidden><label for="gelato-size">Choose your gelato size</label><select id="gelato-size">${Object.entries(sizes).map(([key,label])=>`<option value="${key}">${label}</option>`).join('')}</select><p>Applies to gelato flavours. Shakes, sundaes and other treats have individual prices.</p></div>`:''}
        ${c.groups.map(g=>`<section class="menu-section" id="${g.id}" data-menu-group aria-labelledby="${g.id}-heading"><div class="menu-section__heading"><h3 id="${g.id}-heading">${esc(g.title)}</h3>${g.note?`<p>${esc(g.note)}</p>`:''}</div><div class="menu-dishes">${g.items.map(row).join('')}</div></section>`).join('')}
      </section>`).join('')}</div>
    <div class="container menu-footnote"><p>GST is charged separately as applicable, as stated in the menu. Prices marked “Please ask us” will be confirmed by our team.</p><p>Photography is illustrative. For ingredient or allergy questions, please speak to our team before ordering.</p></div>
  </div>
  <section class="menu-closing container"><h2>Bring your appetite.<br />We’ll bring the choices.</h2><a class="button" href="visit.html">Plan your visit <i data-lucide="arrow-right"></i></a></section>
</main>`;
const template = fs.readFileSync(path.join(root,'src/site/menu-page.html'),'utf8');
fs.writeFileSync(path.join(root,'public/menu.html'), template.replace('<!-- MENU_CONTENT -->',main).replace(/[\t ]+$/gm,''));
console.log(`Menu: ${allMenuItems.length} products, ${menuChapters.length} chapters, ${allMenuItems.filter(i=>i.sizes?.family===null).length} family-pack prices pending.`);
