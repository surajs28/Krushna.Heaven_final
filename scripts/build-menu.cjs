// Builds public/menu.html from the verified final-menu data (src/site/menu-data.ts).
// Round 4 (15 Oct 2026): the "carte" layout after the reference menu flow — see FIXES.md (M-series).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const {buildSync} = require('esbuild');
const root = path.resolve(__dirname, '..');
const bundled = buildSync({entryPoints: [path.join(root, 'src/site/menu-data.ts')], bundle: true, write: false, format: 'cjs', platform: 'node'}).outputFiles[0].text;
const context = {module: {exports: {}}};
vm.runInNewContext(bundled, context);
const {menuChapters, allMenuItems} = context.module.exports;

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const ART = 'assets/krushna/menu/';
const G = 'assets/krushna/gallery/';
const PDF = 'assets/krushna/krushnas-heaven-menu.pdf';
const pdfSize = `${(fs.statSync(path.join(root, 'public', PDF)).size / 1048576).toFixed(1)} MB`;
const sizes = [['single', 'Single scoop', 'Single'], ['double', 'Double scoop', 'Double'], ['family', 'Family pack', 'Family'], ['large', 'Large pack', 'Large']];
const rupees = (value) => (value === null || value === undefined ? 'Ask us' : `₹${value}`);
const searchText = (item, group) => esc(`${item.name} ${item.description} ${item.badge ?? ''} ${item.tier ?? ''} ${group.title}`.toLowerCase());

// Chapter dressing: accent from the printed menu, a banner photo and a short marginal note.
const chapterArt = {
  gelato: {accent: '#f0749d', note: 'slow-churned, scooped to order', mark: 'scoop-fruit',
    banner: {src: `${G}11-gelato-counter.webp`, srcset: `${G}responsive/11-gelato-counter-800.webp 800w, ${G}11-gelato-counter.webp 1360w`, w: 1360, h: 1020, alt: 'The pastel gelato counter at Krushna’s Heaven', caption: 'The gelato counter', position: 'center 58%'}},
  woodfire: {accent: '#ef7a5d', note: 'sourdough, straight from the oven', mark: 'pizza-sourdough', markPhoto: true,
    banner: {src: 'assets/krushna/dna/woodfire-pizza.webp', srcset: 'assets/krushna/dna/woodfire-pizza-480.webp 480w, assets/krushna/dna/woodfire-pizza.webp 800w', w: 800, h: 1200, alt: 'Sourdough pizza with a blistered crust, mozzarella and basil', caption: 'Sourdough pizza', position: 'center 42%'}},
  brews: {accent: '#5fb7ae', note: 'pour, sip, stay a while', mark: 'cappuccino',
    banner: {src: `${G}08-signature-coffee.webp`, srcset: `${G}responsive/08-signature-coffee-800.webp 800w, ${G}08-signature-coffee.webp 1600w`, w: 1600, h: 900, alt: 'Latte art on a wooden tray beside coffee beans', caption: 'A moment for coffee', position: 'center 50%'}},
  waffles: {accent: '#e8b64c', note: 'leave room for something sweet', mark: 'stick-waffle',
    banner: {src: `${G}01-brownie-gelato.webp`, srcset: `${G}responsive/01-brownie-gelato-480.webp 480w, ${G}01-brownie-gelato.webp 768w`, w: 768, h: 1024, alt: 'Chocolate brownie with a scoop of vanilla gelato', caption: 'Brownie with gelato', position: 'center 62%'}},
  savoury: {accent: '#f2a65a', note: 'for the whole table', mark: 'burger',
    banner: {src: `${G}09-croissant-savoury-bite.webp`, srcset: `${G}responsive/09-croissant-savoury-bite-800.webp 800w, ${G}09-croissant-savoury-bite.webp 1600w`, w: 1600, h: 899, alt: 'Filled croissant sandwich with fries and two dips', caption: 'Croissant sandwich with fries', position: 'center 55%'}},
};
const groupArt = {
  'chocolate-classics': 'scoop-chocolate', 'fruit-fresh': 'scoop-fruit', 'creamy-delights': 'scoop-vanilla', 'premium-indulgence': 'scoop-caramel',
  'shakes-with-softy': 'shakes', 'falooda-one-scoop-ice-cream-with-rabadi': 'falooda', 'smoothies-with-softy': 'smoothie', mastani: 'mastani', sundae: 'sundae',
  'sourdough-pizzas': ['pizza-sourdough', true], calzone: ['calzone', true],
  'hot-classic': 'cappuccino', 'cold-classic': 'iced-coffee', 'iced-tea': 'iced-tea', 'iced-coffee': 'iced-latte', mocktails: 'mocktails',
  'signature-protein-smoothies': 'protein-smoothie', 'fresh-juices': 'juice',
  'waffle-selection': ['waffle', true], 'pancakes-mini': 'pancakes', 'stick-waffles': 'stick-waffle',
  pasta: 'pasta', fries: 'fries', 'croissant-sandwich': 'croissant', burger: 'burger', nachos: 'nachos',
};
const familyColour = {'chocolate-classics': '#c8956c', 'fruit-fresh': '#4fb3a9', 'creamy-delights': '#f29bb6', 'premium-indulgence': '#e6c25a'};
// Sub-chapters keep long chapters easy to scan; group ids not listed keep their data order.
const suites = {
  gelato: [['Scoops & treats', ['shakes-with-softy', 'falooda-one-scoop-ice-cream-with-rabadi', 'smoothies-with-softy', 'mastani', 'sundae']]],
  brews: [
    ['Coffee & tea', ['hot-classic', 'cold-classic', 'iced-coffee', 'iced-tea', 'brew-add-ons']],
    ['Mocktails & coolers', ['mocktails']],
    ['Protein bar', ['signature-protein-smoothies', 'fresh-juices', 'heaven-s-special-tea']],
  ],
  waffles: [['Waffles & pancakes', ['waffle-selection', 'stick-waffles', 'make-your-own-waffle', 'pancakes-mini']], ['Signature desserts', ['desserts']]],
};
const featurePhotos = {
  'Blueberry Panna Cotta': [`${G}responsive/07-blueberry-panna-cotta-480.webp`, 'Blueberry panna cotta on a pale green plate'],
  'Chocolate Brownie with Ice-cream': [`${G}responsive/01-brownie-gelato-480.webp`, 'Chocolate brownie topped with a scoop of gelato'],
  'The Gourd-Gée Tiramisu': [`${ART}gourd-gee-tiramisu.webp`, 'The Gourd-Gée Tiramisu in a glass tumbler with espresso being poured'],
};

