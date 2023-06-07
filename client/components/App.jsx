import dn from '../stylesheets/arid_dn.jpg'
import ft from '../stylesheets/arid_ft.jpg'
import lf from '../stylesheets/arid_lf.jpg'
import bk from '../stylesheets/arid_bk.jpg'
import rt from '../stylesheets/arid_rt.jpg'
import up from '../stylesheets/arid_up.jpg'

import dn_1 from '../stylesheets/influencer/sun_dn.jpg'
import ft_1 from '../stylesheets/influencer/sun_ft.jpg'
import lf_1 from '../stylesheets/influencer/sun_lf.jpg'
import bk_1 from '../stylesheets/influencer/sun_bk.jpg'
import rt_1 from '../stylesheets/influencer/sun_rt.jpg'
import up_1 from '../stylesheets/influencer/sun_up.jpg'
// 

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';  
import { CubeCamera, TextureLoader, CubeTextureLoader, WebGLCubeRenderTarget, RGBAFormat} from 'three';
import * as THREE from 'three';

function Skybox(){
    const {scene} = useThree();
    const loader = new CubeTextureLoader();
    const texture = loader.load([
        ft_1,
        bk_1,
        up_1,
        dn_1,
        rt_1,
        lf_1
    ]);
    scene.background = texture;
    return null;
}

function Sphere(){
    const { scene, gl } = useThree();
    const cubeRenderTarget = new WebGLCubeRenderTarget(512, {
        format: RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipMapLinearFilter
    });
    const cubeCamera = new CubeCamera(1,100, cubeRenderTarget);
    cubeCamera.position.set(0,0,0);
    scene.add(cubeCamera);
    useFrame(()=> cubeCamera.update(gl, scene));

    return(
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
        {/* <directionalLight intensity={0.5} /> */}
        <sphereGeometry attach="geometry" args={[2, 32, 32]} />
        <meshBasicMaterial
          attach="material"
          envMap={cubeCamera.renderTarget.texture}
          color="white"
          roughness={0.1}
          metalness={1}
        />
      </mesh>        
    );
}


const App = () => {
    return (
     <Canvas>
        <directionalLight intensity={0.5} />
        <Sphere />
        <OrbitControls/>
        <Skybox />
     </Canvas>
    )
};


export default App;
