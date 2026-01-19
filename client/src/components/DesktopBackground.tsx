interface DesktopBackgroundProps {
  children: React.ReactNode;
}

export function DesktopBackground({ children }: DesktopBackgroundProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Gradient Background - Light Mode */}
      <div 
        className="fixed inset-0 -z-10 transition-colors duration-500"
        style={{
          background: `
            radial-gradient(ellipse at top, var(--desktop-bg-from) 0%, var(--desktop-bg-to) 70%),
            linear-gradient(to bottom, var(--desktop-bg-from) 0%, var(--desktop-bg-to) 100%)
          `,
        }}
      />
      
      {/* Subtle wave decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 -z-5 pointer-events-none overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{ height: '100px' }}
        >
          <path
            d="M0,40 C360,80 720,10 1080,50 C1260,70 1380,60 1440,40 L1440,100 L0,100 Z"
            className="fill-[var(--wave-color)]"
            opacity="0.6"
          />
          <path
            d="M0,60 C360,30 720,80 1080,40 C1260,20 1380,50 1440,60 L1440,100 L0,100 Z"
            className="fill-[var(--wave-color)]"
            opacity="0.8"
          />
        </svg>
      </div>

      {children}
    </div>
  );
}
