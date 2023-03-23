/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 undercha.glb
*/

// import React, { useRef } from 'react'
import { useGLTF } from "@react-three/drei";


export default function Undercha(props) {
  const { nodes, materials } = useGLTF("./models/undercha.glb");
  return (
    <group {...props} dispose={null} scale={[3, 3, 3]}>
      <mesh
        geometry={nodes.undercha.geometry}
        material={materials.undercha}
        rotation={[0, Math.PI / 4, -Math.PI / 15]}
      />
    </group>
  );
}


