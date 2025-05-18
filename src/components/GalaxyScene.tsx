
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, DepthOfField } from '@react-three/postprocessing';
import { AdaptiveDpr, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { randomPoint3D, distance3D } from '@/lib/utils';

// Star particle component
const StarParticle = ({ position, color, size, speed = 0.001 }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Gentle rotation and pulsing
    meshRef.current.rotation.x += speed;
    meshRef.current.rotation.y += speed * 0.8;
    
    // Subtle size pulsing
    const scale = 0.85 + Math.sin(state.clock.elapsedTime) * 0.15;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={2} 
        toneMapped={false} 
      />
    </mesh>
  );
};

// Dust particle effect
const DustParticles = ({ count = 2000, radius = 20 }) => {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Position dust particles in a spiral pattern
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.5) * radius;
      const x = Math.cos(angle) * r;
      const y = (Math.random() - 0.5) * 2;
      const z = Math.sin(angle) * r;
      
      // Color based on distance from center
      const distFromCenter = Math.sqrt(x*x + z*z) / radius;
      const colorRamp = Math.min(1, 0.5 + distFromCenter);
      
      const blue = 0.5 + 0.5 * Math.sin(distFromCenter * 5);
      const green = 0.2 + 0.3 * Math.cos(distFromCenter * 7);
      
      temp.push({
        position: [x, y, z],
        color: new THREE.Color(0.2 + colorRamp * 0.4, green, 0.5 + blue * 0.5),
        size: Math.random() * 0.03 + 0.01
      });
    }
    return temp;
  }, [count, radius]);

  return (
    <group>
      {points.map((point, i) => (
        <StarParticle 
          key={i} 
          position={point.position} 
          color={point.color} 
          size={point.size}
          speed={0.001 + Math.random() * 0.003}
        />
      ))}
    </group>
  );
};

// Galaxy core with radiant light
const GalaxyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame(({ clock }) => {
    if (!coreRef.current || !materialRef.current) return;
    
    // Pulsing core
    const pulse = 1 + Math.sin(clock.elapsedTime) * 0.2;
    coreRef.current.scale.set(pulse, pulse, pulse);
    
    // Changing colors for the core
    const time = clock.elapsedTime;
    const r = 0.5 + 0.3 * Math.sin(time * 0.3);
    const g = 0.2 + 0.1 * Math.sin(time * 0.5);
    const b = 0.8 + 0.2 * Math.sin(time * 0.7);
    
    materialRef.current.emissive = new THREE.Color(r, g, b);
    materialRef.current.emissiveIntensity = 2 + Math.sin(time) * 0.5;
  });

  return (
    <group>
      {/* Core glow */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#9b87f5"
          emissive="#7E69AB"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      
      {/* Extra core light effect */}
      <pointLight position={[0, 0, 0]} color="#9b87f5" intensity={10} distance={10} />
    </group>
  );
};

// Spiral arms of the galaxy
const SpiralArms = ({ count = 10000, arms = 5, radius = 15 }) => {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Calculate spiral position
      const arm = Math.floor(Math.random() * arms);
      const angle = (arm / arms) * Math.PI * 2 + Math.pow(Math.random(), 0.5) * 3;
      const distance = Math.pow(Math.random(), 0.5) * radius;
      
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = (Math.random() - 0.5) * 2 * (distance / radius);
      
      // Colors based on position in arm
      const distRatio = distance / radius;
      
      // Blue to purple gradient from outside to inside
      const r = 0.4 + 0.6 * (1 - distRatio);
      const g = 0.2 + 0.3 * (1 - distRatio);
      const b = 0.7 + 0.3 * distRatio;
      
      const color = new THREE.Color(r, g, b);
      const size = Math.random() * 0.08 + 0.02;
      
      temp.push({
        position: [x, y, z],
        color,
        size
      });
    }
    return temp;
  }, [count, arms, radius]);

  return (
    <group>
      {points.map((point, i) => (
        <StarParticle 
          key={i} 
          position={point.position} 
          color={point.color} 
          size={point.size}
          speed={0.0005 + Math.random() * 0.001}
        />
      ))}
    </group>
  );
};

