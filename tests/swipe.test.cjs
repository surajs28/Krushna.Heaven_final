const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { buildSync } = require('esbuild');
const code = buildSync({ entryPoints: ['src/swipe.ts'], bundle: true, write: false, format: 'cjs', platform: 'node' }).outputFiles[0].text;

function setup() {
  const window = new EventTarget();
  window.ontouchstart = null;
  const document = new EventTarget();
  document.hidden = false;
  const surface = new EventTarget();
  const captures = new Set();
  surface.hasPointerCapture = (id) => captures.has(id);
  surface.setPointerCapture = (id) => captures.add(id);
  surface.releasePointerCapture = (id) => captures.delete(id);
  let now = 0;
  const calls = [];
  const context = { module: { exports: {} }, window, document, AbortController, performance: { now: () => now } };
  vm.runInNewContext(code, context);
  const cleanup = context.module.exports.bindHorizontalSwipe(surface, {
    start: () => { calls.push(['start']); },
    move: (x) => calls.push(['move', x]),
    end: (value) => calls.push(['end', value]),
  });
  function emit(target, type, values = {}) {
    now += 20;
    const event = new Event(type, { cancelable: true });
    Object.defineProperties(event, Object.fromEntries(Object.entries({ timeStamp: now, ...values }).map(([key, value]) => [key, { value }])));
    target.dispatchEvent(event);
    return event;
  }
  const touch = (x, y = 100, id = 7) => ({ clientX: x, clientY: y, identifier: id });
  const start = () => emit(surface, 'touchstart', { touches: [touch(200)] });
  const move = (x, y = 100) => emit(surface, 'touchmove', { touches: [touch(x, y)] });
  const end = (x) => emit(window, 'touchend', { changedTouches: [touch(x)] });
  return { window, document, surface, emit, touch, start, move, end, calls, cleanup, captures };
}

test('Android touch path responds to left and right swipes', () => {
  const s = setup();
  s.start(); assert.equal(s.move(158).defaultPrevented, true); s.end(158);
  assert.equal(s.calls.at(-1)[1].deltaX, -42);
  assert.equal(s.calls.at(-1)[1].dragged, true);
  s.start(); s.move(245); s.end(245);
  assert.equal(s.calls.at(-1)[1].deltaX, 45);
  s.cleanup();
});
test('vertical scrolling, diagonal jitter and pinch remain browser owned', () => {
  const s = setup(); s.start();
  assert.equal(s.move(204, 104).defaultPrevented, false);
  assert.equal(s.move(213, 112).defaultPrevented, false);
  assert.equal(s.move(217, 150).defaultPrevented, false);
  assert.equal(s.calls.at(-1)[1].cancelled, true);
  assert.equal(s.calls.some(x => x[0] === 'move'), false);
  s.start();
  assert.equal(s.emit(s.surface, 'touchmove', { touches: [s.touch(160), s.touch(220, 100, 8)] }).defaultPrevented, false);
  assert.equal(s.calls.at(-1)[1].cancelled, true);
  s.cleanup();
});
test('synthetic touch pointer events do not start a second gesture', () => {
  const s = setup();
  s.emit(s.surface, 'pointerdown', { pointerType:'touch', isPrimary:true, button:0, pointerId:1, clientX:200, clientY:100 });
  assert.equal(s.calls.length, 0);
  s.start(); s.move(150); s.end(150);
  assert.equal(s.calls.filter(x=>x[0]==='start').length, 1);
  s.cleanup();
});
test('cancel and window blur release the gesture; the next swipe works', () => {
  const s = setup(); s.start(); s.move(160);
  s.emit(s.window, 'touchcancel');
  assert.equal(s.calls.at(-1)[1].cancelled, true);
  s.start(); s.move(155); s.emit(s.window,'blur');
  assert.equal(s.calls.at(-1)[1].cancelled, true);
  s.start(); s.move(240); s.end(240);
  assert.equal(s.calls.at(-1)[1].cancelled, false);
  s.cleanup();
});
test('swipe suppresses a ghost click but the next intentional tap works', () => {
  const s = setup(); s.start(); s.move(160); s.end(160);
  assert.equal(s.emit(s.surface,'click',{detail:1}).defaultPrevented,true);
  s.start(); s.end(200);
  assert.equal(s.emit(s.surface,'click',{detail:1}).defaultPrevented,false);
  s.cleanup();
});
test('mouse drag can end outside the surface and releases capture', () => {
  const s = setup();
  const pointer = { pointerType:'mouse', isPrimary:true, button:0, pointerId:2, clientX:200, clientY:100 };
  s.emit(s.surface,'pointerdown',pointer);
  s.emit(s.window,'pointermove',{...pointer,clientX:150});
  assert.equal(s.captures.has(2), true);
  s.emit(s.window,'pointerup',{...pointer,clientX:150});
  assert.equal(s.captures.size,0);
  assert.equal(s.calls.at(-1)[1].dragged,true);
  s.cleanup();
});
test('teardown removes listeners and ends active touch exactly once', () => {
  const s=setup(); s.start(); s.move(150); s.cleanup();
  const count=s.calls.length; s.start(); s.move(130); s.end(130);
  assert.equal(s.calls.length,count);
  assert.equal(s.calls.at(-1)[1].cancelled,true);
});
