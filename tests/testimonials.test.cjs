const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { render } = require('../scripts/build-testimonials.cjs');

const data = JSON.parse(fs.readFileSync('src/site/testimonials.json', 'utf8'));
const count = (html, needle) => html.split(needle).length - 1;

test('Sample reviews can never pass for real ones', () => {
  const html = render({ ...data, status: 'sample', rating: 4.9, count: 300 });
  assert.equal(count(html, 'class="review-card__sample"'), data.reviews.length, 'every card is tagged Sample');
  assert.match(html, /reviews__note/);
  assert.match(html, /reviews--sample/);
  assert.doesNotMatch(html, /reviews__score/, 'no overall rating is shown for samples, even if one is filled in');
});

test('Live reviews show the Google rating and no sample labels', () => {
  const live = {
    ...data,
    status: 'live',
    rating: 4.7,
    count: 212,
    reviews: [{ name: 'Asha', context: 'Family dinner', rating: 4, date: 'October 2026', text: 'Lovely <b>gelato</b> & pizza.' }],
  };
  const html = render(live);
  assert.doesNotMatch(html, /Sample|reviews__note|reviews--sample/);
  assert.match(html, /<span class="reviews__score">4\.7<\/span>/);
  assert.match(html, /212 Google reviews/);
  assert.match(html, /aria-label="4 out of 5 stars">★★★★<span class="is-empty">★<\/span>/);
  assert.match(html, /Lovely &lt;b&gt;gelato&lt;\/b&gt; &amp; pizza\./, 'review text is escaped');
  assert.match(html, /Family dinner · October 2026/);
});

test('Hidden status leaves the review section out entirely', () => {
  const html = render({ ...data, status: 'hidden' });
  assert.doesNotMatch(html, /review-card|data-reviews|Sample/);
  assert.match(html, /<!-- testimonials:start -->\s*<!-- testimonials:end -->/);
});

test('Both pages carry the built review section that matches the data status', () => {
  const shown = data.status === 'hidden' ? 0 : 1;
  for (const page of ['public/story.html', 'public/visit.html']) {
    const html = fs.readFileSync(page, 'utf8');
    assert.equal(count(html, '<!-- testimonials:start -->'), 1, page);
    assert.equal(count(html, '<!-- testimonials:end -->'), 1, page);
    assert.equal(count(html, 'data-reviews '), shown, page);
    assert.equal(count(html, 'class="review-card"'), shown * data.reviews.length, page);
    if (data.status !== 'sample') assert.doesNotMatch(html, /review-card__sample|reviews__badge/, `${page}: no sample reviews outside sample mode`);
  }
});