const art = (id, size = 'group') => {
  const entry = groupArt[id];
  if (!entry) return '';
  const [file, photo] = Array.isArray(entry) ? entry : [entry, false];
  return `<img class="carte-${size}__art${photo ? ' is-photo' : ''}" src="${ART}${file}.webp" alt="" loading="lazy" decoding="async" />`;
};

const badge = (item) => (item.badge ? `<span class="dish-badge">${esc(item.badge)}</span>` : '');

const dish = (item, group) => `
            <li class="dish" data-menu-item data-search="${searchText(item, group)}">
              <div class="dish__line"><h4 class="dish__name">${esc(item.name)}</h4>${badge(item)}<span class="dish__leader" aria-hidden="true"></span><span class="dish__price">${rupees(item.price)}</span></div>${item.description ? `
              <p class="dish__desc">${esc(item.description)}</p>` : ''}
            </li>`;

const featureDish = (item, group) => {
  const photo = featurePhotos[item.name];
  return `
            <li class="dish dish--feature${photo ? '' : ' dish--no-photo'}" data-menu-item data-search="${searchText(item, group)}">${photo ? `
              <img class="dish__photo" src="${photo[0]}" alt="${esc(photo[1])}" loading="lazy" decoding="async" />` : ''}
              <div class="dish__body">
                <div class="dish__line"><h4 class="dish__name">${esc(item.name)}</h4>${badge(item)}<span class="dish__leader" aria-hidden="true"></span><span class="dish__price">${rupees(item.price)}</span></div>
                <p class="dish__desc">${esc(item.description)}</p>
              </div>
            </li>`;
};

