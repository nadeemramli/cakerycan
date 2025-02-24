"use client";

interface WaveProps {
  color?: string;
  className?: string;
  flip?: boolean;
}

export function Wave({
  color = "#1e40af",
  className = "",
  flip = false,
}: WaveProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 120"
        fill={color}
        preserveAspectRatio="none"
        className={`w-full h-[120px] ${flip ? "transform rotate-180" : ""}`}
      >
        <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
      </svg>
    </div>
  );
}
