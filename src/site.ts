import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Expand,
  IceCreamCone,
  PartyPopper,
  UtensilsCrossed,
  Search,
  Store,
  X,
  createIcons,
} from "lucide";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mountAmbientLights } from "./ambient-lights";
import { mountGalleryReel } from "./gallery-reel";
import {
  dnaCardScrollTop,
  dnaProgressToPosition,
  dnaScrollSpan,
  dnaShouldPin,
  dnaSnapPoints,
  dnaSwipeTarget,
} from "./dna-gesture";
import { bindHorizontalSwipe } from "./swipe";

gsap.registerPlugin(ScrollTrigger);

const iconSet = {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Expand,
  IceCreamCone,
  PartyPopper,
  UtensilsCrossed,
  Search,
  Store,
  X,
};

const root = document.documentElement;
const header = document.querySelector<HTMLElement>("[data-site-header]");
const trigger = document.querySelector<HTMLButtonElement>("[data-menu-trigger]");
const overlay = document.querySelector<HTMLElement>("[data-menu-overlay]");
const firstMenuLink = overlay?.querySelector<HTMLAnchorElement>("a");
const desktop = window.matchMedia("(min-width: 56.25rem)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const menuBackground = Array.from(document.querySelectorAll<HTMLElement>("main, .site-footer, .skip-link, .site-header .brand, .site-header .primary-nav, .site-header .header-actions > :not([data-menu-trigger])"));

const setMenu = (open: boolean, restoreFocus = false) => {
  if (!trigger || !overlay) return;

  root.classList.toggle("menu-is-open", open);
  trigger.setAttribute("aria-expanded", String(open));
  trigger.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  overlay.setAttribute("aria-hidden", String(!open));
  overlay.toggleAttribute("inert", !open);
  menuBackground.forEach((element) => { element.inert = open; });
  document.dispatchEvent(new CustomEvent("site-menu-toggle", { detail: { open } }));

  if (open) {
    window.requestAnimationFrame(() => firstMenuLink?.focus());
  } else if (restoreFocus) {
    trigger.focus();
  }
};

trigger?.addEventListener("click", () => {
  setMenu(trigger.getAttribute("aria-expanded") !== "true");
});

overlay?.addEventListener("click", (event) => {
  if ((event.target as Element).closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (trigger?.getAttribute("aria-expanded") !== "true") return;
  if (event.key === "Escape") {
    setMenu(false, true);
  }
  if (event.key === "Tab" && overlay) {
    const controls = [trigger, ...overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
    const index = controls.indexOf(document.activeElement as HTMLElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault(); controls.at(-1)?.focus();
    } else if (!event.shiftKey && (index === controls.length - 1 || index < 0)) {
      event.preventDefault(); trigger.focus();
    }
  }
});

desktop.addEventListener?.("change", () => setMenu(false));

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

document.querySelectorAll<HTMLElement>("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

createIcons({
  icons: iconSet,
  attrs: {
    "aria-hidden": "true",
    width: "18",
    height: "18",
    "stroke-width": "1.8",
  },
});

const hero = document.querySelector<HTMLElement>("[data-hero]");
const heroVideo = document.querySelector<HTMLVideoElement>("[data-hero-video]");
const mobileFilm = window.matchMedia("(max-width: 40rem)");

if (hero && heroVideo) {
  const syncPoster = () => {
    const nextPoster = mobileFilm.matches
      ? heroVideo.dataset.mobilePoster
      : heroVideo.dataset.desktopPoster;
    if (nextPoster) heroVideo.poster = nextPoster;
  };
  syncPoster();
  mobileFilm.addEventListener?.("change", syncPoster);

  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  const preserveData = Boolean(
    connection?.saveData || connection?.effectiveType?.includes("2g"),
  );
  let heroVisible = true;
  let menuOpen = false;
  let webmFallbackUsed = false;

  const syncPlayback = async () => {
    if (menuOpen || !heroVisible || document.hidden || reducedMotion.matches || preserveData || !heroVideo.getAttribute("src")) {
      heroVideo.pause();
      return;
    }

    try {
      await heroVideo.play();
    } catch {}
  };

  const sourceFor = (format: "webm" | "mp4") => {
    const screen = mobileFilm.matches ? "mobile" : "desktop";
    return heroVideo.dataset[`${screen}${format === "webm" ? "Webm" : "Mp4"}` as keyof DOMStringMap];
  };

  const loadFilm = () => {
    if (reducedMotion.matches || preserveData) return;
    const supportsWebm = heroVideo.canPlayType('video/webm; codecs="vp9"') !== "";
    const nextSource = sourceFor(supportsWebm ? "webm" : "mp4");
    if (!nextSource || heroVideo.getAttribute("src") === nextSource) return;

    webmFallbackUsed = !supportsWebm;
    hero.classList.remove("is-video-ready");
    heroVideo.src = nextSource;
    heroVideo.preload = "metadata";
    heroVideo.load();
  };

  heroVideo.addEventListener("loadeddata", () => {
    void syncPlayback();
  });
  // A decoded poster is not proof of playback (Android battery saver may reject play).
  heroVideo.addEventListener("playing", () => {
    const reveal = () => {
      if (!heroVideo.paused && !reducedMotion.matches) hero.classList.add("is-video-ready");
    };
    if ("requestVideoFrameCallback" in heroVideo) heroVideo.requestVideoFrameCallback(reveal);
    else reveal();
  });

  heroVideo.addEventListener("error", () => {
    if (!webmFallbackUsed) {
      const mp4 = sourceFor("mp4");
      if (mp4) {
        webmFallbackUsed = true;
        heroVideo.src = mp4;
        heroVideo.load();
        return;
      }
    }
    hero.classList.remove("is-video-ready");
  });
  document.addEventListener("site-menu-toggle", (event) => {
    menuOpen = Boolean((event as CustomEvent<{ open: boolean }>).detail.open);
    void syncPlayback();
  });
  document.addEventListener("visibilitychange", () => void syncPlayback());
  new IntersectionObserver(
    ([entry]) => {
      heroVisible = entry.isIntersecting && entry.intersectionRatio > 0.08;
      void syncPlayback();
    },
    { threshold: [0, 0.08, 0.2] },
  ).observe(hero);

  mobileFilm.addEventListener?.("change", loadFilm);
  reducedMotion.addEventListener?.("change", () => {
    if (reducedMotion.matches) {
      heroVideo.pause();
      heroVideo.removeAttribute("src");
      heroVideo.load();
      hero.classList.remove("is-video-ready");
      return;
    }
    loadFilm();
  });
  loadFilm();
}

const heroMotion = gsap.matchMedia();
heroMotion.add("(prefers-reduced-motion: no-preference)", () => {
  if (!hero) return;
  const lineInners = hero.querySelectorAll<HTMLElement>(".hero__line > span");
  const introEyebrow = hero.querySelector<HTMLElement>('[data-hero-intro="eyebrow"]');
  const introCopy = hero.querySelector<HTMLElement>('[data-hero-intro="copy"]');
  const introActions = hero.querySelector<HTMLElement>('[data-hero-intro="actions"]');
  const introCue = hero.querySelector<HTMLElement>('[data-hero-intro="cue"]');
  const introSeal = hero.querySelector<HTMLElement>('[data-hero-intro="seal"]');
  const heroMedia = hero.querySelector<HTMLElement>(".hero__media");
  const heroCopy = hero.querySelector<HTMLElement>(".hero__copy");
  const introHeader = document.querySelector<HTMLElement>(".page-home .site-header");
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Headline leads; navigation and actions stay usable from the first frame.
  if (introHeader) intro.from(introHeader, { opacity: 0.6, y: -8, duration: 0.4 }, 0);
  intro.from(lineInners, { yPercent: 108, duration: 0.8, stagger: 0.08 }, 0);
  if (introEyebrow) intro.from(introEyebrow, { autoAlpha: 0, y: 12, duration: 0.5 }, 0.12);
  if (introCopy) intro.from(introCopy, { autoAlpha: 0, y: 16, duration: 0.55 }, 0.38);
  if (introActions) intro.from(introActions.children, { opacity: 0.75, y: 10, duration: 0.45, stagger: 0.05 }, 0.5);
  if (introCue) intro.from(introCue, { autoAlpha: 0, y: 10, duration: 0.5 }, 0.75);
  if (introSeal) intro.from(introSeal, { autoAlpha: 0, scale: 0.88, duration: 0.6 }, 0.75);

  if (heroMedia) {
    // The film drifts at ~18% of scroll speed while it gently enlarges, as on the reference.
    gsap.to(heroMedia, {
      y: () => hero.offsetHeight * 0.18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
    });
  }

  if (heroCopy) {
    gsap.to(heroCopy, {
      yPercent: -5,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
    });
  }
});

// Laptop/desktop orbit: each card holds the page for this share of a screen's scrolling,
// and the last card rests briefly before the section lets the page move on.
const DNA_STEP_SCREENS = 0.85;
const DNA_END_REST = 0.35;

const dnaSection = document.querySelector<HTMLElement>("[data-dna-carousel]");
const dnaPin = dnaSection?.querySelector<HTMLElement>("[data-dna-pin]");
const dnaStage = dnaSection?.querySelector<HTMLElement>("[data-dna-stage]");
const dnaCards = Array.from(dnaSection?.querySelectorAll<HTMLAnchorElement>("[data-dna-card]") ?? []);

if (dnaSection && dnaPin && dnaStage && dnaCards.length > 1) {
  const dnaCount = dnaSection.querySelector<HTMLElement>("[data-dna-count]");
  const dnaTitle = dnaSection.querySelector<HTMLElement>("[data-dna-title]");
  const dnaCopy = dnaSection.querySelector<HTMLElement>("[data-dna-copy]");
  const dnaLink = dnaSection.querySelector<HTMLAnchorElement>("[data-dna-link]");
  const dnaLinkLabel = dnaSection.querySelector<HTMLElement>("[data-dna-link-label]");
  const dnaMotion = dnaSection.querySelector<HTMLButtonElement>("[data-dna-motion]");
  const dnaMotionLabel = dnaSection.querySelector<HTMLElement>("[data-dna-motion-label]");
  const dnaSteps = Array.from(dnaSection.querySelectorAll<HTMLButtonElement>("[data-dna-step]"));
  const dnaHeader = dnaSection.querySelector<HTMLElement>(".dna-experience__header");
  const dnaItems = dnaCards.map((card) => ({
    title: card.dataset.title ?? "",
    copy: card.dataset.copy ?? "",
    linkLabel: card.dataset.linkLabel ?? "Explore",
    href: card.getAttribute("href") ?? "menu.html",
    video: card.querySelector<HTMLVideoElement>("video"),
  }));
  const total = dnaCards.length;
  const wrapIndex = (value: number) => ((value % total) + total) % total;
  const dnaDesktop = window.matchMedia("(min-width: 56.25rem)");
  let rotationPaused = false;
  // Rebuilding the scene must not re-hide a heading the visitor has already seen.
  let dnaHeaderShown = false;
  let teardown = () => {};

  const setupDna = () => {
    dnaStage.classList.remove("is-ready", "is-static", "is-moving", "is-dragging");
    dnaCards.forEach((card) => {
      card.removeAttribute("aria-current");
      gsap.set(card, { clearProps: "transform,opacity,zIndex,visibility" });
    });

    if (reducedMotion.matches) {
      dnaStage.classList.add("is-static");
      return () => dnaStage.classList.remove("is-static");
    }

    const controller = new AbortController();
    const { signal } = controller;
    // Desktop scroll already drives the orbit; a timer moving it too fights the reader.
    const scrollDriven = dnaDesktop.matches;
    if (dnaMotion) dnaMotion.hidden = scrollDriven;
    const state = { position: 0 };
    let activeIndex = -1;
    let positionTween: ReturnType<typeof gsap.to> | null = null;
    let metaTimeline: ReturnType<typeof gsap.timeline> | null = null;
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;
    let scrollTween: ReturnType<typeof gsap.to> | null = null;
    let headerTween: ReturnType<typeof gsap.from> | null = null;
    let scrollPosition = 0;
    let manualOffset = 0;
    let interacting = false;
    let startPosition = 0;
    let manualUntil = 0;
    let dragging = false;
    let sectionVisible = false;
    let menuOpen = false;
    let autoTimer = 0;
    let scrollIdleTimer = 0;
    let scrolling = false;
    let keyboardFocus = false;
    let readingCopy = false;
    let automaticTransition = false;
    let resizeFrame = 0;
    // Held laptop/desktop section: page scroll alone picks the card (set up below).
    let pinnedSteps = false;
    let scrollToCard: ((card: number) => void) | null = null;
    let follow: ReturnType<typeof gsap.quickTo> | null = null;
    const layoutHeight = window.innerHeight;
    const cancelAuto = (interrupt = false) => {
      window.clearTimeout(autoTimer);
      autoTimer = 0;
      if (!interrupt || !automaticTransition) return;
      positionTween?.kill();
      positionTween = null;
      automaticTransition = false;
      manualOffset = state.position - scrollPosition;
      dnaStage.classList.remove("is-moving");
    };
    const canRotate = () => !scrollDriven && sectionVisible && !rotationPaused && !document.hidden &&
      !menuOpen && !dragging && !interacting && !scrolling && !keyboardFocus && !readingCopy;
    const scheduleAuto = () => {
      cancelAuto();
      if (!canRotate() || positionTween) return;
      autoTimer = window.setTimeout(() => {
        autoTimer = 0;
        if (canRotate()) animateTo(Math.round(state.position) + 1, true, 1.15, true);
      }, Math.max(3800, manualUntil - performance.now()));
    };
    const deferAutoAfterScroll = () => {
      cancelAuto(true);
      scrolling = true;
      window.clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        scrolling = false;
        // Without auto-play, settle on the nearest card so the orbit never rests mid-turn.
        // A held section already comes to rest on a card through its scroll snapping.
        const nearest = Math.round(state.position);
        if (scrollDriven && !pinnedSteps && !dragging && !positionTween && Math.abs(nearest - state.position) > 0.001) {
          animateTo(nearest, true, 0.45);
          return;
        }
        scheduleAuto();
      }, 700);
    };
    const syncMotion = () => {
      syncVideos();
      if (canRotate()) scheduleAuto();
      else cancelAuto(true);
    };
    const syncMotionLabel = () => {
      dnaMotion?.setAttribute("aria-pressed", String(rotationPaused));
      dnaMotion?.setAttribute("aria-label", rotationPaused
        ? "Resume automatic carousel rotation" : "Pause automatic carousel rotation");
      if (dnaMotionLabel) dnaMotionLabel.textContent = rotationPaused ? "Resume" : "Pause";
    };
    const syncVideos = () => {
      dnaItems.forEach((item, index) => {
        if (!item.video) return;
        if (index === activeIndex && sectionVisible && !menuOpen && !document.hidden) {
          void item.video.play().catch(() => undefined);
        } else {
          item.video.pause();
        }
      });
    };

    const setMetaContent = (index: number) => {
      const item = dnaItems[index];
      if (dnaCount) dnaCount.textContent = String(index + 1).padStart(2, "0");
      if (dnaTitle) dnaTitle.textContent = item.title;
      if (dnaCopy) dnaCopy.textContent = item.copy;
      if (dnaLink) dnaLink.setAttribute("href", item.href);
      if (dnaLinkLabel) dnaLinkLabel.textContent = item.linkLabel;
    };

    const updateActive = (index: number, animate = true) => {
      if (index === activeIndex) return;
      activeIndex = index;

      dnaCards.forEach((card, cardIndex) => {
        if (cardIndex === index) card.setAttribute("aria-current", "true");
        else card.removeAttribute("aria-current");
      });
      dnaSteps.forEach((step, stepIndex) => {
        if (stepIndex === index) step.setAttribute("aria-current", "true");
        else step.removeAttribute("aria-current");
      });

      const metaNodes = [dnaCount, dnaTitle, dnaCopy, dnaLink].filter(
        (node): node is HTMLElement => Boolean(node),
      );
      metaTimeline?.kill();
      gsap.killTweensOf(metaNodes);

      if (!animate || metaNodes.length === 0) {
        gsap.set(metaNodes, { clearProps: "transform,opacity,visibility" });
        setMetaContent(index);
        syncVideos();
        return;
      }

      metaTimeline = gsap
        .timeline({ onComplete: () => { metaTimeline = null; } })
        .to(metaNodes, {
          autoAlpha: 0,
          y: 8,
          duration: 0.11,
          stagger: 0.01,
          ease: "power2.out",
        })
        .add(() => setMetaContent(index))
        .fromTo(
          metaNodes,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            stagger: 0.035,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          },
        )
        .add(syncVideos, "<");
    };

    let sceneWidthPx = dnaStage.clientWidth;
    const render = (animateMeta = true) => {
      const width = sceneWidthPx;
      // Scale the desktop scene as one unit so phones retain its depth and tilt.
      const sceneScale = Math.min(1, width / 900);
      const sceneWidth = width / sceneScale;
      const radius = Math.min(Math.max(sceneWidth * 0.42, 330), 660) * sceneScale;
      const depthRange = 510 * sceneScale;
      const verticalRange = 34 * sceneScale;
      const rotationRange = 18;
      const stepAngle = (Math.PI * 2) / total;

      dnaCards.forEach((card, index) => {
        const angle = (index - state.position) * stepAngle;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const depth = (cosine + 1) / 2;
        const scale = 0.62 + 0.38 * depth;
        const opacity = 0.28 + 0.72 * Math.pow(depth, 0.8);

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: sine * radius,
          y: (1 - depth) * verticalRange + sine * 10 * sceneScale,
          z: (depth - 1) * depthRange,
          rotateY: -sine * rotationRange,
          rotateZ: -sine * 2.8,
          scale,
          opacity,
          zIndex: Math.round(depth * 100) + 1,
        });
      });

      updateActive(wrapIndex(Math.round(state.position)), animateMeta);
    };

    const animateTo = (target: number, fromDirectInput = true, duration = 0.42, automatic = false) => {
      cancelAuto();
      positionTween?.kill();
      automaticTransition = automatic;
      if (!automatic) manualUntil = performance.now() + 8000;
      if (fromDirectInput) manualOffset = target - scrollPosition;
      if (duration === 0) {
        positionTween = null;
        automaticTransition = false;
        state.position = target;
        render(false);
        dnaStage.classList.remove("is-moving");
        scheduleAuto();
        return;
      }
      dnaStage.classList.add("is-moving");
      positionTween = gsap.to(state, {
        position: target,
        duration,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => render(duration > 0),
        onComplete: () => {
          dnaStage.classList.remove("is-moving");
          positionTween = null;
          automaticTransition = false;
          manualOffset = state.position - scrollPosition;
          if (!automatic) manualUntil = performance.now() + 8000;
          scheduleAuto();
        },
      });
    };

    const moveToIndex = (index: number) => {
      if (scrollToCard) {
        scrollToCard(index);
        return;
      }
      const rounded = Math.round(state.position);
      const current = wrapIndex(rounded);
      let delta = index - current;
      if (delta > total / 2) delta -= total;
      if (delta < -total / 2) delta += total;
      animateTo(rounded + delta);
    };

    const orbit = dnaStage.querySelector<HTMLElement>("[data-dna-orbit]")!;
    const unbindSwipe = bindHorizontalSwipe(orbit, {
      start: () => {
        if (menuOpen || document.hidden) return false;
        cancelAuto(true);
        positionTween?.kill();
        positionTween = null;
        // The pointer owns the orbit until release; the scroll-follow glide waits.
        follow?.tween.pause();
        automaticTransition = false;
        interacting = true;
        dragging = false;
        keyboardFocus = false;
        startPosition = state.position;
        manualUntil = performance.now() + 8000;
        dnaStage.classList.remove("is-moving");
      },
      move: (deltaX) => {
        dragging = true;
        dnaStage.classList.add("is-dragging", "is-moving");
        const sensitivity = Math.max(160, Math.min(285, dnaStage.clientWidth * 0.52));
        state.position = startPosition - deltaX / sensitivity;
        manualOffset = state.position - scrollPosition;
        render(false);
      },
      end: ({deltaX, velocity, dragged, cancelled}) => {
        interacting = false;
        dragging = false;
        dnaStage.classList.remove("is-dragging", "is-moving");
        if (dragged) {
          const target = dnaSwipeTarget(startPosition, state.position, deltaX, velocity, dnaStage.clientWidth, cancelled);
          if (scrollToCard) scrollToCard(target);
          else animateTo(target, true, 0.42);
        } else scheduleAuto();
      },
    });

    dnaCards.forEach((card, index) => {
      card.addEventListener(
        "click",
        (event) => {
          if (event.detail > 0 && index !== activeIndex) {
            event.preventDefault();
            moveToIndex(index);
          }
        },
        { signal },
      );
    });

    dnaMotion?.addEventListener("click", () => {
      rotationPaused = !rotationPaused;
      // Explicit Resume is allowed to restart even while its button has focus.
      if (!rotationPaused) {
        keyboardFocus = false;
        manualUntil = 0;
      }
      syncMotionLabel();
      syncMotion();
    }, { signal });
    dnaSteps.forEach((step, index) => {
      step.addEventListener("click", () => moveToIndex(index), { signal });
    });

    dnaStage.addEventListener(
      "keydown",
      (event) => {
        keyboardFocus = true;
        cancelAuto(true);
        if (scrollToCard) {
          // Held section: keys move the page to the card, so scroll and orbit stay in step.
          const targets: Record<string, number> = {
            ArrowLeft: activeIndex - 1,
            ArrowRight: activeIndex + 1,
            Home: 0,
            End: total - 1,
          };
          if (event.key in targets) {
            event.preventDefault();
            scrollToCard(targets[event.key]);
          }
          return;
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          animateTo(Math.round(state.position) - 1, true, 0);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          animateTo(Math.round(state.position) + 1, true, 0);
        } else if (event.key === "Home") {
          event.preventDefault();
          const rounded = Math.round(state.position);
          animateTo(rounded - wrapIndex(rounded), true, 0);
        } else if (event.key === "End") {
          event.preventDefault();
          const rounded = Math.round(state.position);
          animateTo(rounded + (total - 1 - wrapIndex(rounded)), true, 0);
        }
      },
      { signal },
    );

    dnaStage.addEventListener("focusin", (event) => {
      if ((event.target as Element).matches(":focus-visible")) {
        keyboardFocus = true;
        cancelAuto(true);
      }
    }, { signal });
    dnaStage.addEventListener("focusout", (event) => {
      if (dnaStage.contains(event.relatedTarget as Node | null)) return;
      keyboardFocus = false;
      scheduleAuto();
    }, { signal });
    const copyPanel = dnaSection.querySelector<HTMLElement>(".dna-carousel__copy");
    copyPanel?.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover)").matches) return;
      readingCopy = true;
      cancelAuto(true);
    }, { signal });
    copyPanel?.addEventListener("pointerleave", () => {
      readingCopy = false;
      scheduleAuto();
    }, { signal });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        syncMotion();
      },
      { threshold: [0, 0.25, 0.5] },
    );
    visibilityObserver.observe(dnaStage);
    document.addEventListener("visibilitychange", syncMotion, { signal });
    document.addEventListener(
      "site-menu-toggle",
      (event) => {
        menuOpen = Boolean((event as CustomEvent<{ open: boolean }>).detail.open);
        syncMotion();
      },
      { signal },
    );

    const takeScrollControl = () => {
      cancelAuto(true);
      if (dragging) return;
      if (positionTween) {
        positionTween.kill();
        positionTween = null;
        dnaStage.classList.remove("is-moving");
        manualOffset = state.position - scrollPosition;
      }
      deferAutoAfterScroll();
    };

    if (dnaDesktop.matches) {
      const scrollState = { position: 0 };
      pinnedSteps = dnaShouldPin(true, window.innerHeight);
      if (pinnedSteps) {
        // Laptops and desktops: the section holds the page while scrolling turns cards
        // 1 → 5, comes to rest on a card whenever scrolling stops, and lets the page move
        // on only after the last card has rested. Pinning no longer depends on measuring
        // the scene before its cards are laid out, which left 749px-tall laptops unpinned.
        const span = dnaScrollSpan(total, DNA_END_REST);
        const glide = gsap.quickTo(state, "position", {
          duration: 0.55,
          ease: "power3.out",
          onUpdate: () => render(true),
        });
        follow = glide;
        scrollTween = gsap.to(scrollState, {
          position: 1,
          ease: "none",
          onUpdate: () => {
            const next = dnaProgressToPosition(scrollState.position, total, DNA_END_REST);
            if (Math.abs(next - scrollPosition) < 0.0001) return;
            scrollPosition = next;
            if (!dragging) glide(scrollPosition, state.position);
          },
          scrollTrigger: {
            trigger: dnaSection,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * DNA_STEP_SCREENS * span)}`,
            pin: dnaPin,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Snap from where scrolling actually stopped, in its direction: next card, not a
            // velocity guess (inertia turned a short nudge into a jump of several cards).
            snap: {
              snapTo: dnaSnapPoints(total, DNA_END_REST),
              inertia: false,
              directional: true,
              duration: { min: 0.25, max: 0.6 },
              delay: 0.1,
              ease: "power2.inOut",
            },
          },
        });
        scrollTrigger = scrollTween.scrollTrigger ?? null;
        // Card clicks, step dots, arrow keys and drags move the page to that card, so the
        // section still lets go after card 5 however the visitor got there.
        scrollToCard = (card) => {
          const trigger = scrollTrigger;
          if (!trigger) return;
          const target = Math.max(0, Math.min(total - 1, Math.round(card)));
          const top = dnaCardScrollTop(trigger.start, trigger.end, target, total, DNA_END_REST);
          if (trigger.isActive) {
            // While held, the page doesn't visibly move: only the orbit turns.
            window.scrollTo({ top, behavior: "instant" });
            glide(target, state.position);
          } else {
            window.scrollTo({ top, behavior: "smooth" });
          }
        };
      } else {
        // Windows too short for the one-screen scene stay in document flow so every
        // control is reachable; the orbit turns as the section passes.
        // Numeric scrub smooths an attached animation, not raw onUpdate writes.
        scrollTween = gsap.to(scrollState, {
          position: total - 1,
          ease: "none",
          onUpdate: () => {
            if (Math.abs(scrollState.position - scrollPosition) < 0.0001) return;
            deferAutoAfterScroll();
            scrollPosition = scrollState.position;
            if (dragging || positionTween) return;
            state.position = scrollPosition + manualOffset;
            render(true);
          },
          scrollTrigger: {
            trigger: dnaStage,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
        scrollTrigger = scrollTween.scrollTrigger ?? null;
        window.addEventListener("wheel", takeScrollControl, { passive: true, signal });
      }
    }
    // Phone page scroll never overwrites the card selected by a horizontal swipe.
    window.addEventListener("scroll", () => {
      if (sectionVisible) deferAutoAfterScroll();
    }, { passive: true, signal });

    window.addEventListener("resize", () => {
      sceneWidthPx = dnaStage.clientWidth;
      render(false);
      if (!dnaDesktop.matches || window.innerHeight === layoutHeight) return;
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(() => {
        teardown();
        teardown = setupDna();
        ScrollTrigger.refresh();
      });
    }, { passive: true, signal });
    dnaStage.classList.add("is-ready");
    sceneWidthPx = dnaStage.clientWidth;
    render(false);
    syncMotionLabel();

    // Breakpoint/pin teardown and browser resizing can settle after the resize
    // event. Measure the actual stage, so phone cards never keep a desktop orbit.
    const sceneObserver = new ResizeObserver(() => {
      const width = dnaStage.clientWidth;
      if (width === sceneWidthPx) return;
      sceneWidthPx = width;
      render(false);
    });
    sceneObserver.observe(dnaStage);

    if (dnaHeader && !dnaHeaderShown) {
      // fromTo, not from: a re-run of `from` would record the hidden state as the end state.
      headerTween = gsap.fromTo(dnaHeader.children, { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.08,
        ease: "power3.out",
        onComplete: () => { dnaHeaderShown = true; },
        scrollTrigger: {
          trigger: dnaSection,
          start: "top 78%",
          once: true,
        },
      });
    }

    return () => {
      unbindSwipe();
      controller.abort();
      cancelAuto(true);
      window.clearTimeout(scrollIdleTimer);
      window.cancelAnimationFrame(resizeFrame);
      visibilityObserver.disconnect();
      sceneObserver.disconnect();
      scrollTrigger?.kill();
      scrollTween?.kill();
      headerTween?.scrollTrigger?.kill();
      headerTween?.kill();
      if (dnaHeader) gsap.set(dnaHeader.children, { clearProps: "opacity,visibility,transform" });
      if (dnaMotion) dnaMotion.hidden = false;
      positionTween?.kill();
      metaTimeline?.kill();
      gsap.killTweensOf(state);
      gsap.killTweensOf([dnaCount, dnaTitle, dnaCopy, dnaLink]);
      dnaItems.forEach((item) => item.video?.pause());
      dnaStage.classList.remove("is-ready", "is-moving", "is-dragging");
      dnaCards.forEach((card) => gsap.set(card, { clearProps: "transform,opacity,zIndex,visibility" }));
    };
  };

  teardown = setupDna();
  reducedMotion.addEventListener?.("change", () => {
    teardown();
    teardown = setupDna();
    ScrollTrigger.refresh();
  });
  dnaDesktop.addEventListener?.("change", () => {
    teardown();
    teardown = setupDna();
    ScrollTrigger.refresh();
  });
}

const galleryGrid = document.querySelector<HTMLElement>("[data-gallery-grid]");
if (galleryGrid) {
  const figures = Array.from(galleryGrid.querySelectorAll<HTMLElement>("[data-gallery-item]"));
  const images = figures.map((figure) => figure.querySelector<HTMLImageElement>("img")!);
  const photos = figures.map((figure) => figure.querySelector<HTMLElement>(".gallery-journal__photo")!);
  const twoColumns = window.matchMedia("(max-width: 56.25rem)");
  let lastWidth = -1;
  let layoutFrame = 0;

  // Reserve each photograph's natural height and pack by the shortest column.
  // This preserves DOM narrative order, unlike CSS columns/dense-grid reordering.
  const layoutGallery = () => {
    const width = galleryGrid.clientWidth;
    if (!width) return;
    const count = twoColumns.matches ? 2 : 3;
    const gap = parseFloat(getComputedStyle(galleryGrid).columnGap);
    const tileWidth = (width - gap * (count - 1)) / count;
    galleryGrid.style.setProperty("--gallery-tile-width", `${tileWidth}px`);
    galleryGrid.classList.add("is-masonry");
    photos.forEach((photo) => {
      photo.style.removeProperty("height");
      photo.classList.remove("is-filled");
    });
    // Columns start level, as on the reference gallery; captions sit on the photos.
    const heights: number[] = new Array(count).fill(0);
    const lastInColumn: (HTMLElement | undefined)[] = [];
    const placements = figures.map((figure) => {
      const column = heights.indexOf(Math.min(...heights));
      const placement = { figure, left: column * (tileWidth + gap), top: heights[column] };
      heights[column] += figure.offsetHeight + gap;
      lastInColumn[column] = figure;
      return { ...placement, column };
    });
    // Let each column's final photo crop taller (up to 60%) so the grid ends on one line.
    const bottom = Math.max(...heights);
    lastInColumn.forEach((figure, column) => {
      const photo = figure?.querySelector<HTMLElement>(".gallery-journal__photo");
      if (!photo) return;
      const extra = Math.min(bottom - heights[column], photo.offsetHeight * 0.6);
      if (extra < 1) return;
      photo.style.height = `${photo.offsetHeight + extra}px`;
      photo.classList.add("is-filled");
      heights[column] += extra;
    });
    placements.forEach(({ figure, left, top, column }) => {
      figure.style.setProperty("--gallery-delay", `${column * 80}ms`);
      figure.style.left = `${left}px`;
      figure.style.top = `${top}px`;
    });
    galleryGrid.style.height = `${Math.max(...heights) - gap}px`;
    lastWidth = width;
  };

  const scheduleLayout = () => {
    cancelAnimationFrame(layoutFrame);
    layoutFrame = requestAnimationFrame(layoutGallery);
  };
  layoutGallery();
  new ResizeObserver(() => {
    if (galleryGrid.clientWidth !== lastWidth) scheduleLayout();
  }).observe(galleryGrid);
  void document.fonts.ready.then(scheduleLayout);
  images.forEach((image) => image.addEventListener("load", scheduleLayout, { once: true }));

  // Tiles rise into place once 16% is in view; each photo then fades in as it finishes loading,
  // so a slow photo never hides its tile or control.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.16 });
  images.forEach((image) => {
    const markLoaded = () => image.classList.add("is-loaded");
    if (image.complete) markLoaded();
    else {
      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", markLoaded, { once: true });
    }
  });

  if (!reducedMotion.matches) galleryGrid.classList.add("is-revealing");
  figures.forEach((figure) => revealObserver.observe(figure));
  galleryGrid.addEventListener("focusin", (event) => {
    (event.target as HTMLElement).closest("[data-gallery-item]")?.classList.add("is-visible");
  });
  images.forEach((image) => image.addEventListener("error", () => {
    image.closest<HTMLElement>("[data-gallery-item]")?.classList.add("is-visible");
  }, { once: true }));
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      galleryGrid.classList.remove("is-revealing");
      figures.forEach((figure) => figure.classList.add("is-visible"));
      revealObserver.disconnect();
    }
  });
}

const galleryViewer = document.querySelector<HTMLDialogElement>("[data-gallery-viewer]");
if (galleryGrid && galleryViewer) {
  const triggers = Array.from(galleryGrid.querySelectorAll<HTMLButtonElement>("[data-gallery-open]"));
  const viewerImage = galleryViewer.querySelector<HTMLImageElement>("[data-viewer-image]")!;
  const viewerCaption = galleryViewer.querySelector<HTMLElement>("[data-viewer-caption]")!;
  const viewerCount = galleryViewer.querySelector<HTMLElement>("[data-viewer-count]")!;
  const viewerStatus = galleryViewer.querySelector<HTMLElement>("[data-viewer-status]")!;
  const viewerMedia = galleryViewer.querySelector<HTMLElement>("[data-viewer-media]")!;
  let requestedIndex = 0;
  let requestVersion = 0;
  let returnFocus: HTMLElement | null = null;
  let swapAnimation: Animation | null = null;

  const showPhoto = async (index: number, animate = true) => {
    requestedIndex = (index + triggers.length) % triggers.length;
    const version = ++requestVersion;
    const trigger = triggers[requestedIndex];
    const original = trigger.querySelector<HTMLImageElement>("img")!;
    const caption = trigger.closest("figure")?.querySelector("figcaption > span")?.textContent ?? "";
    galleryViewer.setAttribute("aria-busy", "true");
    viewerStatus.textContent = "Loading photo…";
    const fullPhoto = new Image();
    fullPhoto.src = original.src;
    let timeout = 0;
    try {
      await Promise.race([
        fullPhoto.decode(),
        new Promise((_, reject) => { timeout = window.setTimeout(() => reject(new Error("Photo timeout")), 12000); }),
      ]);
    } catch {
      if (version === requestVersion) {
        viewerStatus.textContent = "This photo could not load. Try the next photo.";
        galleryViewer.removeAttribute("aria-busy");
      }
      return;
    } finally { window.clearTimeout(timeout); }
    if (version !== requestVersion || !galleryViewer.open) return;
    swapAnimation?.cancel();
    viewerImage.style.transform = "";
    viewerImage.src = fullPhoto.src;
    viewerImage.alt = original.alt;
    viewerCaption.textContent = caption;
    viewerCount.textContent = `${String(requestedIndex + 1).padStart(2, "0")} / ${String(triggers.length).padStart(2, "0")}`;
    viewerStatus.textContent = "";
    galleryViewer.removeAttribute("aria-busy");
    if (animate && !reducedMotion.matches) {
      swapAnimation = viewerImage.animate([{ opacity: 0.45 }, { opacity: 1 }], { duration: 180, easing: getComputedStyle(root).getPropertyValue("--ease-out").trim() });
    }
  };

  triggers.forEach((trigger, index) => trigger.addEventListener("click", () => {
    returnFocus = trigger;
    viewerImage.removeAttribute("src");
    viewerCaption.textContent = "";
    viewerCount.textContent = "";
    galleryViewer.showModal();
    document.body.classList.add("gallery-viewer-open");
    void showPhoto(index);
  }));
  galleryViewer.querySelector("[data-viewer-close]")?.addEventListener("click", () => galleryViewer.close());
  galleryViewer.querySelector("[data-viewer-prev]")?.addEventListener("click", () => void showPhoto(requestedIndex - 1));
  galleryViewer.querySelector("[data-viewer-next]")?.addEventListener("click", () => void showPhoto(requestedIndex + 1));
  galleryViewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      void showPhoto(requestedIndex + (event.key === "ArrowRight" ? 1 : -1), false);
    }
  });
  galleryViewer.addEventListener("click", (event) => {
    if (event.target !== galleryViewer) return;
    const bounds = galleryViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) galleryViewer.close();
  });
  galleryViewer.addEventListener("close", () => {
    requestVersion++;
    swapAnimation?.cancel();
    document.body.classList.remove("gallery-viewer-open");
    returnFocus?.focus({ preventScroll: true });
    // Closing a photo opened from the reel should not reopen it on reload or Back.
    if (/^#photo-\d+$/.test(window.location.hash)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  });
  // A photo tapped in the homepage reel arrives as #photo-N and opens straight in the viewer.
  const openFromHash = () => {
    const match = /^#photo-(\d+)$/.exec(window.location.hash);
    const target = match ? triggers[Number(match[1]) - 1] : undefined;
    if (!target) return;
    target.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
    target.click();
  };
  if (document.readyState === "complete") openFromHash();
  else window.addEventListener("load", openFromHash, { once: true });
  window.addEventListener("hashchange", openFromHash);

  bindHorizontalSwipe(viewerMedia, {
    start: () => {
      if (!galleryViewer.open) return false;
      swapAnimation?.cancel();
    },
    move: (deltaX) => {
      if (!reducedMotion.matches) viewerImage.style.transform = `translateX(${Math.max(-28, Math.min(28, deltaX * 0.2))}px)`;
    },
    end: ({deltaX, dragged, cancelled}) => {
      viewerImage.style.transform = "";
      if (galleryViewer.open && dragged && !cancelled && Math.abs(deltaX) >= 30) {
        void showPhoto(requestedIndex + (deltaX < 0 ? 1 : -1));
      }
    },
  });
}

// Night sections share one drifting field of café lights.
document.querySelectorAll<HTMLElement>("[data-ambient]").forEach((section) => mountAmbientLights(section, reducedMotion));

// Homepage: just the photos moving; "View the full gallery" and each photo open gallery.html.
document.querySelectorAll<HTMLElement>("[data-reel]").forEach((slider) => mountGalleryReel(slider, reducedMotion));

// The gallery opener's photo moves slower than the page, like the reference page hero.
const galleryOpener = document.querySelector<HTMLElement>("[data-gallery-opener]");
const galleryBackdrop = document.querySelector<HTMLElement>("[data-gallery-backdrop]");
if (galleryOpener && galleryBackdrop) {
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(galleryBackdrop, { yPercent: -8 }, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: galleryOpener, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
}

// Full-bleed photo bands drift slower than the page (reference "parallax bands").
document.querySelectorAll<HTMLElement>("[data-parallax-media]").forEach((media) => {
  const band = media.parentElement ?? media;
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(media, { yPercent: -9 }, {
      yPercent: 9,
      ease: "none",
      scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
});

// Signature dish cards tilt gently towards the pointer (reference "3D tilt on dish cards").
const tiltPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
  let bounds: DOMRect | null = null;
  card.addEventListener("pointerenter", () => { bounds = card.getBoundingClientRect(); });
  card.addEventListener("pointermove", (event) => {
    if (!tiltPointer.matches || reducedMotion.matches || !bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
  });
  card.addEventListener("pointerleave", () => {
    bounds = null;
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
  });
});

// Our Story: a thin gold thread draws down the chapters as they are read.
const storyThread = document.querySelector<HTMLElement>("[data-story-thread]");
if (storyThread) {
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(storyThread, { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: storyThread.parentElement ?? storyThread, start: "top 65%", end: "bottom 65%", scrub: 0.4 },
    });
  });
}

// Story numbers count up once, as they come into view. The real figures are in the HTML.
const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
if (counters.length && "IntersectionObserver" in window && !reducedMotion.matches) {
  const countIn = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countIn.unobserve(entry.target);
      const node = entry.target as HTMLElement;
      const target = Number(node.dataset.count) || 0;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: target,
        duration: Math.min(1.6, 0.6 + target / 150),
        ease: "power2.out",
        onUpdate: () => { node.textContent = String(Math.round(counter.value)); },
      });
    });
  }, { threshold: 0.6 });
  counters.forEach((node) => {
    node.textContent = "0";
    countIn.observe(node);
  });
}

// Guest reviews: arrows step one card; touch, trackpads and keys scroll the row natively.
document.querySelectorAll<HTMLElement>("[data-reviews]").forEach((section) => {
  const track = section.querySelector<HTMLElement>("[data-reviews-track]");
  const controls = section.querySelector<HTMLElement>("[data-reviews-controls]");
  const prev = section.querySelector<HTMLButtonElement>("[data-reviews-prev]");
  const next = section.querySelector<HTMLButtonElement>("[data-reviews-next]");
  if (!track || !controls || !prev || !next) return;
  const step = () => {
    const card = track.querySelector<HTMLElement>(".review-card");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
  };
  let frame = 0;
  const sync = () => {
    frame = 0;
    const max = track.scrollWidth - track.clientWidth - 2;
    controls.hidden = max <= 0;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  const go = (direction: number) => {
    track.scrollBy({ left: direction * step(), behavior: reducedMotion.matches ? "auto" : "smooth" });
  };
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  track.addEventListener("scroll", () => {
    if (!frame) frame = window.requestAnimationFrame(sync);
  }, { passive: true });
  new ResizeObserver(sync).observe(track);
  sync();
});

// Section copy rises 34px and fades in once 16% of it is on screen.
const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
if (revealTargets.length && "IntersectionObserver" in window && !reducedMotion.matches) {
  root.classList.add("js-reveal");
  const revealIn = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      revealIn.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
  revealTargets.forEach((target) => revealIn.observe(target));
  // Keyboard focus never lands inside copy that is still hidden.
  document.addEventListener("focusin", (event) => {
    (event.target as Element).closest?.(".reveal")?.classList.add("is-in");
  });
  reducedMotion.addEventListener?.("change", () => {
    if (reducedMotion.matches) revealTargets.forEach((target) => target.classList.add("is-in"));
  });
}

root.dataset.ready = "true";
