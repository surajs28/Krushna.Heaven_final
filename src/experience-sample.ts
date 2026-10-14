import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const header = document.querySelector<HTMLElement>("[data-header]");
const hero = document.querySelector<HTMLElement>(".hero");
const heroShots = Array.from(document.querySelectorAll<HTMLElement>(".hero-shot"));
const currentShotLabel = document.querySelector<HTMLElement>("[data-shot-current]");
const shotProgress = document.querySelector<HTMLElement>("[data-shot-progress]");
const motionToggle = document.querySelector<HTMLButtonElement>(".motion-toggle");
const motionToggleLabel = motionToggle?.querySelector<HTMLElement>("span");
const conceptNote = document.querySelector<HTMLElement>(".concept-note");
const conceptNoteClose = document.querySelector<HTMLButtonElement>(".concept-note__close");
const menuTrigger = document.querySelector<HTMLButtonElement>(".menu-trigger");
const menuPanel = document.querySelector<HTMLElement>(".menu-panel");
const menuLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".menu-panel__links a"));
const experienceTrack = document.querySelector<HTMLElement>("[data-experience-track]");
const experienceCards = Array.from(document.querySelectorAll<HTMLElement>(".experience-card"));
const experienceNumber = document.querySelector<HTMLElement>("[data-experience-number]");
const experienceProgress = document.querySelector<HTMLElement>("[data-experience-progress]");

let activeShot = 0;
let activeExperience = 0;
let motionPaused = reduceMotion.matches;
let heroTimer: gsap.core.Tween | null = null;
let menuTimeline: gsap.core.Timeline | null = null;
let lastFocused: HTMLElement | null = null;

const pad = (value: number) => String(value).padStart(2, "0");

function setHeaderState() {
  if (!header || !hero) return;
  header.classList.toggle("is-solid", window.scrollY > hero.offsetHeight - 110);
}

function updateMotionControl() {
  document.body.classList.toggle("is-motion-paused", motionPaused);
  motionToggle?.setAttribute("aria-pressed", String(motionPaused));
  if (motionToggleLabel) motionToggleLabel.textContent = motionPaused ? "Play motion" : "Pause motion";
}

function stopHeroTimer() {
  heroTimer?.kill();
  heroTimer = null;
}

function scheduleNextShot() {
  stopHeroTimer();
  if (motionPaused || document.hidden || heroShots.length < 2 || !shotProgress) return;

  gsap.set(shotProgress, { transformOrigin: "left", scaleX: 0 });
  heroTimer = gsap.to(shotProgress, {
    scaleX: 1,
    duration: 4.2,
    ease: "none",
    onComplete: () => showShot((activeShot + 1) % heroShots.length),
  });
}

function showShot(index: number, immediate = false) {
  if (!heroShots.length) return;
  const nextIndex = Math.max(0, Math.min(index, heroShots.length - 1));
  const previous = heroShots[activeShot];
  const next = heroShots[nextIndex];
  activeShot = nextIndex;

  if (currentShotLabel) currentShotLabel.textContent = pad(activeShot + 1);

  if (immediate || reduceMotion.matches) {
    heroShots.forEach((shot, shotIndex) => {
      shot.classList.toggle("is-current", shotIndex === activeShot);
      gsap.set(shot, { opacity: shotIndex === activeShot ? 1 : 0, scale: 1.035 });
    });
    scheduleNextShot();
    return;
  }

  next.classList.add("is-current");
  gsap.set(next, { opacity: 0, scale: 1.055 });
  gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      previous?.classList.remove("is-current");
      scheduleNextShot();
    },
  })
    .to(previous, { opacity: 0, scale: 1.01, duration: 0.75 }, 0)
    .to(next, { opacity: 1, scale: 1.035, duration: 1.1 }, 0.08);
}

function playHeroEntrance() {
  if (reduceMotion.matches) {
    gsap.set([".site-header", ".hero-note", ".hero h1", ".hero-copy", ".hero-actions", ".hero-status", ".motion-toggle"], {
      opacity: 1,
      clearProps: "transform",
    });
    return;
  }

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".site-header", { opacity: 0, y: -18, duration: 0.55 })
    .from(".hero-note", { opacity: 0, y: 14, duration: 0.5 }, 0.16)
    .from(".hero h1", { opacity: 0, yPercent: 18, duration: 0.9 }, 0.24)
    .from(".hero-copy", { opacity: 0, y: 18, duration: 0.65 }, 0.45)
    .from(".hero-actions .button", { opacity: 0, y: 15, duration: 0.55, stagger: 0.07 }, 0.58)
    .from([".hero-status", ".motion-toggle", ".scroll-cue"], { opacity: 0, duration: 0.5, stagger: 0.06 }, 0.75);
}

function revealSections() {
  const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    gsap.set(revealItems, { opacity: 1, clearProps: "transform,clipPath" });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      const kind = element.dataset.reveal;

      if (kind === "image") {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 1.05,
          ease: "power3.out",
        });
      } else {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: kind === "card" ? 0.72 : 0.82,
          ease: "power3.out",
        });
      }

      observer.unobserve(element);
    }
  }, { rootMargin: "0px 0px -10%", threshold: 0.16 });

  revealItems.forEach((item) => observer.observe(item));
}

