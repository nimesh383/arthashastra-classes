import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Stars,
  Torus,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

function FloatingSphere({
  position,
  color,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.3 * speed;
      meshRef.current.rotation.y = clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[0.8, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function RotatingTorus({ position }: { position: [number, number, number] }) {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = clock.elapsedTime * 0.4;
      torusRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <Torus ref={torusRef} args={[1.2, 0.15, 16, 100]} position={position}>
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
        wireframe
      />
    </Torus>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#00D4FF" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#7C3AED" intensity={1.5} />
      <pointLight position={[0, 10, -5]} color="#E040FB" intensity={1} />

      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <FloatingSphere position={[-3.5, 1, -2]} color="#00D4FF" speed={0.8} />
      <FloatingSphere position={[3.5, -1, -3]} color="#7C3AED" speed={1.1} />
      <FloatingSphere position={[0, 2.5, -4]} color="#E040FB" speed={0.6} />
      <FloatingSphere position={[-2, -2.5, -1]} color="#00D4FF" speed={1.4} />

      <RotatingTorus position={[4, 2, -5]} />
      <RotatingTorus position={[-4, -2, -6]} />
    </Canvas>
  );
}
