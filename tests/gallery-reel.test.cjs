const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { buildSync } = require('esbuild');
const code = buildSync({ entryPoints: ['src/gallery-reel.ts'], bundle: true, write: false, format: 'cjs', platform: 'node' }).outputFiles[0].text;

function setup() {
  const window = new EventTarget();
  window.ontouchstart = null;
  window.matchMedia = () => ({ matches: false });
  let timerId = 0;
  const timers = new Map();
  window.setTimeout = window.setInterval = (callback) => { timers.set(++timerId, callback); return timerId; };
  window.clearTimeout = window.clearInterval = (id) => timers.delete(id);
  const document = new EventTarget();
  document.hidden = false;
  const classes = () => {
    const names = new Set();
    return { add: (name) => names.add(name), remove: (name) => names.delete(name),
      contains: (name) => names.has(name), toggle: (name, on) => on ? names.add(name) : names.delete(name) };
  };
  const style = () => ({ setProperty() {} });
  let row;
  const makeItem = () => {
    const item = { classList: classes(), style: style(), offsetWidth: 100, setAttribute() {}, cloneNode: () => makeItem() };
    Object.defineProperty(item, 'offsetLeft', { get: () => row.children.indexOf(item) * 120 });
    return item;
  };
  row = { children: [], style: style(), prepend(...items) { this.children.unshift(...items); },
    append(...items) { this.children.push(...items); }, querySelectorAll: () => [] };
  row.children = [makeItem(), makeItem(), makeItem()];
  const surface = new EventTarget();
  surface.clientWidth = 300;
  surface.classList = classes();
  surface.querySelector = (selector) => selector === '[data-reel-row]' ? row : null;
  surface.closest = () => ({ querySelector: () => null });
  const captures = new Set();
  surface.hasPointerCapture = (id) => captures.has(id);
  surface.setPointerCapture = (id) => captures.add(id);
  surface.releasePointerCapture = (id) => captures.delete(id);
  const reducedMotion = new EventTarget();
  reducedMotion.matches = false;
  let now = 0;
  const context = { module: { exports: {} }, window, document, AbortController,
    performance: { now: () => now }, IntersectionObserver: class { observe() {} disconnect() {} },
    ResizeObserver: class { observe() {} } };
  vm.runInNewContext(code, context);
  context.module.exports.mountGalleryReel(surface, reducedMotion);
  const emit = (target, type, values = {}) => {
    now += 20;
    const event = new Event(type, { cancelable: true });
    Object.defineProperties(event, Object.fromEntries(Object.entries({ timeStamp: now, ...values }).map(([key, value]) => [key, { value }])));
    target.dispatchEvent(event);
    return event;
  };
  const touch = (x, y = 100, identifier = 1) => ({ clientX: x, clientY: y, identifier });
  const start = () => emit(surface, 'touchstart', { touches: [touch(200)] });
  const move = (x, y = 100) => emit(surface, 'touchmove', { touches: [touch(x, y)] });
  const end = (x) => emit(window, 'touchend', { changedTouches: [touch(x)] });
  const center = () => row.children.findIndex((item) => item.classList.contains('is-center')) % 3;
  return { window, document, surface, row, captures, emit, touch, start, move, end, center };
}

test('Cancelled long swipes keep the current photo and release the next gesture', () => {
  for (const x of [80, 320]) {
    const s = setup(); const initial = s.row.style.transform;
    s.start(); s.move(x); s.emit(s.window, 'touchcancel');
    assert.equal(s.center(), 0);
    assert.equal(s.row.style.transform, initial);
    assert.equal(s.surface.classList.contains('is-dragging'), false);
    s.start(); s.move(80); s.end(80);
    assert.equal(s.center(), 1);
  }
});

test('Vertical scrolling and adding a second finger remain native and keep the photo', () => {
  const s = setup(); s.start();
  assert.equal(s.move(205, 160).defaultPrevented, false);
  s.end(205); assert.equal(s.center(), 0);
  s.start(); s.move(80);
  const pinch = s.emit(s.surface, 'touchstart', { touches: [s.touch(80), s.touch(260, 100, 2)] });
  assert.equal(pinch.defaultPrevented, false);
  assert.equal(s.center(), 0);
  const pinchMove = s.emit(s.surface, 'touchmove', { touches: [s.touch(50), s.touch(290, 100, 2)] });
  assert.equal(pinchMove.defaultPrevented, false);
  assert.equal(s.surface.classList.contains('is-dragging'), false);
});

test('Mouse cancellation and window blur restore the current photo and release capture', () => {
  for (const finish of ['pointercancel', 'blur']) {
    const s = setup();
    const pointer = { pointerType: 'mouse', isPrimary: true, button: 0, pointerId: 4, clientX: 200, clientY: 100 };
    s.emit(s.surface, 'pointerdown', pointer);
    s.emit(s.window, 'pointermove', { ...pointer, clientX: 80 });
    s.emit(s.window, finish, pointer);
    assert.equal(s.center(), 0);
    assert.equal(s.captures.size, 0);
    assert.equal(s.surface.classList.contains('is-dragging'), false);
  }
});

test('Completed swipes still advance both ways and rapid looping stays in bounds', () => {
  const s = setup();
  for (let i = 1; i <= 15; i++) {
    s.start(); s.move(80); s.end(80); assert.equal(s.center(), i % 3);
  }
  for (let i = 1; i <= 15; i++) {
    s.start(); s.move(320); s.end(320); assert.equal(s.center(), (3 - i % 3) % 3);
  }
});

test('A swipe cannot open a photo accidentally; the next intentional tap works', () => {
  const s = setup(); s.start(); s.move(80); s.end(80);
  assert.equal(s.emit(s.surface, 'click', { detail: 1 }).defaultPrevented, true);
  s.start(); s.end(200);
  assert.equal(s.emit(s.surface, 'click', { detail: 1 }).defaultPrevented, false);
});

test('The reel permits browser vertical scrolling and pinch zoom in CSS', () => {
  const css = fs.readFileSync('src/site.css', 'utf8');
  const rule = css.match(/\.gallery-reel__slider\s*\{([^}]+)\}/)[1];
  assert.match(rule, /touch-action:\s*pan-y\s+pinch-zoom\s*;/);
});