// Background stars
const BackgroundStars = ({ count = 1000, radius = 50 }) => {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Random position in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * 0.8 + Math.random() * radius * 0.2;
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Mostly white stars with occasional colored stars
      const isColoredStar = Math.random() > 0.85;
      let color;
      
      if (isColoredStar) {
        // Occasional blue, red, or yellow star
        const starType = Math.floor(Math.random() * 3);
        switch (starType) {
          case 0:
            color = new THREE.Color(0.7, 0.8, 1); // Blue star
            break;
          case 1:
            color = new THREE.Color(1, 0.7, 0.7); // Red star
            break;
          case 2:
            color = new THREE.Color(1, 1, 0.7); // Yellow star
            break;
        }
      } else {
        // White star with slight variations
        const whiteness = 0.8 + Math.random() * 0.2;
        color = new THREE.Color(whiteness, whiteness, whiteness);
      }
      
      const size = Math.random() * 0.05 + 0.01;
      
      temp.push({
        position: [x, y, z],
        color,
        size
      });
    }
    return temp;
  }, [count, radius]);

  return (
    <group>
      {points.map((point, i) => (
        <StarParticle 
          key={i} 
          position={point.position} 
          color={point.color} 
          size={point.size}
          speed={0.0001 + Math.random() * 0.0005} // Slower rotation for background stars
        />
      ))}
    </group>
  );
};

// Light trails
const LightTrails = ({ count = 20, radius = 12 }) => {
  const trailsRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (trailsRef.current) {
      // Slow rotation of the entire trails system
      trailsRef.current.rotation.y = clock.elapsedTime * 0.05;
    }
  });
  
  // Create trail curves
  const trails = useMemo(() => {
    const trails = [];
    
    for (let i = 0; i < count; i++) {
      const points = [];
      const startAngle = Math.random() * Math.PI * 2;
      const angleLength = Math.PI * (1 + Math.random());
      const startRadius = 3 + Math.random() * (radius - 5);
      
      // Create a smooth curve for each trail
      for (let a = 0; a < 30; a++) {
        const percent = a / 29;
        const angle = startAngle + angleLength * percent;
        const r = startRadius + percent * 3;
        
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;
        const y = (Math.random() - 0.5) * 1 * percent; // Slight vertical variation
        
        points.push(new THREE.Vector3(x, y, z));
      }
      
      // Create a curve from the points
      const curve = new THREE.CatmullRomCurve3(points);
      trails.push({
        curve,
        width: Math.random() * 0.1 + 0.05,
        color: new THREE.Color(
          0.5 + Math.random() * 0.5,  // Red
          0.2 + Math.random() * 0.3,  // Green
          0.7 + Math.random() * 0.3   // Blue
        )
      });
    }
    
    return trails;
  }, [count, radius]);

  return (
    <group ref={trailsRef}>
      {trails.map((trail, i) => (
        <mesh key={i}>
          <tubeGeometry 
            args={[trail.curve, 64, trail.width, 8, false]} 
          />
          <meshStandardMaterial 
            color={trail.color} 
            emissive={trail.color}
            emissiveIntensity={2}
            toneMapped={false}
            transparent
            opacity={0.7} 
          />
        </mesh>
      ))}
    </group>
  );
};

// Main scene setup with camera controls and effects
const GalaxySceneSetup = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const { mouse } = useThree();
  
  // Subtle parallax effect based on mouse position
  useFrame(() => {
    if (cameraRef.current) {
      // Gentle camera movement following mouse
      cameraRef.current.position.x += (mouse.x * 3 - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (-mouse.y * 3 - cameraRef.current.position.y) * 0.05;
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera 
        ref={cameraRef} 
        makeDefault 
        position={[0, 5, 25]} 
        fov={60}
        near={0.1}
        far={1000}
      />
      
      {/* Subtle orbit controls for touch device interaction */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      
      {/* Scene lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} color="#9b87f5" intensity={5} distance={20} />
      
      {/* Galaxy components */}
      <GalaxyCore />
      <SpiralArms count={5000} arms={5} radius={12} />
      <DustParticles count={1000} radius={15} />
      <LightTrails count={20} radius={12} />
      <BackgroundStars count={2000} radius={40} />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
        <Noise opacity={0.02} />
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
        />
      </EffectComposer>
      
      {/* Performance optimization */}
      <AdaptiveDpr pixelated />
    </>
  );
};

interface GalaxySceneProps {
  className?: string;
}

// Main exported component
const GalaxyScene: React.FC<GalaxySceneProps> = ({ className }) => {
  return (
    <div className={`${className || ''} w-full h-full`}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <GalaxySceneSetup />
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