function setExperienceState(index: number, progress?: number) {
  const bounded = Math.max(0, Math.min(index, experienceCards.length - 1));
  activeExperience = bounded;
  if (experienceNumber) experienceNumber.textContent = pad(activeExperience + 1);

  const normalized = progress ?? (experienceCards.length > 1 ? activeExperience / (experienceCards.length - 1) : 1);
  if (experienceProgress) gsap.set(experienceProgress, { scaleX: Math.max(0.02, normalized) });

  if (window.innerWidth > 760 && !reduceMotion.matches) {
    experienceCards.forEach((card, cardIndex) => {
      const distance = Math.abs(cardIndex - activeExperience);
      gsap.to(card, {
        opacity: distance === 0 ? 1 : distance === 1 ? 0.72 : 0.48,
        scale: distance === 0 ? 1 : 0.96,
        duration: 0.42,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }
}

function setupExperiences() {
  if (!experienceTrack || experienceCards.length === 0) return;

  const match = gsap.matchMedia();

  match.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
    setExperienceState(0, 0.02);

    const getDistance = () => Math.max(0, experienceTrack.scrollWidth - window.innerWidth);
    const tween = gsap.to(experienceTrack, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".experiences",
        start: "top top",
        end: () => `+=${Math.max(getDistance(), window.innerHeight * 3.6)}`,
        pin: ".experience-stage",
        scrub: 0.75,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(experienceCards.length - 1, Math.round(self.progress * (experienceCards.length - 1)));
          if (nextIndex !== activeExperience) setExperienceState(nextIndex, self.progress);
          else if (experienceProgress) gsap.set(experienceProgress, { scaleX: Math.max(0.02, self.progress) });
        },
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(experienceTrack, { clearProps: "transform" });
      gsap.set(experienceCards, { clearProps: "opacity,transform" });
    };
  });

  match.add("(max-width: 760px)", () => {
    gsap.set(experienceCards, { clearProps: "opacity,transform" });
    const onScroll = () => {
      const cardWidth = experienceCards[0]?.getBoundingClientRect().width || 1;
      const gap = 12;
      const index = Math.round(experienceTrack.scrollLeft / (cardWidth + gap));
      const maxScroll = Math.max(1, experienceTrack.scrollWidth - experienceTrack.clientWidth);
      setExperienceState(index, experienceTrack.scrollLeft / maxScroll);
    };
    experienceTrack.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => experienceTrack.removeEventListener("scroll", onScroll);
  });
}

function openMenu() {
  if (!menuPanel || !menuTrigger) return;
  lastFocused = document.activeElement as HTMLElement;
  menuTrigger.setAttribute("aria-expanded", "true");
  menuPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("menu-open");
  gsap.set(menuPanel, { visibility: "visible" });

  menuTimeline?.kill();
  if (reduceMotion.matches) {
    gsap.set(menuPanel, { clipPath: "inset(0 0 0% 0)" });
    gsap.set(menuLinks, { opacity: 1, clearProps: "transform" });
    menuLinks[0]?.focus();
    return;
  }

  menuTimeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: () => menuLinks[0]?.focus() })
    .fromTo(menuPanel, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.48 })
    .fromTo(menuLinks, { opacity: 0, yPercent: 28 }, { opacity: 1, yPercent: 0, duration: 0.55, stagger: 0.055 }, 0.18)
    .fromTo([".menu-panel__lead", ".menu-panel__details"], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.25);
}

function closeMenu(restoreFocus = true) {
  if (!menuPanel || !menuTrigger || menuPanel.getAttribute("aria-hidden") === "true") return;
  menuTrigger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  menuTimeline?.kill();

  const finish = () => {
    menuPanel.setAttribute("aria-hidden", "true");
    gsap.set(menuPanel, { visibility: "hidden" });
    if (restoreFocus) lastFocused?.focus();
  };

  if (reduceMotion.matches) {
    gsap.set(menuPanel, { clipPath: "inset(0 0 100% 0)" });
    finish();
    return;
  }

  menuTimeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish })
    .to(menuLinks, { opacity: 0, yPercent: -18, duration: 0.22, stagger: 0.025 })
    .to(menuPanel, { clipPath: "inset(0 0 100% 0)", duration: 0.38, ease: "power3.inOut" }, 0.08);
}

function handleMenuKeyboard(event: KeyboardEvent) {
  if (!menuPanel || menuPanel.getAttribute("aria-hidden") === "true") return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = Array.from(menuPanel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function setupHeroScroll() {
  if (reduceMotion.matches || !hero) return;
  gsap.to(".hero-media", {
    yPercent: 7,
    scale: 1.025,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

conceptNoteClose?.addEventListener("click", () => {
  gsap.to(conceptNote, {
    opacity: 0,
    y: 12,
    duration: 0.2,
    ease: "power3.out",
    onComplete: () => conceptNote?.remove(),
  });
});

motionToggle?.addEventListener("click", () => {
  motionPaused = !motionPaused;
  updateMotionControl();
  if (motionPaused) stopHeroTimer();
  else scheduleNextShot();
});

menuTrigger?.addEventListener("click", () => {
  if (menuTrigger.getAttribute("aria-expanded") === "true") closeMenu();
  else openMenu();
});

menuLinks.forEach((link) => link.addEventListener("click", () => closeMenu(false)));
document.addEventListener("keydown", handleMenuKeyboard);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopHeroTimer();
  else scheduleNextShot();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  if (window.location.hash) {
    const target = document.querySelector<HTMLElement>(window.location.hash);
    window.setTimeout(() => target?.scrollIntoView({ block: "start" }), 80);
  }
});

reduceMotion.addEventListener("change", () => window.location.reload());

updateMotionControl();
setHeaderState();
showShot(0, true);
playHeroEntrance();
revealSections();
setupExperiences();
setupHeroScroll();
