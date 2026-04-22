import { RoundedBox, Stars, Text } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import * as THREE from "three";

// ─── Platform Data ─────────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: "instagram",
    label: "IG",
    fullName: "Instagram",
    color: "#E040FB", // magenta
    emissive: "#C020D0",
    glowColor: "#E040FB",
    position: [-3.2, 0, 0] as [number, number, number],
    phase: 0,
    speed: 0.9,
    url: "https://www.instagram.com/arthashastraclasses",
    bgColor: "oklch(0.6 0.25 320)",
  },
  {
    id: "youtube",
    label: "YT",
    fullName: "YouTube",
    color: "#E040FB", // use magenta-red blend within palette
    emissive: "#9B10CB",
    glowColor: "#C060FF",
    position: [0, 0.5, 0] as [number, number, number],
    phase: Math.PI * 0.67,
    speed: 1.1,
    url: "https://www.youtube.com/@arthashastraclasses",
    bgColor: "oklch(0.55 0.2 300)",
  },
  {
    id: "telegram",
    label: "TG",
    fullName: "Telegram",
    color: "#00D4FF", // cyan
    emissive: "#0090BB",
    glowColor: "#00D4FF",
    position: [3.2, 0, 0] as [number, number, number],
    phase: Math.PI * 1.33,
    speed: 0.75,
    url: "https://t.me/arthashastraclasses",
    bgColor: "oklch(0.68 0.24 200)",
  },
] as const;

// ─── SocialIcon (individual 3D icon mesh) ──────────────────────────────────────

function SocialIcon({
  platform,
  onHover,
  onClick,
}: {
  platform: (typeof PLATFORMS)[number];
  onHover: (id: string | null) => void;
  onClick: (url: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { gl } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (groupRef.current) {
      // Sinusoidal float — each platform has a different phase offset
      groupRef.current.position.y =
        platform.position[1] +
        Math.sin(t * platform.speed + platform.phase) * 0.45;
      // Slow Y-axis rotation
      groupRef.current.rotation.y = t * 0.35;
      // Subtle pulse scale
      const pulse = 1 + Math.sin(t * 2 + platform.phase) * 0.04;
      groupRef.current.scale.setScalar(hovered ? pulse * 1.18 : pulse);
    }
  });

  const emissiveIntensity = hovered ? 2.2 : 0.65;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Three.js canvas group is not an HTML element; keyboard accessibility provided via HTML anchor buttons below the canvas
    <group
      ref={groupRef}
      position={platform.position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(platform.id);
        gl.domElement.style.cursor = "pointer";
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(null);
        gl.domElement.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(platform.url);
      }}
    >
      {/* Main rounded cube */}
      <RoundedBox
        ref={meshRef}
        args={[1.6, 1.6, 0.3]}
        radius={0.22}
        smoothness={6}
      >
        <meshStandardMaterial
          color={platform.color}
          emissive={platform.emissive}
          emissiveIntensity={emissiveIntensity}
          roughness={0.15}
          metalness={0.7}
          transparent
          opacity={0.88}
        />
      </RoundedBox>

      {/* Subtle border ring highlight */}
      <RoundedBox args={[1.68, 1.68, 0.28]} radius={0.24} smoothness={6}>
        <meshStandardMaterial
          color={platform.color}
          emissive={platform.glowColor}
          emissiveIntensity={hovered ? 1.5 : 0.3}
          roughness={0.3}
          metalness={0.5}
          transparent
          opacity={hovered ? 0.35 : 0.12}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* 3D Text label */}
      <Text
        position={[0, -0.08, 0.22]}
        fontSize={0.48}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {platform.label}
      </Text>

      {/* Small sub-label */}
      <Text
        position={[0, -0.55, 0.22]}
        fontSize={0.16}
        color={hovered ? "#ffffff" : platform.color}
        anchorX="center"
        anchorY="middle"
        font={undefined}
      >
        {platform.fullName}
      </Text>
    </group>
  );
}

// ─── Scene ─────────────────────────────────────────────────────────────────────

function Scene({
  onHover,
}: {
  onHover: (id: string | null) => void;
}) {
  function handleClick(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[8, 8, 8]} color="#00D4FF" intensity={2.0} />
      <pointLight position={[-8, -8, -8]} color="#7C3AED" intensity={2.0} />
      <pointLight position={[0, 10, -6]} color="#E040FB" intensity={1.4} />

      <Stars
        radius={100}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={0.8}
      />

      {PLATFORMS.map((p) => (
        <SocialIcon
          key={p.id}
          platform={p}
          onHover={onHover}
          onClick={handleClick}
        />
      ))}
    </>
  );
}

// ─── Section Wrapper + Canvas ──────────────────────────────────────────────────

export default function SocialCanvas() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredPlatform = PLATFORMS.find((p) => p.id === hoveredId);

  return (
    <section
      className="relative py-20 overflow-hidden"
      data-ocid="social.section"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.12 0.06 260) 0%, oklch(0.16 0.1 280) 50%, oklch(0.12 0.06 260) 100%)",
      }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-500/8 blur-[80px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-fuchsia-600/8 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-600/8 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-3">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Connect <span className="gradient-text-cyan-violet">With Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Follow us across platforms for daily tips, live sessions, result
            announcements, and exclusive study content.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden border border-white/8 glass-morphism"
          style={{ height: "clamp(280px, 40vw, 420px)" }}
          data-ocid="social.canvas_target"
        >
          <Canvas
            camera={{ position: [0, 0, 9], fov: 55 }}
            style={{ background: "transparent" }}
            dpr={[1, 2]}
          >
            <Scene onHover={setHoveredId} />
          </Canvas>

          {/* Hover tooltip */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300"
            style={{ opacity: hoveredPlatform ? 1 : 0 }}
          >
            <div
              className="px-4 py-2 rounded-full text-sm font-semibold text-white border border-white/20 backdrop-blur-md"
              style={{
                background: hoveredPlatform
                  ? `${hoveredPlatform.bgColor} / 0.5`
                  : "transparent",
                boxShadow: hoveredPlatform
                  ? `0 0 20px ${hoveredPlatform.glowColor}55`
                  : "none",
              }}
            >
              Click to open {hoveredPlatform?.fullName ?? ""}
            </div>
          </div>
        </motion.div>

        {/* Platform link buttons below canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`social.${p.id}_link`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border transition-smooth font-semibold text-sm"
              style={{
                borderColor: `${p.color}55`,
                background: `color-mix(in oklch, ${p.color} 10%, transparent)`,
                color: p.color,
                boxShadow:
                  hoveredId === p.id
                    ? `0 0 24px ${p.glowColor}66`
                    : "0 0 0px transparent",
              }}
            >
              <PlatformIcon id={p.id} color={p.color} />
              {p.fullName}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Inline SVG Icons ──────────────────────────────────────────────────────────

function PlatformIcon({ id, color }: { id: string; color: string }) {
  if (id === "instagram") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
      </svg>
    );
  }
  if (id === "youtube") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill={color}
          stroke="none"
        />
      </svg>
    );
  }
  // Telegram
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 5L2 12.5l7 1M21 5l-4 15-5-4.5M21 5L9 13.5m0 0V19l2.5-2.5" />
    </svg>
  );
}
