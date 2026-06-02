export default function CornerCrosshairs() {
  // Four + marks at the viewport corners, fixed position.
  const positions = [
    "top-3 left-3 md:top-4 md:left-4",
    "top-3 right-3 md:top-4 md:right-4",
    "bottom-3 left-3 md:bottom-4 md:left-4",
    "bottom-3 right-3 md:bottom-4 md:right-4",
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          aria-hidden
          className={`pointer-events-none fixed z-50 hidden md:flex ${pos} h-3 w-3 items-center justify-center`}
        >
          <div className="absolute h-px w-3 bg-gray-2" />
          <div className="absolute h-3 w-px bg-gray-2" />
        </div>
      ))}
    </>
  );
}
