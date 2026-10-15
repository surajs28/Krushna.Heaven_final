import { dnaGestureAxis } from "./dna-gesture";

export type SwipeEnd = { deltaX: number; velocity: number; dragged: boolean; cancelled: boolean };
type SwipeOptions = {
  start: () => boolean | void;
  move: (deltaX: number) => void;
  end: (gesture: SwipeEnd) => void;
};
type Point = { clientX: number; clientY: number; timeStamp: number };

/** Touch owns a stable, untransformed surface; mouse/pen use Pointer Events.
 * Vertical intent and multi-touch always remain native browser gestures. */
export function bindHorizontalSwipe(surface: HTMLElement, options: SwipeOptions) {
  const controller = new AbortController();
  const { signal } = controller;
  const supportsTouch = "ontouchstart" in window;
  let session: {
    kind: "touch" | "pointer"; id: number; start: Point; last: Point;
    dragged: boolean; velocity: number;
  } | null = null;
  let suppressClickUntil = 0;

  const end = (point?: Point, cancelled = false) => {
    const previous = session;
    if (!previous) return;
    session = null;
    if (previous.kind === "pointer" && surface.hasPointerCapture(previous.id)) {
      surface.releasePointerCapture(previous.id);
    }
    if (previous.dragged) suppressClickUntil = performance.now() + 700;
    options.end({
      deltaX: (point ?? previous.last).clientX - previous.start.clientX,
      velocity: point && point.timeStamp - previous.last.timeStamp > 100 ? 0 : previous.velocity,
      dragged: previous.dragged,
      cancelled,
    });
  };
  const start = (kind: "touch" | "pointer", id: number, point: Point) => {
    if (session) return;
    suppressClickUntil = 0;
    if (options.start() === false) return;
    session = { kind, id, start: point, last: point, dragged: false, velocity: 0 };
  };
  const move = (point: Point, event: Event) => {
    if (!session) return;
    const deltaX = point.clientX - session.start.clientX;
    const deltaY = point.clientY - session.start.clientY;
    if (!session.dragged) {
      const axis = dnaGestureAxis(deltaX, deltaY);
      if (axis === "pending") return;
      if (axis === "vertical") { end(point, true); return; }
      session.dragged = true;
      if (session.kind === "pointer") surface.setPointerCapture(session.id);
    }
    // Only a committed horizontal swipe is cancelled, never vertical page scroll.
    if (event.cancelable) event.preventDefault();
    session.velocity = (point.clientX - session.last.clientX) /
      Math.max(1, point.timeStamp - session.last.timeStamp);
    session.last = point;
    options.move(deltaX);
  };

  surface.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) { end(undefined, true); return; }
    const touch = event.touches[0];
    start("touch", touch.identifier, { ...pointOf(touch), timeStamp: event.timeStamp });
  }, { passive: true, signal });
  surface.addEventListener("touchmove", (event) => {
    if (session?.kind !== "touch") return;
    if (event.touches.length !== 1) { end(undefined, true); return; }
    const touch = Array.from(event.touches).find((item) => item.identifier === session?.id);
    if (touch) move({ ...pointOf(touch), timeStamp: event.timeStamp }, event);
  }, { passive: false, signal });
  window.addEventListener("touchend", (event) => {
    if (session?.kind !== "touch") return;
    const touch = Array.from(event.changedTouches).find((item) => item.identifier === session?.id);
    if (touch) end({ ...pointOf(touch), timeStamp: event.timeStamp });
  }, { passive: true, signal });
  window.addEventListener("touchcancel", () => {
    if (session?.kind === "touch") end(undefined, true);
  }, { passive: true, signal });

  surface.addEventListener("pointerdown", (event) => {
    if ((event.pointerType === "touch" && supportsTouch) || !event.isPrimary || event.button !== 0) return;
    start("pointer", event.pointerId, event);
  }, { signal });
  window.addEventListener("pointermove", (event) => {
    if (session?.kind === "pointer" && session.id === event.pointerId) move(event, event);
  }, { passive: false, signal });
  window.addEventListener("pointerup", (event) => {
    if (session?.kind === "pointer" && session.id === event.pointerId) end(event);
  }, { signal });
  window.addEventListener("pointercancel", (event) => {
    if (session?.kind === "pointer" && session.id === event.pointerId) end(event, true);
  }, { signal });
  surface.addEventListener("lostpointercapture", () => {
    if (session?.kind === "pointer") end(undefined, true);
  }, { signal });
  surface.addEventListener("click", (event) => {
    if (event.detail !== 0 && performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, { capture: true, signal });
  surface.addEventListener("dragstart", (event) => event.preventDefault(), { signal });
  window.addEventListener("blur", () => end(undefined, true), { signal });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) end(undefined, true);
  }, { signal });
  return () => { end(undefined, true); controller.abort(); };
}

const pointOf = (touch: Touch) => ({ clientX: touch.clientX, clientY: touch.clientY });