const groupBlock = (group) => {
  const compact = group.items.length >= 8 && group.items.every((i) => (i.description ?? '').length < 70);
  const feature = group.id === 'desserts';
  return `
        <section class="carte-group${compact ? ' carte-group--compact' : ''}${feature ? ' carte-group--feature' : ''}" id="${group.id}" aria-labelledby="${group.id}-heading" data-menu-group>
          <header class="carte-group__head">${art(group.id)}<div><h3 id="${group.id}-heading">${esc(group.title)}</h3>${group.note ? `<p>${esc(group.note)}</p>` : ''}</div></header>
          <ul class="dishes">${group.items.map((item) => (feature ? featureDish(item, group) : dish(item, group))).join('')}
          </ul>
        </section>`;
};

const flavourBoard = (group) => {
  const tiers = [];
  for (const item of group.items) {
    const last = tiers[tiers.length - 1];
    if (last && last.name === item.tier) last.items.push(item);
    else tiers.push({name: item.tier ?? 'Flavours', items: [item]});
  }
  return `
          <section class="flavour-board" id="${group.id}" style="--family: ${familyColour[group.id]}" aria-labelledby="${group.id}-heading" data-menu-group>
            <header class="flavour-board__head">${art(group.id, 'board')}<div><h3 id="${group.id}-heading">${esc(group.title)}</h3><p>${group.items.length} flavours</p></div></header>
            <table class="flavour-table">
              <caption class="sr-only">${esc(group.title)} gelato prices in rupees</caption>
              <thead><tr><th scope="col">Flavour</th>${sizes.map(([key, label, short]) => `<th scope="col" data-size-col="${key}"><span class="sr-only">${label}</span><span aria-hidden="true">${short}</span></th>`).join('')}</tr></thead>${tiers.map((tier) => `
              <tbody data-flavour-tier>
                <tr class="flavour-tier"><th scope="colgroup" colspan="5">${esc(tier.name)}</th></tr>${tier.items.map((item) => `
                <tr class="flavour" data-menu-item data-search="${searchText(item, group)}"><th scope="row"><span class="flavour__name">${esc(item.name)}</span>${badge(item)}</th>${sizes.map(([key]) => `<td data-size-col="${key}"${item.sizes[key] === null ? ' class="is-ask"' : ''}>${rupees(item.sizes[key])}</td>`).join('')}</tr>`).join('')}
              </tbody>`).join('')}
            </table>
          </section>`;
};

const cones = (group) => `
        <section class="cone-strip" id="${group.id}" aria-labelledby="${group.id}-heading" data-menu-group>
          <h3 id="${group.id}-heading">Make it a cone</h3>
          <ul>${group.items.map((item) => `<li data-menu-item data-search="${searchText(item, group)}"><span>${esc(item.name)}</span><b>${rupees(item.price)}</b></li>`).join('')}</ul>
        </section>`;

const chapterBlock = (chapter, index) => {
  const dress = chapterArt[chapter.id];
  const flavourGroups = chapter.groups.filter((g) => familyColour[g.id]);
  const coneGroup = chapter.groups.find((g) => g.id === 'cones-baskets');
  const rest = chapter.groups.filter((g) => !familyColour[g.id] && g !== coneGroup);
  const plan = suites[chapter.id];
  let body = '';
  if (flavourGroups.length) {
    body += `
        <div class="flavour-boards" data-flavour-boards>
          <div class="size-switch" role="group" aria-label="Gelato size" data-size-switch hidden>${sizes.map(([key, label]) => `<button type="button" data-size-option="${key}" aria-pressed="${key === 'single'}">${label}</button>`).join('')}</div>
          <div class="flavour-boards__grid">${flavourGroups.map(flavourBoard).join('')}
          </div>${coneGroup ? cones(coneGroup) : ''}
        </div>`;
  }
  if (plan) {
    const used = new Set();
    for (const [title, ids] of plan) {
      const groups = ids.map((id) => rest.find((g) => g.id === id)).filter(Boolean);
      groups.forEach((g) => used.add(g.id));
      body += `
        <div class="carte-suite">
          <h3 class="carte-suite__title">${esc(title)}</h3>
          <div class="carte-groups">${groups.map(groupBlock).join('')}
          </div>
        </div>`;
    }
    const leftover = rest.filter((g) => !used.has(g.id));
    if (leftover.length) body += `
        <div class="carte-groups">${leftover.map(groupBlock).join('')}
        </div>`;
  } else {
    body += `
        <div class="carte-groups">${rest.map(groupBlock).join('')}
        </div>`;
  }
  const b = dress.banner;
  return `
    <section class="carte-chapter" id="${chapter.id}" style="--accent: ${dress.accent}" aria-labelledby="${chapter.id}-title" data-carte-chapter>
      <div class="container">
        <figure class="carte-banner"><img src="${b.src}" srcset="${b.srcset}" sizes="(max-width: 90rem) 92vw, 1440px" width="${b.w}" height="${b.h}" alt="${esc(b.alt)}" loading="lazy" decoding="async" style="object-position: ${b.position}" /><figcaption>${esc(b.caption)}</figcaption></figure>
        <header class="carte-chapter__head">
          <span class="carte-chapter__no" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <h2 id="${chapter.id}-title">${esc(chapter.title)}</h2>
          <p class="carte-chapter__note">${esc(dress.note)}</p>
        </header>
        <p class="carte-chapter__intro">${esc(chapter.description)}</p>${body}
      </div>
    </section>`;
};

