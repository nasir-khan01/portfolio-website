// Hand-drawn style SVG icons inspired by sharyap.com
// These icons have rounded strokes with a sketch-like aesthetic

export function AboutIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Speech bubble with "i" */}
      <path d="M12 18C12 13 17 8 32 8C47 8 52 13 52 22C52 31 47 36 32 36C27 36 18 36 14 42C14 38 12 36 12 36C12 36 12 31 12 22V18Z" />
      <circle cx="32" cy="18" r="2" fill="currentColor" stroke="none" />
      <path d="M32 24V30" />
    </svg>
  );
}

export function LinksIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Chain links */}
      <path d="M24 28C24 28 20 24 26 18C32 12 40 16 40 24" />
      <path d="M40 36C40 36 44 40 38 46C32 52 24 48 24 40" />
      <path d="M28 36L36 28" />
    </svg>
  );
}

export function WorkIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Folder with document */}
      <path d="M8 20C8 16 10 14 14 14H24L28 18H50C54 18 56 20 56 24V48C56 52 54 54 50 54H14C10 54 8 52 8 48V20Z" />
      <path d="M16 26L28 26" />
      <path d="M16 34L40 34" />
      <path d="M16 42L36 42" />
    </svg>
  );
}

export function FaqIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Box with question mark */}
      <rect x="12" y="12" width="40" height="40" rx="6" />
      <path d="M26 24C26 20 30 18 34 20C38 22 38 28 32 30V36" />
      <circle cx="32" cy="44" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ContactIcon({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Envelope with @ symbol */}
      <rect x="8" y="16" width="48" height="36" rx="4" />
      <path d="M8 20L32 36L56 20" />
      <circle cx="44" cy="38" r="6" />
      <path d="M44 34V42C44 44 46 44 48 42" />
    </svg>
  );
}

export function StarDecoration({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Cute star with face */}
      <path 
        d="M32 4L38 24L58 24L42 38L48 58L32 46L16 58L22 38L6 24L26 24L32 4Z" 
        fill="#FFB830" 
        stroke="#E5A020" 
        strokeWidth="2"
      />
      {/* Eyes */}
      <circle cx="26" cy="32" r="2" fill="#333" />
      <circle cx="38" cy="32" r="2" fill="#333" />
      {/* Smile */}
      <path d="M28 38C28 38 32 42 36 38" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
