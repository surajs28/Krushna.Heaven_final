const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const { buildSync } = require('esbuild');
const code = buildSync({ entryPoints: ['src/dna-gesture.ts'], bundle: true, write: false, format: 'cjs', platform: 'node' }).outputFiles[0].text;
const context = { module: { exports: {} } };
vm.runInNewContext(code, context);
const dna = context.module.exports;

const CARDS = 5;
const REST = 0.35;
const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} ≈ ${expected}`);

test('Laptops and desktops hold the section; short windows and phones keep document flow', () => {
  assert.equal(dna.dnaShouldPin(true, 749), true); // 13-inch MacBook Air, Chrome
  assert.equal(dna.dnaShouldPin(true, 657), true); // 1366×768 screen with browser bars
  assert.equal(dna.dnaShouldPin(true, 600), true);
  assert.equal(dna.dnaShouldPin(true, 599), false);
  assert.equal(dna.dnaShouldPin(false, 900), false);
});

test('Five cards turn over four steps, then card 5 rests before the page moves on', () => {
  close(dna.dnaScrollSpan(CARDS, REST), 4.35);
  close(dna.dnaProgressToPosition(0, CARDS, REST), 0);
  close(dna.dnaProgressToPosition(1 / 4.35, CARDS, REST), 1);
  close(dna.dnaProgressToPosition(4 / 4.35, CARDS, REST), 4);
  close(dna.dnaProgressToPosition(0.97, CARDS, REST), 4); // inside the rest: card 5 stays in front
  close(dna.dnaProgressToPosition(1, CARDS, REST), 4);
  close(dna.dnaProgressToPosition(-0.2, CARDS, REST), 0);
});

test('Scrolling comes to rest on every card, in order, and at the end of the rest', () => {
  const points = Array.from(dna.dnaSnapPoints(CARDS, REST));
  assert.equal(points.length, CARDS + 1);
  points.forEach((point, index) => {
    if (index > 0) assert.ok(point > points[index - 1], 'snap points rise in card order');
  });
  points.slice(0, CARDS).forEach((point, card) => close(dna.dnaProgressToPosition(point, CARDS, REST), card));
  close(points[CARDS], 1);
});

test('Clicks, dots, keys and drags reach a card position inside the held section', () => {
  const start = 1000;
  const end = start + Math.round(749 * 0.85 * dna.dnaScrollSpan(CARDS, REST));
  assert.equal(dna.dnaCardScrollTop(start, end, 0, CARDS, REST), start);
  const last = dna.dnaCardScrollTop(start, end, 4, CARDS, REST);
  assert.ok(last > start && last < end, 'card 5 shows before the section lets go');
  assert.equal(dna.dnaCardScrollTop(start, end, 9, CARDS, REST), last, 'past card 5 clamps to card 5');
  assert.equal(dna.dnaCardScrollTop(start, end, -3, CARDS, REST), start, 'before card 1 clamps to card 1');
  assert.equal(dna.dnaCardScrollTop(start, end, 2.4, CARDS, REST), dna.dnaCardScrollTop(start, end, 2, CARDS, REST));
  // Whole-pixel offsets still put the chosen card in front.
  const middle = dna.dnaCardScrollTop(start, end, 2, CARDS, REST);
  assert.ok(Math.abs(dna.dnaProgressToPosition((middle - start) / (end - start), CARDS, REST) - 2) < 0.01);
});
