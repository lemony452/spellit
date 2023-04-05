import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import Background from "./characters/Background";
// import { CBDefault1, AKDefault1, LUNADefault1 } from "./characters/Player1";
import { CBDefault1, AKDefault1, LUNADefault1 } from "./characters/Player1";
import { AKDefault2, CBDefault2, LUNADefault2 } from "./characters/Player2";

import Start from "./quarks/Start";

import Tornado from "./quarks/Tornado";
import DarkHall from "./quarks/DarkHall";
import Light from "./quarks/Light";
import Earth from "./quarks/Earth";
import FireBall from "./quarks/FireBall";
import Lightning from "./quarks/Lightening";
import SnowStorm from "./quarks/SnowStorm";

import "./Skills.css";

function Skills() {
  // 마법 시전 효과 시작
  const [isStart, setIsStart] = useState<boolean>(false);
  // 마법 사용
  const [isSpell, setIsSpell] = useState<boolean>(false);
  // camera
  const cameraNum = useRef<number>(2);
  // 현재턴
  const turn = useRef<number>(1);

  const handleButton = () => {
    setIsStart(!isStart);
    console.log('start! 누름!!!')
  };
  const handleSpell = () => {
    setIsSpell(!isSpell);
  };

  const selectCamera = (num: number) => {
    cameraNum.current = num;
  };

  console.log(isStart, "isStart");
  console.log(isSpell, "isSpell");

  return (
    <div className="box2">
      {/* 임시버튼 */}
      <div>
        <button onClick={handleButton}>button</button>
      </div>
      <Canvas className="canvas">
        {/* <OrbitControls /> */}
        <ambientLight intensity={0.8} />

        {/* 배경이미지 */}
        <Background position={[0, 0, 0]} />

        {/* 캐릭터 1P*/}
        <CBDefault1 position={[-5, -1, 0]} isSpell={isSpell} turn={turn} />
        {/* <AKDefault1 position={[-5, -1, 0]} isSpell={isSpell} turn={turn} /> */}
        {/* <LUNADefault1 position={[-5, -1, 0]} isSpell={isSpell} turn={turn} /> */}

        {/* 캐릭터 2P */}
        {/* <CBDefault2 position={[5, -1, 0]} isSpell={isSpell} turn={turn} /> */}
        <AKDefault2 position={[5, -1, 0]} isSpell={isSpell} turn={turn} />
        {/* <LUNADefault2 position={[5, -1, 0]} isSpell={isSpell} turn={turn} /> */}

        {/* 마법 시전 이펙트 */}
        {isStart && (
          <>
            <Start
              handleButton={handleButton}
              handleSpell={handleSpell}
              isStart={isStart}
              turn={turn}
            />
          </>
        )}
        {/* 여기서부터 실행되는 마법 */}
        {/* WIND */}
        {/* 남양의 폭풍 camera 0*/}
        {/* {isSpell && (
          <>
            <Tornado
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
              turn={turn}
            />
          </>
        )} */}
        {/* 번개 camera 1*/}
        {/* {isSpell && (
          <>
            <Lightning
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
							turn={turn}
            />
          </>
        )} */}
        {/* WATER */}
        {/* {isSpell && (
          <>
            <SnowStorm
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
              turn={turn}
            />
          </>
        )} */}
        {/* FIRE */}
        {/* {isSpell && (
          <>
            <FireBall
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
              turn={turn}
            />
          </>
        )} */}
        {/* EARTH */}
        {/* {isSpell && (
          <>
            <Earth
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
							turn={turn}
            />
          </>
        )} */}
        {/* LIGHT */}
        {/* {isSpell && (
          <>
            <Light
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
							turn={turn}
            />
          </>
        )} */}
        {/* DARK */}
        {/* 무광의 심연 */}
        {isSpell && (
          <>
            <DarkHall
              handleSpell={handleSpell}
              isSpell={isSpell}
              selectCamera={selectCamera}
              turn={turn}
            />
          </>
        )}
        {/* 카메라 */}
        <MyCamera
          isStart={isStart}
          isSpell={isSpell}
          cameraNum={cameraNum}
          turn={turn}
        />
      </Canvas>
    </div>
  );
}

