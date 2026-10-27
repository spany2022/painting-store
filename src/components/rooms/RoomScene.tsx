import { ArtImage } from "@/components/ui/ArtImage";
import { art, type ArtKey } from "@/data/art";

export type RoomPreset = "living" | "reading" | "bedroom" | "console" | "earthy";

export const roomPresets: Record<RoomPreset, { label: string; wall: string; floor: string; artX: number; artY: number }> = {
  living: { label: "Living room", wall: "#E9DFD0", floor: "#B8977A", artX: 50, artY: 34 },
  reading: { label: "Reading corner", wall: "#DCD3C2", floor: "#9C7B5F", artX: 58, artY: 33 },
  bedroom: { label: "Bedroom", wall: "#E6D9CB", floor: "#A98B70", artX: 50, artY: 30 },
  console: { label: "Entrance hall", wall: "#D9CDBE", floor: "#8E735C", artX: 50, artY: 34 },
  earthy: { label: "Earthy studio", wall: "#D7C2A6", floor: "#7F6650", artX: 46, artY: 34 },
};

export const wallColours = [
  { id: "default", label: "Preset", value: null },
  { id: "ivory", label: "Warm ivory", value: "#EFE8DB" },
  { id: "sage", label: "Sage", value: "#B8BFA8" },
  { id: "terracotta", label: "Terracotta", value: "#C88E72" },
  { id: "charcoal", label: "Charcoal", value: "#3A332D" },
] as const;

/** The visible wall represents roughly this many centimetres across. */
const WALL_CM = 300;

/**
 * An illustrated room mock-up. The artwork is the real product photograph,
 * scaled to its stated width relative to the furniture; only the room is drawn.
 */
