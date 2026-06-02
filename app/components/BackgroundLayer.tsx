/**
 * BackgroundLayer
 * - Soft gray circle bleeding off the hero
 * - Faint 8px grid overlay
 * Both stay subtle, never compete with content.
 */
export default function BackgroundLayer() {
  return (
    <>
      {/* Faint grid — fixed, behind everything */}
      <div
        aria-hidden
        className="grid-overlay pointer-events-none fixed inset-0 z-0"
      />

      {/* Soft gray circle, drifts on scroll */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 hidden -translate-x-1/2 md:block"
        style={{ width: "140vw", height: "140vw", maxWidth: "1800px" }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-1"
          style={{ opacity: 0.55 }}
        />
      </div>
    </>
  );
}
