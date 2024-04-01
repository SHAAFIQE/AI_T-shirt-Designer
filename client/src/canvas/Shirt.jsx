import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useGLTF, useTexture } from '@react-three/drei';
import { Decal } from '@react-three/drei';
import state from '../store';
import { useFrame } from '@react-three/fiber';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  // Load textures
  const fullTexture = useTexture(snap.fullDecal);
  const logoTexture = useTexture(snap.logoDecal);

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  // Set the anisotropy property on the texture objects
  if (fullTexture) fullTexture.anisotropy = 16;
  if (logoTexture) logoTexture.anisotropy = 16;

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