const gelatoStory = `
    <section class="gelato-story" aria-labelledby="gelato-story-title" data-carte-alias="gelato">
      <div class="container gelato-story__inner">
        <div class="gelato-story__lead">
          <p class="eyebrow-line">The story of gelato</p>
          <h2 id="gelato-story-title"><em class="glow-text">Gelato</em> is Italian for “frozen”.</h2>
          <p>Traditionally from northern Italy, gelato is churned more slowly than ice cream, with less air and less fat, so the creaminess and the flavour come through first.</p>
        </div>
        <ul class="gelato-facts">
          <li><b>Slow-churned</b><span>Less air means a denser scoop and a deeper flavour.</span></li>
          <li><b>100% vegetarian</b><span>Every gelato on our menu is vegetarian.</span></li>
          <li><b>Sorbetto</b><span>Our sorbettos are made from water, sugar and fresh fruit.</span></li>
          <li><b>Variegato</b><span>The ripples and toppings folded through a gelato have a name: variegato.</span></li>
        </ul>
        <div class="gelato-lingo">
          <h3>Useful gelato lingo</h3>
          <dl>
            <div><dt lang="it">Una coppa</dt><dd>a cup</dd></div>
            <div><dt lang="it">Un cono</dt><dd>a cone</dd></div>
            <div><dt lang="it">Gusti</dt><dd>flavours</dd></div>
          </dl>
        </div>
        <div class="scoop-sizes">
          <h3>Scoop serving sizes</h3>
          <ol>${[['Single scoop', 73], ['Double scoop', 133], ['Family pack', 250], ['Large pack', 500]].map(([label, grams]) => `
            <li style="--d: ${(Math.sqrt(grams / 500) * 5.5).toFixed(2)}"><span class="scoop-sizes__dot" aria-hidden="true"></span><b>${label}</b><span>${grams} g</span></li>`).join('')}
          </ol>
        </div>
      </div>
    </section>`;

const counts = {
  gelato: (c) => `${c.groups.filter((g) => familyColour[g.id]).reduce((n, g) => n + g.items.length, 0)} flavours · ${c.groups.filter((g) => !familyColour[g.id] && g.id !== 'cones-baskets').reduce((n, g) => n + g.items.length, 0)} treats`,
  default: (c) => `${c.groups.reduce((n, g) => n + g.items.length, 0)} on the menu`,
};

