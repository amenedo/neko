import React from "react";

interface NekoLogoProps {
  className?: string;
  size?: number; // Size of the SVG icon
  showText?: boolean; // Whether to show the "neko" text
  textColor?: string; // Color of the text, default is foreground-adaptive
  iconColor?: string; // Color of the blue icon
}

export function NekoLogo({
  className = "",
  size = 32,
  showText = true,
  textColor,
  iconColor = "#0022FF",
}: NekoLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon resembling the exact branding percent/division-like symbol */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Top-left dot */}
        <circle cx="28" cy="28" r="14" fill={iconColor} />
        
        {/* Bottom-right dot */}
        <circle cx="72" cy="72" r="14" fill={iconColor} />
        
        {/* Diagonal pill from bottom-left to top-right (rotated ~45deg) */}
        {/* Center of the line is at (50, 50). We draw a rounded capsule */}
        <rect
          x="18"
          y="42"
          width="64"
          height="16"
          rx="8"
          transform="rotate(-45 50 50)"
          fill={iconColor}
        />
      </svg>

      {showText && (
        <span
          className="text-xl font-semibold tracking-tight"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: textColor || "currentColor",
          }}
        >
          neko
        </span>
      )}
    </div>
  );
}