export function RoomScene({
  artKey,
  alt,
  widthCm = 60,
  preset = "living",
  wall,
  aspect = "4 / 3",
  frame = "wood",
  className = "",
  sizes = "50vw",
}: {
  artKey: ArtKey;
  alt: string;
  widthCm?: number;
  preset?: RoomPreset;
  wall?: string | null;
  aspect?: string;
  frame?: "wood" | "black" | "none";
  className?: string;
  sizes?: string;
}) {
  const p = roomPresets[preset];
  const a = art[artKey];
  const ratio = a.width / a.height;
  const [aw, ah] = aspect.split("/").map((n) => Number(n.trim()));
  const sceneRatio = aw / ah;
  // Width as % of scene; keep tall pieces from touching the ceiling or furniture.
  let w = (widthCm / WALL_CM) * 100;
  const maxH = 46; // % of scene height
  const hPct = (w / ratio) * sceneRatio;
  if (hPct > maxH) w = (maxH / sceneRatio) * ratio;
  const wallColour = wall ?? p.wall;
  const dark = isDark(wallColour);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: aspect, background: wallColour, transition: "background-color .8s" }}>
      {/* soft daylight on the wall */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at 30% 10%, rgba(255,248,232,${dark ? 0.1 : 0.55}) 0%, transparent 60%), linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(40,28,18,.10) 78%)`,
        }}
      />
      <div aria-hidden className="paper-texture absolute inset-0 opacity-50" />

      {/* floor */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[20%]" style={{ background: `linear-gradient(180deg, ${shade(p.floor, -8)} 0%, ${p.floor} 30%, ${shade(p.floor, -18)} 100%)` }}>
        <div className="absolute inset-x-0 top-0 h-[6%] bg-black/10" />
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-[20%] h-[1.6%]" style={{ background: shade(wallColour, -10) }} />

      {/* artwork */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[var(--ease-gallery)]"
        style={{ left: `${p.artX}%`, top: `${p.artY}%`, width: `${w}%` }}
      >
        <div
          aria-hidden
          className="absolute -top-[30%] left-1/2 h-[90%] w-[160%] -translate-x-1/2"
          style={{ background: "radial-gradient(50% 50% at 50% 30%, rgba(255,236,200,.35), transparent 70%)" }}
        />
        <div
          className="relative"
          style={{
            padding: frame === "none" ? 0 : "3.2%",
            background: frame === "wood" ? "linear-gradient(135deg,#4a3526,#6b4d36 45%,#3a2a1d)" : frame === "black" ? "#1d1916" : "transparent",
            boxShadow: "0 2px 3px rgba(20,14,8,.25), 0 14px 26px -8px rgba(20,14,8,.45)",
          }}
        >
          <ArtImage art={artKey} alt={alt} sizes={sizes} className="block h-auto w-full" />
        </div>
      </div>

      <Furniture preset={preset} />
    </div>
  );
}

function Furniture({ preset }: { preset: RoomPreset }) {
  return (
    <svg aria-hidden viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="fab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d6c7b0" />
          <stop offset="1" stopColor="#b9a68b" />
        </linearGradient>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a5a40" />
          <stop offset="1" stopColor="#4e3727" />
        </linearGradient>
        <linearGradient id="linen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4ede1" />
          <stop offset="1" stopColor="#dcd0bd" />
        </linearGradient>
        <radialGradient id="shadow">
          <stop offset="0" stopColor="#1e140c" stopOpacity=".35" />
          <stop offset="1" stopColor="#1e140c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {preset === "living" && (
        <g>
          <ellipse cx="400" cy="486" rx="250" ry="16" fill="url(#shadow)" />
          {/* sofa */}
          <rect x="190" y="352" width="420" height="78" rx="18" fill="url(#fab)" />
          <rect x="176" y="392" width="448" height="76" rx="14" fill="#c4b298" />
          <rect x="166" y="372" width="44" height="100" rx="16" fill="#b9a68b" />
          <rect x="590" y="372" width="44" height="100" rx="16" fill="#b9a68b" />
          <rect x="226" y="370" width="170" height="40" rx="12" fill="#cdbca3" />
          <rect x="404" y="370" width="170" height="40" rx="12" fill="#cdbca3" />
          <rect x="250" y="356" width="70" height="46" rx="10" fill="#a64b32" opacity=".85" />
          <rect x="482" y="358" width="64" height="44" rx="10" fill="#354b3a" opacity=".75" />
          <rect x="196" y="468" width="8" height="16" fill="#3c2a1d" />
          <rect x="596" y="468" width="8" height="16" fill="#3c2a1d" />
          {/* side table + lamp */}
          <ellipse cx="700" cy="488" rx="40" ry="6" fill="url(#shadow)" />
          <rect x="672" y="420" width="56" height="8" rx="2" fill="url(#wood)" />
          <rect x="697" y="428" width="6" height="58" fill="#4e3727" />
          <rect x="680" y="482" width="40" height="5" rx="2" fill="#4e3727" />
          <rect x="697" y="370" width="4" height="50" fill="#8c7a63" />
          <path d="M676 372 L722 372 L712 336 L686 336 Z" fill="#efe4d0" />
          {/* plant */}
          <ellipse cx="96" cy="488" rx="40" ry="6" fill="url(#shadow)" />
          <path d="M76 486 L116 486 L122 440 L70 440 Z" fill="#a26a4c" />
          <path d="M96 440 C80 400 60 380 50 350 M96 440 C100 390 110 360 130 330 M96 440 C90 400 92 370 84 330 M96 440 C112 410 132 400 146 380" stroke="#4d6a4f" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {preset === "reading" && (
        <g>
          <ellipse cx="300" cy="488" rx="140" ry="14" fill="url(#shadow)" />
          {/* armchair */}
          <path d="M210 470 L210 360 C210 330 230 320 260 320 L340 320 C370 320 390 330 390 360 L390 470 Z" fill="#8a5a43" />
          <rect x="196" y="400" width="40" height="76" rx="12" fill="#7a4e3a" />
          <rect x="364" y="400" width="40" height="76" rx="12" fill="#7a4e3a" />
          <rect x="226" y="408" width="148" height="44" rx="10" fill="#9c6a51" />
          <rect x="214" y="474" width="7" height="14" fill="#2e2017" />
          <rect x="380" y="474" width="7" height="14" fill="#2e2017" />
          {/* floor lamp */}
          <rect x="132" y="484" width="44" height="5" rx="2" fill="#2e2a26" />
          <rect x="152" y="250" width="3" height="236" fill="#2e2a26" />
          <path d="M153 252 C175 236 205 236 224 250" stroke="#2e2a26" strokeWidth="3" fill="none" />
          <path d="M206 250 L242 250 L234 278 L214 278 Z" fill="#e9dcc4" />
          {/* stool + books */}
          <ellipse cx="560" cy="488" rx="50" ry="6" fill="url(#shadow)" />
          <rect x="520" y="436" width="80" height="10" rx="3" fill="url(#wood)" />
          <rect x="528" y="446" width="6" height="40" fill="#4e3727" />
          <rect x="586" y="446" width="6" height="40" fill="#4e3727" />
          <rect x="530" y="420" width="62" height="8" fill="#354b3a" />
          <rect x="534" y="412" width="56" height="8" fill="#b99557" />
          <rect x="528" y="428" width="66" height="8" fill="#a64b32" />
        </g>
      )}

      {preset === "bedroom" && (
        <g>
          <ellipse cx="400" cy="490" rx="270" ry="14" fill="url(#shadow)" />
          {/* headboard */}
          <rect x="200" y="330" width="400" height="120" rx="6" fill="url(#wood)" />
          {/* bed */}
          <rect x="190" y="410" width="420" height="70" rx="8" fill="url(#linen)" />
          <rect x="190" y="440" width="420" height="40" rx="6" fill="#354b3a" opacity=".8" />
          <rect x="226" y="384" width="140" height="40" rx="14" fill="#f6efe4" />
          <rect x="434" y="384" width="140" height="40" rx="14" fill="#f6efe4" />
          {/* bedside tables */}
          {[120, 680].map((x) => (
            <g key={x}>
              <rect x={x - 42} y="420" width="84" height="66" rx="3" fill="#6b4d36" />
              <rect x={x - 36} y="440" width="72" height="2" fill="#4e3727" />
              <rect x={x - 2} y="380" width="4" height="40" fill="#b99557" />
              <path d={`M${x - 24} 382 L${x + 24} 382 L${x + 16} 352 L${x - 16} 352 Z`} fill="#efe4d0" />
            </g>
          ))}
        </g>
      )}

      {preset === "console" && (
        <g>
          <ellipse cx="400" cy="488" rx="170" ry="10" fill="url(#shadow)" />
          <rect x="250" y="402" width="300" height="14" rx="2" fill="url(#wood)" />
          <rect x="262" y="416" width="6" height="70" fill="#3c2a1d" />
          <rect x="532" y="416" width="6" height="70" fill="#3c2a1d" />
          <rect x="262" y="454" width="276" height="5" fill="#3c2a1d" />
          {/* vase with branches */}
          <path d="M300 402 C290 380 292 360 306 350 L318 350 C332 360 334 380 324 402 Z" fill="#a64b32" />
          <path d="M312 352 C300 300 280 270 262 248 M312 352 C318 300 336 280 350 250 M312 352 C310 310 316 290 306 262" stroke="#5a4130" strokeWidth="2.5" fill="none" />
          {/* bowl + books */}
          <path d="M440 402 C440 386 500 386 500 402 Z" fill="#b99557" />
          <rect x="452" y="440" width="70" height="10" fill="#354b3a" />
          <rect x="456" y="430" width="62" height="10" fill="#d6c7b0" />
        </g>
      )}

      {preset === "earthy" && (
        <g>
          <ellipse cx="380" cy="490" rx="240" ry="12" fill="url(#shadow)" />
          {/* low bench */}
          <rect x="180" y="432" width="400" height="22" rx="4" fill="url(#wood)" />
          <rect x="196" y="454" width="16" height="32" fill="#3c2a1d" />
          <rect x="548" y="454" width="16" height="32" fill="#3c2a1d" />
          {/* clay pots */}
          <path d="M232 432 C216 410 222 384 248 380 L262 380 C288 384 294 410 278 432 Z" fill="#a26a4c" />
          <path d="M300 432 C294 420 296 408 308 404 L318 404 C330 408 332 420 326 432 Z" fill="#8a3b26" />
          {/* woven basket */}
          <path d="M470 432 L540 432 L532 392 L478 392 Z" fill="#c9a86a" />
          {[400, 410, 420].map((y) => (
            <line key={y} x1="478" y1={y} x2="532" y2={y} stroke="#9c7b4f" strokeWidth="2" />
          ))}
          {/* tall plant */}
          <path d="M650 486 L690 486 L696 444 L644 444 Z" fill="#e4d4bc" />
          <path d="M670 444 C660 380 630 340 610 300 M670 444 C676 380 700 340 720 296 M670 444 C668 380 672 330 664 280" stroke="#4d6a4f" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

function shade(hex: string, pct: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (pct / 100) * 255)));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 110;
}
