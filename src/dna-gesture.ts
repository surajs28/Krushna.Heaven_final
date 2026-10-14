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
