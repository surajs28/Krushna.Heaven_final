/** Wait for a clear axis before taking a gesture away from native page scroll. */
export function dnaGestureAxis(deltaX: number, deltaY: number) {
  const x = Math.abs(deltaX);
  const y = Math.abs(deltaY);
  if (Math.max(x, y) < 10) return "pending";
  if (x > y * 1.1) return "horizontal";
  if (y > x * 1.1) return "vertical";
  return "pending";
}

/** A deliberate short swipe advances one card; tiny movements remain taps. */
export function dnaSwipeTarget(
  start: number,
  position: number,
  deltaX: number,
  velocity: number,
  width: number,
  cancelled = false,
) {
  if (cancelled) return Math.round(position);
  const origin = Math.round(start);
  const nearest = Math.round(position);
  const threshold = Math.max(28, Math.min(48, width * 0.08));
  const committed = Math.abs(deltaX) >= threshold ||
    (Math.abs(deltaX) >= 12 && Math.abs(velocity) >= 0.45);
  if (committed && nearest === origin) return origin - Math.sign(deltaX);
  return nearest;
}

/** Below this height the scene can't fit one screen, so it stays in document flow. */
export const DNA_MIN_PIN_HEIGHT = 600;

/** Laptops and desktops hold the section while its cards turn; short windows don't. */
export function dnaShouldPin(isDesktop: boolean, viewportHeight: number) {
  return isDesktop && viewportHeight >= DNA_MIN_PIN_HEIGHT;
}

/** Scroll length in card steps: one per turn, plus a short rest on the last card. */
export function dnaScrollSpan(total: number, rest: number) {
  return Math.max(0, total - 1) + Math.max(0, rest);
}

/** Held-section progress (0–1) to orbit position; the rest keeps the last card in front. */
export function dnaProgressToPosition(progress: number, total: number, rest: number) {
  const span = dnaScrollSpan(total, rest);
  return Math.max(0, Math.min(total - 1, progress * span));
}

/** Snap points: every card, then the end of the last card's rest. */
export function dnaSnapPoints(total: number, rest: number) {
  const span = dnaScrollSpan(total, rest);
  if (span <= 0) return [0];
  const points = Array.from({ length: total }, (_, card) => card / span);
  if (rest > 0) points.push(1);
  return points;
}

/** The page offset that shows one card in front, clamped to the first and last card. */
export function dnaCardScrollTop(start: number, end: number, card: number, total: number, rest: number) {
  const span = dnaScrollSpan(total, rest);
  if (span <= 0) return Math.round(start);
  const target = Math.max(0, Math.min(total - 1, Math.round(card)));
  return Math.round(start + (end - start) * (target / span));
}