const main = `<main id="main" class="carte">
    <section class="carte-hero" aria-labelledby="menu-title" data-ambient>
      <div class="carte-hero__inner container">
        <div class="carte-hero__copy">
          <nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span aria-current="page">The menu</span></nav>
          <p class="eyebrow-line">Five chapters · ${allMenuItems.length} dishes</p>
          <h1 id="menu-title">The <em class="glow-text">menu.</em></h1>
          <p class="carte-hero__lede">Every craving has its own chapter. Slow-churned gelato, sourdough pizza, brews, waffles and savoury plates, all made for sharing.</p>
          <div class="carte-hero__actions">
            <a class="button" href="#gelato">Start with gelato <i data-lucide="arrow-down"></i></a>
            <a class="button button--ghost" href="${PDF}" download>Download the menu <span class="button__meta">PDF · ${pdfSize}</span></a>
          </div>
        </div>
        <div class="carte-hero__art" aria-hidden="true">
          <img class="carte-hero__feather" src="${ART}peacock-feather.webp" alt="" />
          <div class="carte-hero__arch"><img src="${ART}gelato-cup.webp" alt="" fetchpriority="high" /></div>
          <svg class="carte-hero__outline" viewBox="0 0 200 300" preserveAspectRatio="none"><path d="M2 300V118C2 72 40 48 69 31C85 22 95 13 100 2C105 13 115 22 131 31C160 48 198 72 198 118V300" fill="none" stroke="currentColor" stroke-width="1.2" vector-effect="non-scaling-stroke" /></svg>
          <img class="carte-hero__scoop carte-hero__scoop--a" src="${ART}scoop-chocolate.webp" alt="" />
          <img class="carte-hero__scoop carte-hero__scoop--b" src="${ART}scoop-fruit.webp" alt="" />
        </div>
      </div>
      <ol class="carte-index container">${menuChapters.map((c, i) => `
        <li style="--accent: ${chapterArt[c.id].accent}"><a href="#${c.id}"><span class="carte-index__no">${String(i + 1).padStart(2, '0')}</span><span class="carte-index__name">${esc(c.title)}</span><span class="carte-index__meta">${(counts[c.id] ?? counts.default)(c)}</span><img class="carte-index__art${chapterArt[c.id].markPhoto ? ' is-photo' : ''}" src="${ART}${chapterArt[c.id].mark}.webp" alt="" loading="lazy" /></a></li>`).join('')}
      </ol>
    </section>

    <div class="carte-nav" data-carte-nav>
      <div class="carte-nav__bar container">
        <nav class="carte-nav__links" aria-label="Menu chapters" data-carte-links>${menuChapters.map((c) => `<a href="#${c.id}" data-carte-link="${c.id}">${esc(c.short)}</a>`).join('')}<span class="carte-nav__indicator" aria-hidden="true"></span></nav>
        <button class="carte-nav__search" type="button" aria-expanded="false" aria-controls="carte-search" data-carte-search-toggle hidden><i data-lucide="search"></i><span>Search</span></button>
      </div>
      <div class="carte-search container" id="carte-search" data-carte-search hidden>
        <label class="sr-only" for="carte-search-input">Search the menu</label>
        <input id="carte-search-input" type="search" placeholder="Try mango, pizza or latte…" autocomplete="off" enterkeyhint="search" />
        <p class="carte-search__status" role="status" aria-live="polite" data-carte-status></p>
      </div>
    </div>

    <div class="carte-chapters" data-menu-catalogue>${menuChapters.map((c, i) => chapterBlock(c, i) + (c.id === 'gelato' ? gelatoStory : '')).join('')}
      <div class="carte-empty container" data-carte-empty hidden><h2>Nothing matches that yet.</h2><p>Try another name or ingredient, such as mango, paneer or latte.</p></div>
    </div>

    <section class="carte-close">
      <div class="container">
        <div class="carte-notes">
          <p>Prices in Indian rupees. GST is charged separately as applicable.</p>
          <p>Prices marked “Ask us” will be confirmed by our team. Photography is illustrative.</p>
          <p>For ingredient or allergy questions, please speak to our team before ordering.</p>
        </div>
        <div class="gallery-cta">
          <p class="eyebrow-line eyebrow-line--center">Hungry yet?</p>
          <h2>Bring your appetite. <em class="glow-text">We’ll bring the choices.</em></h2>
          <p>Come by for a scoop, a slice or a long evening with everyone you love.</p>
          <div class="gallery-cta__actions"><a class="button" href="visit.html">Plan your visit <i data-lucide="arrow-right"></i></a><a class="button button--ghost" href="${PDF}" download>Download the menu</a></div>
        </div>
      </div>
    </section>
  </main>`;

const template = fs.readFileSync(path.join(root, 'src/site/menu-page.html'), 'utf8');
fs.writeFileSync(path.join(root, 'public/menu.html'), template.replace('<!-- MENU_CONTENT -->', main).replace(/[\t ]+$/gm, ''));
const ask = allMenuItems.filter((i) => i.sizes && Object.values(i.sizes).includes(null)).length;
console.log(`Menu: ${allMenuItems.length} products, ${menuChapters.length} chapters, ${ask} family-pack prices pending, PDF ${pdfSize}.`);
