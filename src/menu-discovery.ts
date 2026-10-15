// Progressive enhancement: the complete, priced menu is already in the HTML.
const menuRoot = document.querySelector<HTMLElement>('[data-menu-catalogue]');
if (menuRoot) {
  const chapters = [...menuRoot.querySelectorAll<HTMLElement>('[data-menu-chapter]')];
  const sections = [...menuRoot.querySelectorAll<HTMLElement>('[data-menu-group]')];
  const items = [...menuRoot.querySelectorAll<HTMLElement>('[data-menu-item]')];
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-menu-category]')];
  const search = document.querySelector<HTMLInputElement>('#menu-search')!;
  const recommendation = document.querySelector<HTMLSelectElement>('#menu-recommendation')!;
  const size = document.querySelector<HTMLSelectElement>('#gelato-size')!;
  const jump = document.querySelector<HTMLSelectElement>('[data-menu-jump]')!;
  const status = document.querySelector<HTMLElement>('[data-menu-status]')!;
  const empty = document.querySelector<HTMLElement>('[data-menu-empty]')!;
  const clear = document.querySelector<HTMLButtonElement>('[data-menu-clear]')!;
  const normalise = (value:string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const searchIndex = new Map(items.map(item=>[item, normalise(`${item.dataset.search} ${item.closest('[data-menu-group]')?.querySelector('h3')?.textContent}`)]));
  let selected = 'gelato';
  let announceTimer = 0;
  function apply(announce = true) {
    const terms = normalise(search.value).split(' ').filter(Boolean);
    let count = 0;
    for (const chapter of chapters) {
      let chapterCount = 0;
      for (const group of chapter.querySelectorAll<HTMLElement>('[data-menu-group]')) {
        let groupCount = 0;
        for (const item of group.querySelectorAll<HTMLElement>('[data-menu-item]')) {
          const matches = (selected==='all'||chapter.dataset.menuChapter===selected) && terms.every(term=>searchIndex.get(item)!.includes(term)) && (!recommendation.value||item.dataset.badge===recommendation.value);
          item.hidden = !matches;
          if (matches) groupCount++;
        }
        group.hidden = groupCount===0;
        chapterCount += groupCount;
      }
      chapter.hidden = chapterCount===0;
      count += chapterCount;
    }
    links.forEach(link=>link.toggleAttribute('aria-current',link.dataset.menuCategory===selected));
    links.forEach(link=>{if(link.hasAttribute('aria-current'))link.setAttribute('aria-current','true')});
    empty.hidden = count!==0;
    clear.hidden = !search.value;
    const label = selected==='all'?'the full menu':chapters.find(c=>c.dataset.menuChapter===selected)?.querySelector('h2')?.textContent;
    const message = `${count} ${count===1?'item':'items'} in ${label}${search.value ? ` matching “${search.value}”` : ''}${recommendation.value ? ` · ${recommendation.options[recommendation.selectedIndex].text}` : ''}`;
    clearTimeout(announceTimer);
    if(announce) announceTimer=window.setTimeout(()=>{status.textContent=message},180);
    else status.textContent=message;
    jump.replaceChildren(new Option('Choose a section',''));
    sections.filter(g=>!g.hidden).forEach(g=>jump.add(new Option(g.querySelector('h3')!.textContent!,g.id)));
    jump.disabled = count===0;
  }
  function setHash(hash:string) { history.pushState(null,'',`#${hash}`); }
  function scrollToMenu() { document.querySelector('#menu-browser')?.scrollIntoView({behavior:'auto',block:'start'}); }
  function fromHash() {
    let hash=''; try { hash=decodeURIComponent(location.hash.slice(1)); } catch { /* Invalid links fall back to gelato. */ }
    const section = sections.find(g=>g.id===hash);
    selected = hash==='all'?'all':chapters.some(c=>c.id===hash)?hash:section?.closest<HTMLElement>('[data-menu-chapter]')?.id??'gelato';
    search.value=''; recommendation.value=''; apply(false);
    if(hash && (section || chapters.some(c=>c.id===hash)||hash==='all')) requestAnimationFrame(()=>section?section.scrollIntoView({behavior:'auto',block:'start'}):scrollToMenu());
    const active = links.find(l=>l.dataset.menuCategory===selected);
    if(active) active.parentElement!.scrollLeft = active.offsetLeft - active.parentElement!.offsetLeft - 16;
  }
  links.forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault(); selected=link.dataset.menuCategory!;
    search.value=''; recommendation.value=''; apply(); setHash(selected); scrollToMenu();
  }));
  search.addEventListener('input',()=>{selected='all'; apply();});
  recommendation.addEventListener('change',()=>apply());
  clear.addEventListener('click',()=>{search.value='';apply();search.focus();});
  document.querySelector('[data-menu-reset]')?.addEventListener('click',()=>{
    selected='all'; search.value=''; recommendation.value=''; apply();setHash('all');search.focus();scrollToMenu();
  });
  jump.addEventListener('change',()=>{
    const target=sections.find(g=>g.id===jump.value); if(!target)return;
    setHash(target.id); target.scrollIntoView({behavior:'auto',block:'start'});
    const heading=target.querySelector<HTMLElement>('h3')!;heading.tabIndex=-1;heading.focus({preventScroll:true});
  });
  function updateSizes() {
    document.querySelectorAll<HTMLElement>('[data-price-size]').forEach(p=>{p.hidden=p.dataset.priceSize!==size.value;});
  }
  size.addEventListener('change',updateSizes);
  document.querySelectorAll<HTMLElement>('[data-menu-controls]').forEach(e=>{e.hidden=false});
  document.documentElement.classList.add('menu-enhanced');
  updateSizes(); fromHash();
  window.addEventListener('hashchange',fromHash);
  const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
  if(siteHeader) new ResizeObserver(()=>document.documentElement.style.setProperty('--menu-header-height',`${siteHeader.offsetHeight}px`)).observe(siteHeader);
}
