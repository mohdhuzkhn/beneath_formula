export function HeroPlot() {
  const px = (x: number) => 110 + 60 * x,
    py = (y: number) => 240 - 22 * y;
  const points = Array.from({ length: 101 }, (_, i) => {
    const x = -1.3 + i * 0.044;
    return `${px(x)},${py(x * x)}`;
  }).join(" ");
  return (
    <svg
      viewBox="0 0 400 320"
      role="img"
      aria-labelledby="curve-title curve-description"
    >
      <title id="curve-title">From a secant to a tangent</title>
      <desc id="curve-description">
        The parabola y equals x squared, points at x equals 1 and 2.5, a secant
        of slope 3.5 and a dashed tangent of slope 2 at x equals 1.
      </desc>
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M32 0H0V32"
            fill="none"
            stroke="var(--line)"
            strokeWidth=".6"
          />
        </pattern>
        <clipPath id="hero-clip">
          <rect width="400" height="280" />
        </clipPath>
      </defs>
      <rect width="400" height="280" fill="url(#grid)" />
      <g clipPath="url(#hero-clip)">
        <path d="M20 240H380M110 265V20" fill="none" stroke="var(--muted)" />
        <polyline
          points={points}
          fill="none"
          stroke="var(--ink)"
          strokeWidth="3"
        />
        <line
          x1={px(-1)}
          y1={py(3.5 * -1 - 2.5)}
          x2={px(4)}
          y2={py(3.5 * 4 - 2.5)}
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <line
          x1={px(-1)}
          y1={py(2 * -1 - 1)}
          x2={px(4)}
          y2={py(2 * 4 - 1)}
          stroke="var(--muted)"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <circle cx={px(1)} cy={py(1)} r="5" fill="var(--ink)" />
        <circle cx={px(2.5)} cy={py(6.25)} r="5" fill="var(--accent)" />
        <text x={px(1) + 6} y={py(1) + 23} fill="var(--ink)" fontSize="15">
          x
        </text>
        <text
          x={px(2.5) + 10}
          y={py(6.25) + 16}
          fill="var(--accent)"
          fontSize="15"
        >
          x + h
        </text>
        <text
          x="285"
          y="40"
          fill="var(--ink)"
          fontSize="19"
          fontFamily="Georgia"
        >
          f(x) = x²
        </text>
      </g>
      <text x="35" y="311" fill="var(--ink)" fontSize="19" fontFamily="Georgia">
        What happens as h approaches zero?
      </text>
    </svg>
  );
}
