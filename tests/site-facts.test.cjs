const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

// Contact facts approved on 17 October 2026 (old krushnasheaven.com + final menu).
const PAGES = ['index', 'menu', 'gallery', 'story', 'visit'].map((name) => `public/${name}.html`);
const FACEBOOK = 'https://www.facebook.com/share/1NuEDB7wnS/';

test('Every footer carries the full address, daily hours, +91 phone and both social links', () => {
  for (const page of PAGES) {
    const html = fs.readFileSync(page, 'utf8');
    const footer = html.slice(html.indexOf('<footer'));
    assert.match(footer, /Vitthal Rao Shivarkar Rd, Tatya Tope Housing Society/, page);
    assert.match(footer, /Open daily, 8 AM – 1:30 AM/, page);
    assert.match(footer, /\+91 91566 00883/, page);
    assert.ok(footer.includes(FACEBOOK) && footer.includes('instagram.com/krushnasheaven'), page);
  }
});

test('No page still says hours are coming soon or shows a phone without +91', () => {
  for (const page of PAGES) {
    const html = fs.readFileSync(page, 'utf8');
    assert.doesNotMatch(html, /hours coming soon|today’s timings/i, page);
    assert.doesNotMatch(html, /(?<!\+91 )91566 0088[34]/, page);
  }
});

test('Search data lists the hours, full street address and Facebook', () => {
  const html = fs.readFileSync('public/index.html', 'utf8');
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(data.openingHours, 'Mo-Su 08:00-01:30');
  assert.match(data.address.streetAddress, /Vitthal Rao Shivarkar Road, Tatya Tope Housing Society/);
  assert.ok(data.sameAs.includes(FACEBOOK));
});
