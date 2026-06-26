/**
 * Loading UI shown during page transitions (Next.js App Router).
 * Minimal — just a thin gold bar at the top, no layout shift.
 */
export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] overflow-hidden">
      <div
        className="h-full w-full"
        style={{
          background: 'linear-gradient(90deg, #b8860b 0%, #d4a017 50%, #2c6e6e 100%)',
          animation: 'loadingBar 1.2s ease-in-out infinite',
          transformOrigin: 'left',
        }}
      />
      <style>{`
        @keyframes loadingBar {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(0.6); transform-origin: left; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  )
}
