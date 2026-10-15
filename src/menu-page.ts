// Menu page ("carte"): chapter scroll-spy, gelato size switch and in-page search.
// The complete, priced menu is already in the HTML; this file only enhances it.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const nav = document.querySelector<HTMLElement>("[data-carte-nav]");
const linkBar = document.querySelector<HTMLElement>("[data-carte-links]");
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-carte-link]"));
const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-carte-chapter]"));
const spyTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-carte-chapter], [data-carte-alias]"));

/* ---------- Scroll-spy: the pill follows the chapter being read ---------- */
let active = "";
const moveIndicator = () => {
  if (!linkBar) return;
  const link = links.find((item) => item.dataset.carteLink === active);
  if (!link) {
    linkBar.style.setProperty("--indicator-width", "0px");
    return;
  }
  linkBar.style.setProperty("--indicator-x", `${link.offsetLeft}px`);
  linkBar.style.setProperty("--indicator-width", `${link.offsetWidth}px`);
  // Phones scroll the bar sideways: keep the current chapter in view.
  const room = linkBar.scrollWidth - linkBar.clientWidth;
  if (room > 0) {
    const target = link.offsetLeft - (linkBar.clientWidth - link.offsetWidth) / 2;
    linkBar.scrollTo({ left: Math.max(0, Math.min(room, target)), behavior: reducedMotion.matches ? "auto" : "smooth" });
  }
};
const setActive = (id: string) => {
  if (id === active) return;
  active = id;
  links.forEach((link) => {
    if (link.dataset.carteLink === id) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
  moveIndicator();
};
const inBand = new Set<HTMLElement>();
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const target = entry.target as HTMLElement;
    if (entry.isIntersecting) inBand.add(target);
    else inBand.delete(target);
  });
  const current = spyTargets.find((target) => inBand.has(target) && !target.hidden);
  setActive(current ? current.dataset.carteAlias ?? current.id : "");
}, { rootMargin: "-38% 0px -58% 0px" });
spyTargets.forEach((target) => spy.observe(target));
if (linkBar) new ResizeObserver(moveIndicator).observe(linkBar);

/* ---------- The sticky bar gains a backdrop once it is pinned ---------- */
if (nav) {
  let frame = 0;
  const syncStuck = () => {
    frame = 0;
    const top = parseFloat(getComputedStyle(nav).top) || 0;
    nav.classList.toggle("is-stuck", nav.getBoundingClientRect().top <= top + 1);
  };
  window.addEventListener("scroll", () => {
    if (!frame) frame = window.requestAnimationFrame(syncStuck);
  }, { passive: true });
  syncStuck();
}

/* ---------- Gelato: one tap shows every flavour's price for a size ---------- */
const boards = document.querySelector<HTMLElement>("[data-flavour-boards]");
const sizeSwitch = boards?.querySelector<HTMLElement>("[data-size-switch]");
if (boards && sizeSwitch) {
  const buttons = Array.from(sizeSwitch.querySelectorAll<HTMLButtonElement>("[data-size-option]"));
  const applySize = (size: string, remember = true) => {
    boards.dataset.size = size;
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sizeOption === size)));
    if (!remember) return;
    try { localStorage.setItem("kh-gelato-size", size); } catch { /* Private mode: the choice simply isn't kept. */ }
  };
  let initial = "single";
  try { initial = localStorage.getItem("kh-gelato-size") ?? "single"; } catch { /* Storage unavailable. */ }
  if (!buttons.some((button) => button.dataset.sizeOption === initial)) initial = "single";
  sizeSwitch.hidden = false;
  applySize(initial, false);
  buttons.forEach((button) => button.addEventListener("click", () => applySize(button.dataset.sizeOption ?? "single")));
}

/* ---------- Search across every chapter ---------- */
const toggle = document.querySelector<HTMLButtonElement>("[data-carte-search-toggle]");
const panel = document.querySelector<HTMLElement>("[data-carte-search]");
const input = panel?.querySelector<HTMLInputElement>("input");
const statusLine = document.querySelector<HTMLElement>("[data-carte-status]");
const empty = document.querySelector<HTMLElement>("[data-carte-empty]");
const catalogue = document.querySelector<HTMLElement>("[data-menu-catalogue]");
if (toggle && panel && input && statusLine && empty && catalogue) {
  const items = Array.from(catalogue.querySelectorAll<HTMLElement>("[data-menu-item]"));
  const groups = Array.from(catalogue.querySelectorAll<HTMLElement>("[data-menu-group]"));
  const tiers = Array.from(catalogue.querySelectorAll<HTMLElement>("[data-flavour-tier]"));
  const suites = Array.from(catalogue.querySelectorAll<HTMLElement>(".carte-suite"));
  const normalise = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const index = new Map(items.map((item) => [item, normalise(item.dataset.search ?? item.textContent ?? "")]));
  const hasVisibleItem = (element: Element) => element.querySelector("[data-menu-item]:not([hidden])") !== null;
  let announce = 0;

  const run = () => {
    const query = input.value.trim();
    const terms = normalise(query).split(" ").filter(Boolean);
    const searching = terms.length > 0;
    let count = 0;
    items.forEach((item) => {
      const match = !searching || terms.every((term) => index.get(item)!.includes(term));
      item.hidden = !match;
      if (match && searching) count++;
    });
    [...tiers, ...groups, ...suites, ...chapters].forEach((element) => {
      element.hidden = searching && !hasVisibleItem(element);
    });
    document.documentElement.classList.toggle("is-menu-searching", searching);
    empty.hidden = !searching || count > 0;
    window.clearTimeout(announce);
    announce = window.setTimeout(() => {
      statusLine.textContent = searching
        ? `${count} ${count === 1 ? "dish matches" : "dishes match"} “${query}”`
        : "";
    }, 160);
  };

  const setOpen = (state: boolean) => {
    panel.hidden = !state;
    toggle.setAttribute("aria-expanded", String(state));
    if (state) input.focus();
    else if (input.value) {
      input.value = "";
      run();
    }
  };

  toggle.hidden = false;
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  input.addEventListener("input", () => {
    run();
    // Results start at the top of the menu; bring them into view if the reader is further down.
    if (input.value.trim() && catalogue.getBoundingClientRect().top < 0) {
      catalogue.scrollIntoView({ block: "start", behavior: "auto" });
    }
  });
  input.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    setOpen(false);
    toggle.focus();
  });
}

// A module, so these names never clash with window globals such as `status`.
export {};
