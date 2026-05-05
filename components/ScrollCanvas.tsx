"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Sparkles, Loader, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CardMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<unknown>(null);
  const nfcTexture = useTexture('/nfc_design.png');

  useEffect(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    // Guard: wait for the trigger element to exist
    const trigger = document.getElementById("core-features-container");
    if (!trigger) return;

    const colors = {
      default: new THREE.Color("#ffffff"),
      red:     new THREE.Color("#ef4444"),
      yellow:  new THREE.Color("#f59e0b"),
      green:   new THREE.Color("#10b981"),
    };

    // All GSAP work inside context so ctx.revert() fully cleans up
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#core-features-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Feature 1: NFC
      tl.to(mesh.rotation, { x: Math.PI / 4, z: -Math.PI / 6, duration: 1 })
        .to(material.color, { r: colors.default.r, g: colors.default.g, b: colors.default.b, duration: 1 }, "<");

      // Feature 2: AI Triage — cycle triage colours
      tl.to(mesh.rotation, { y: Math.PI, duration: 2 })
        .to(material.color, { r: colors.red.r, g: colors.red.g, b: colors.red.b, duration: 0.5 }, "-=1.5")
        .to(material.color, { r: colors.yellow.r, g: colors.yellow.g, b: colors.yellow.b, duration: 0.5 }, "-=1.0")
        .to(material.color, { r: colors.green.r, g: colors.green.g, b: colors.green.b, duration: 0.5 }, "-=0.5");

      // Feature 3: Peer-to-Peer Sync
      tl.to(mesh.rotation, { x: 0, y: Math.PI * 2, z: 0, duration: 2 })
        .to(mesh.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2 }, "<")
        .to(material.color, { r: colors.default.r, g: colors.default.g, b: colors.default.b, duration: 2 }, "<");
    });

    return () => ctx.revert();
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} rotation={[0, 0, 0]}>
        <boxGeometry args={[3, 4.5, 0.2]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.04}
          backside
        />
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshBasicMaterial map={nfcTexture} transparent opacity={0.85} color="#ffffff" />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function ScrollCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.2} color="#ffffff" />
        <CardMesh />
      </Canvas>
      <Loader
        containerStyles={{ background: '#050505' }}
        innerStyles={{ width: '300px' }}
        barStyles={{ background: '#ffffff' }}
        dataStyles={{ color: '#ffffff', fontFamily: 'monospace' }}
      />
    </div>
  );
}
