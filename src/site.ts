import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Clock3,
  MapPin,
  Menu,
  Phone,
  Expand,
  X,
  createIcons,
} from "lucide";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dnaSwipeTarget } from "./dna-gesture";
import { bindHorizontalSwipe } from "./swipe";

gsap.registerPlugin(ScrollTrigger);

const iconSet = {
  ArrowLeft,
  ArrowRight,
  Camera,
  Clock3,
  MapPin,
  Menu,
  Phone,
  Expand,
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

  // Navigation and actions remain usable from the first frame.
  if (introHeader) intro.from(introHeader, { opacity: 0.6, y: -8, duration: 0.4 }, 0);
  if (introEyebrow) intro.from(introEyebrow, { autoAlpha: 0, y: 12, duration: 0.72 }, 0.18);
  intro.from(lineInners, { yPercent: 108, duration: 1.08, stagger: 0.11 }, 0.3);
  if (introCopy) intro.from(introCopy, { autoAlpha: 0, y: 20, duration: 0.78 }, 0.76);
  if (introActions) intro.from(introActions.children, { opacity: 0.75, y: 10, duration: 0.48, stagger: 0.06 }, 0.2);
  if (introCue) intro.from(introCue, { autoAlpha: 0, y: 10, duration: 0.7 }, 1.08);
  if (introSeal) intro.from(introSeal, { autoAlpha: 0, scale: 0.88, duration: 0.86 }, 1.02);

  if (heroMedia) {
    gsap.to(heroMedia, {
      scale: 1.045,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
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
    const canRotate = () => sectionVisible && !rotationPaused && !document.hidden &&
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
          animateTo(target, true, 0.42);
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
      // Numeric scrub smooths an attached animation, not raw onUpdate writes.
      // Keep shorter laptop windows in document flow so every control is reachable.
      const pinFits = dnaDesktop.matches && dnaPin.scrollHeight <= window.innerHeight + 1;
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
          trigger: pinFits ? dnaSection : dnaStage,
          start: pinFits ? "top top" : "top 75%",
          end: pinFits ? () => `+=${Math.round(window.innerHeight * 1.9)}` : "bottom 25%",
          pin: pinFits ? dnaPin : false,
          pinSpacing: pinFits,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      scrollTrigger = scrollTween.scrollTrigger ?? null;
      window.addEventListener("wheel", takeScrollControl, { passive: true, signal });
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

    if (dnaHeader) {
      headerTween = gsap.from(dnaHeader.children, {
        autoAlpha: 0,
        y: 28,
        duration: 0.82,
        stagger: 0.08,
        ease: "power3.out",
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
    // A slight desktop offset gives the journal its asymmetric opening rhythm.
    const heights = count === 3 ? [0, tileWidth * 0.16, tileWidth * 0.32] : [0, tileWidth * 0.18];
    const placements = figures.map((figure) => {
      const column = heights.indexOf(Math.min(...heights));
      const placement = { figure, left: column * (tileWidth + gap), top: heights[column] };
      heights[column] += figure.offsetHeight + gap * 1.6;
      return { ...placement, column };
    });
    placements.forEach(({ figure, left, top, column }) => {
      figure.style.setProperty("--gallery-delay", `${column * 60}ms`);
      figure.style.left = `${left}px`;
      figure.style.top = `${top}px`;
    });
    galleryGrid.style.height = `${Math.max(...heights) - gap * 1.6}px`;
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

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const figure = entry.target as HTMLElement;
      const image = figure.querySelector<HTMLImageElement>("img")!;
      const reveal = async () => {
        try { await image.decode(); } catch { /* A failed photo retains its alt text. */ }
        figure.classList.add("is-visible");
        revealObserver.unobserve(figure);
      };
      // Reveal the reserved frame immediately; a slow photo must not hide its control.
      figure.classList.add("is-visible");
      if (image.complete) void reveal();
      else image.addEventListener("load", () => void reveal(), { once: true });
    });
  }, { rootMargin: "0px 0px -36px 0px", threshold: 0.08 });

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
  });
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

root.dataset.ready = "true";
