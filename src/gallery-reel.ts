// Homepage photo reel: one photo takes centre stage at a time and the rest step past,
// after the reference site's "signature plates" slider. Tapping a photo opens it on the gallery page.

import { bindHorizontalSwipe } from "./swipe";

const STEP_MS = 2600;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export const mountGalleryReel = (slider: HTMLElement, reducedMotion: MediaQueryList) => {
  const row = slider.querySelector<HTMLElement>("[data-reel-row]");
  if (!row) return;
  const originals = Array.from(row.children) as HTMLElement[];
  const count = originals.length;
  if (count < 2) return;

  // A copy of the set on each side lets the reel always step forward, then rewind
  // to the identical photo in the real (middle) set without a visible jump.
  const copy = (item: HTMLElement) => {
    const clone = item.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    clone.setAttribute("tabindex", "-1");
    return clone;
  };
  row.prepend(...originals.map(copy));
  row.append(...originals.map(copy));
  const items = Array.from(row.children) as HTMLElement[];

  const section = slider.closest("section") ?? slider;
  const toggle = section.querySelector<HTMLButtonElement>("[data-reel-toggle]");
  const toggleLabel = section.querySelector<HTMLElement>("[data-reel-toggle-label]");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  let index = count;
  let timer = 0;
  let rewindTimer = 0;
  let userPaused = false;
  let hovering = false;
  let focused = false;
  let visible = false;
  let dragging = false;

  const offsetFor = (i: number) => slider.clientWidth / 2 - (items[i].offsetLeft + items[i].offsetWidth / 2);

  const paint = (animate: boolean) => {
    const duration = animate && !reducedMotion.matches ? "0.8s" : "0s";
    row.style.transition = `transform ${duration} ${EASE}`;
    row.style.transform = `translate3d(${offsetFor(index)}px, 0, 0)`;
    items.forEach((item, i) => {
      const distance = i - index;
      item.classList.toggle("is-center", distance === 0);
      item.style.setProperty("--reel-tilt", distance === 0 ? "0deg" : distance > 0 ? "6deg" : "-6deg");
    });
  };

  const goTo = (next: number, animate = true) => {
    window.clearTimeout(rewindTimer);
    index = next;
    paint(animate);
    if (index >= count * 2 || index < count) {
      const settle = animate && !reducedMotion.matches ? 820 : 0;
      rewindTimer = window.setTimeout(() => {
        index += index >= count * 2 ? -count : count;
        paint(false);
      }, settle);
    }
  };

  const canPlay = () => !userPaused && !hovering && !focused && visible && !dragging &&
    !document.hidden && !reducedMotion.matches;

  const sync = () => {
    window.clearInterval(timer);
    timer = 0;
    if (canPlay()) timer = window.setInterval(() => goTo(index + 1), STEP_MS);
    if (toggle) toggle.hidden = reducedMotion.matches;
  };

  const syncToggle = () => {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggle.setAttribute("aria-label", userPaused ? "Play the moving photos" : "Pause the moving photos");
    if (toggleLabel) toggleLabel.textContent = userPaused ? "Play" : "Pause";
  };

  toggle?.addEventListener("click", () => {
    userPaused = !userPaused;
    syncToggle();
    sync();
  });

  // Drag or swipe one photo at a time; a real drag never also counts as a tap.
  let baseX = 0;

  bindHorizontalSwipe(slider, {
    start: () => {
      dragging = true;
      window.clearTimeout(rewindTimer);
      // A new gesture can interrupt the loop rewind. Keep the same photograph
      // in the middle set so repeated swipes never run beyond the cloned items.
      if (index < count || index >= count * 2) {
        index = count + ((index % count) + count) % count;
        paint(false);
      }
      baseX = offsetFor(index);
      sync();
    },
    move: (deltaX) => {
      slider.classList.add("is-dragging");
      row.style.transition = "none";
      row.style.transform = `translate3d(${baseX + deltaX}px, 0, 0)`;
    },
    end: ({ deltaX, dragged, cancelled }) => {
      dragging = false;
      slider.classList.remove("is-dragging");
      // Browser-owned scroll, pinch, blur and cancellation must never select
      // another photograph. Restore the current one without a competing glide.
      if (cancelled) paint(false);
      else if (dragged && deltaX <= -50) goTo(index + 1);
      else if (dragged && deltaX >= 50) goTo(index - 1);
      else if (dragged) paint(true);
      sync();
    },
  });

  // Keyboard: the focused photo slides to the centre and the reel waits.
  slider.addEventListener("focusin", (event) => {
    focused = true;
    slider.scrollLeft = 0;
    const item = (event.target as Element).closest<HTMLElement>(".gallery-reel__item");
    const i = item ? items.indexOf(item) : -1;
    if (i >= 0 && i !== index) goTo(i);
    sync();
  });
  slider.addEventListener("focusout", (event) => {
    if (slider.contains(event.relatedTarget as Node | null)) return;
    focused = false;
    sync();
  });

  slider.addEventListener("pointerenter", () => {
    if (!finePointer.matches) return;
    hovering = true;
    sync();
  });
  slider.addEventListener("pointerleave", () => {
    hovering = false;
    sync();
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }, { threshold: 0.2 }).observe(slider);
  document.addEventListener("visibilitychange", sync);
  reducedMotion.addEventListener?.("change", () => {
    paint(false);
    sync();
  });
  new ResizeObserver(() => paint(false)).observe(slider);

  // Fetch every photo shortly before the reel arrives: copies start far off screen,
  // so lazy loading alone would leave blank frames sliding into view.
  const preload = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    row.querySelectorAll("img").forEach((image) => { image.loading = "eager"; });
    preload.disconnect();
  }, { rootMargin: "800px 0px" });
  preload.observe(slider);

  // Leave the no-script strip mode first: its scroll snapping may have scrolled the slider.
  slider.classList.add("is-ready");
  slider.scrollLeft = 0;
  paint(false);
  syncToggle();
};
