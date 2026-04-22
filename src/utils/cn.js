/**
 * cn() — Merges class strings, filtering falsy values.
 * Lightweight alternative to clsx/classnames.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