export default Skills;

// 카메라
type MyCameraProps = {
  isStart: boolean;
  isSpell: boolean;
  cameraNum: React.RefObject<number>;
  turn: React.RefObject<number>;
};

function MyCamera({ isStart, isSpell, cameraNum, turn }: MyCameraProps) {
  const { camera } = useThree();
  const [position, setPosition] = useState<THREE.Vector3>(new THREE.Vector3());
  const [fov, setFov] = useState<number>(0);

  // player1
  useEffect(() => {
    if (turn.current === 1) {
      if (cameraNum.current === 0) {
        // 카메라 이동(처음만 확대) 0
        if (isStart) {
          setPosition(new THREE.Vector3(-5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      } else if (cameraNum.current === 1) {
        //카메라 이동(축소했다가 확대) 1
        if (isStart) {
          setPosition(new THREE.Vector3(-5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart && isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
          setTimeout(() => {
            setPosition(new THREE.Vector3(5, 0, 5));
            setFov(30);
          }, 1500);
        } else if (!isStart && !isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      } else if (cameraNum.current === 2) {
        //카메라 이동(직선으로 이동) 2
        if (isStart) {
          setPosition(new THREE.Vector3(-5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart && isSpell) {
          setTimeout(() => {
            setPosition(new THREE.Vector3(5, 0, 5));
            setFov(30);
          }, 1500);
        } else if (!isStart && !isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      } else if (cameraNum.current === 3) {
        //카메라 이동(위로 올라갔다 내려오기)
        if (isStart) {
          setPosition(new THREE.Vector3(-5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart && isSpell) {
          setPosition(new THREE.Vector3(-1.5, 3, 5));
          setFov(20);
          setTimeout(() => {
            setPosition(new THREE.Vector3(5, 0, 5));
            setFov(30);
          }, 1200);
        } else if (!isStart && !isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      }
    }
  }, [cameraNum, isStart, isSpell, turn]);

  // player2
  useEffect(() => {
    if (turn.current === 0) {
      if (cameraNum.current === 0) {
        // 카메라 이동(처음만 확대) 0
        if (isStart) {
          setPosition(new THREE.Vector3(5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      } else if (cameraNum.current === 1) {
        //카메라 이동(축소했다가 확대) 1
        if (isStart) {
          setPosition(new THREE.Vector3(5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart && isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
          setTimeout(() => {
            setPosition(new THREE.Vector3(-5, 0, 5));
            setFov(30);
          }, 1500);
        } else if (!isStart && !isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      } else if (cameraNum.current === 2) {
        //카메라 이동(직선으로 이동) 2
        if (isStart) {
          setPosition(new THREE.Vector3(5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart && isSpell) {
          setTimeout(() => {
            setPosition(new THREE.Vector3(-5, 0, 5));
            setFov(30);
          }, 1500);
        } else if (!isStart && !isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      } else if (cameraNum.current === 3) {
        //카메라 이동(위로 올라갔다 내려오기)
        if (isStart) {
          setPosition(new THREE.Vector3(5, 0, 5));
          // 확대
          setFov(30);
        } else if (!isStart && isSpell) {
          setPosition(new THREE.Vector3(2, 3, 5));
          setFov(20);
          setTimeout(() => {
            setPosition(new THREE.Vector3(-5, 0, 5));
            setFov(30);
          }, 1200);
        } else if (!isStart && !isSpell) {
          setPosition(new THREE.Vector3(0, 0, 5));
          setFov(75);
        }
      }
    }
  }, [turn, cameraNum, isStart, isSpell]);

  useFrame(() => {
    camera.position.lerp(position, 0.02);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.02);
    }
    camera.updateProjectionMatrix();
  });

  return <perspectiveCamera fov={fov} />;
}
