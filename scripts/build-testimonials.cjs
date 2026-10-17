// Guest reviews for the Story and Visit pages, rendered from src/site/testimonials.json
// between the <!-- testimonials:start --> and <!-- testimonials:end --> markers.
// Sample data always renders visibly as samples, so placeholders can't pass for real reviews.
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const PAGES = ['public/story.html', 'public/visit.html'];
const START = '<!-- testimonials:start -->';
const END = '<!-- testimonials:end -->';

const esc = (value) => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stars = (rating) => {
  const whole = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return `${'★'.repeat(whole)}<span class="is-empty">${'★'.repeat(5 - whole)}</span>`;
};

function render(data) {
  // "hidden" publishes the pages without reviews (e.g. before the real ones are in).
  if (data.status === 'hidden') return `${START}\n    ${END}`;
  const sample = data.status !== 'live';
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];
  const hasScore = !sample && typeof data.rating === 'number';
  // One star after the score: five drawn stars would round 4.7 up to a perfect 5.
  const summary = hasScore
    ? `<span class="reviews__score">${esc(data.rating.toFixed(1))}</span><span class="reviews__star" aria-hidden="true">★</span><span class="sr-only">out of 5,</span><span>${data.count ? `${esc(data.count)} ` : ''}${esc(data.source)} reviews</span>${data.asOf ? `<span class="reviews__asof">(${esc(data.asOf)})</span>` : ''}`
    : `<span class="reviews__stars" aria-hidden="true">${stars(5)}</span><span>${esc(data.source)} reviews</span>${sample ? '<span class="reviews__badge">Sample</span>' : ''}`;
  const cards = reviews.map((review) => {
    const initial = esc((String(review.name || '?').trim()[0] || '?').toUpperCase());
    const meta = [review.context, review.date].filter(Boolean).map(esc).join(' · ');
    // Word for word: blank lines become paragraphs, single line breaks stay line breaks.
    const text = String(review.text || '').split(/\n{2,}/).map((part) => `<p>${esc(part).replace(/\n/g, '<br />')}</p>`).join('');
    return `
          <figure class="review-card">
            <div class="review-card__top"><span class="review-card__stars" role="img" aria-label="${esc(review.rating)} out of 5 stars">${stars(review.rating)}</span><span class="review-card__source">${esc(data.source)}</span>${sample ? '<span class="review-card__sample">Sample</span>' : ''}</div>
            <blockquote>${text}</blockquote>
            <button class="review-card__more" type="button" aria-expanded="false" hidden>Read more</button>
            <figcaption><span class="review-card__avatar" aria-hidden="true">${initial}</span><span class="review-card__who"><strong>${esc(review.name)}</strong>${meta ? `<span>${meta}</span>` : ''}</span></figcaption>
          </figure>`;
  }).join('');
  return `${START}
    <section class="reviews${sample ? ' reviews--sample' : ''}" aria-labelledby="reviews-title" data-reviews data-ambient>
      <div class="reviews__inner container">
        <header class="reviews__head">
          <p class="eyebrow-line reveal">Guest reviews</p>
          <h2 id="reviews-title" class="reveal d1">Loved at <em class="glow-text">our tables.</em></h2>
          <p class="reviews__summary reveal d2">${summary}</p>${data.summary ? `
          <p class="reviews__intro reveal d2">${esc(data.summary)}</p>` : ''}${sample ? `
          <p class="reviews__note reveal d2">Sample reviews for layout only. Real ${esc(data.source)} reviews will replace them before this goes live.</p>` : ''}
          <div class="reviews__actions reveal d3">
            <a class="button button--ghost" href="${esc(data.profileUrl)}" target="_blank" rel="noopener">Read reviews on ${esc(data.source)} <i data-lucide="arrow-right"></i></a>
            <div class="reviews__controls" data-reviews-controls hidden>
              <button class="reviews__control" type="button" data-reviews-prev aria-label="Previous review"><i data-lucide="arrow-left"></i></button>
              <button class="reviews__control" type="button" data-reviews-next aria-label="Next review"><i data-lucide="arrow-right"></i></button>
            </div>
          </div>
        </header>
        <div class="reviews__track" role="region" aria-label="Guest reviews" tabindex="0" data-reviews-track>${cards}
        </div>
      </div>
    </section>
    ${END}`;
}

function build() {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'src/site/testimonials.json'), 'utf8'));
  const block = render(data);
  for (const page of PAGES) {
    const file = path.join(root, page);
    const html = fs.readFileSync(file, 'utf8');
    const start = html.indexOf(START);
    const end = html.indexOf(END);
    if (start < 0 || end < start) throw new Error(`${page}: testimonial markers missing`);
    fs.writeFileSync(file, html.slice(0, start) + block + html.slice(end + END.length));
  }
  const label = { live: 'live', hidden: 'hidden (not shown)' }[data.status] ?? 'SAMPLE';
  console.log(`Reviews: ${data.reviews.length} reviews, ${label}, on ${PAGES.length} pages.`);
}

module.exports = { render, build };
if (require.main === module) build();
