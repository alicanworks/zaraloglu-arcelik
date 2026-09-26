/**
 * Recognizable Instagram glyph (rounded square + lens + shutter dot), drawn
 * as a single-color inline SVG so it can be sized/colored like a lucide icon
 * via `className` (uses `currentColor`).
 */
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}
