import React, { useState } from "react";
import "./Aperture.css";

const NUM_BLADES = 28;
const BLADE_LENGTH = 60;
const BLADE_WIDTH = 20;

const Aperture = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const blades = Array.from({ length: NUM_BLADES });

  return (
    // <div className="aperture-container" onClick={() => setIsOpen(!isOpen)}>
    <div className="aperture-container" onClick={() => setIsOpen(!isOpen)}>

      <svg viewBox="0 0 200 200" className="aperture-svg">
        {/* <circle cx="100" cy="100" r="95" fill="#111" stroke="#333" strokeWidth="2" /> */}
        <circle cx="100" cy="100" r="95" fill="#0f0f0f" stroke="skyblue" strokeWidth="2" />

        {blades.map((_, i) => {
          const baseAngle = (360 / NUM_BLADES) * i;
          const openTranslate = isOpen ? 30 : 0;
          const openRotate = isOpen ? -15 : 0;

          return (
            <g
              key={i}
              transform={`
                rotate(${baseAngle}, 100, 100)
                translate(0, ${-openTranslate})
                rotate(${openRotate}, 100, 100)
              `}
              style={{
                transition: "all 0.6s ease-in-out",
              }}
            >
              <path
                d={`
                  M100,100 
                  L${100 - BLADE_WIDTH / 2},${100 - BLADE_LENGTH} 
                  L${100 + BLADE_WIDTH / 2},${100 - BLADE_LENGTH} 
                  Z
                `}
                // fill="#444"
                fill="#c081c2"
              />
            </g>
          );
        })}

        <defs>
  <clipPath id="circle-mask">
    <circle cx="100" cy="100" r="95" />
  </clipPath>
</defs>

      </svg>
    </div>
  );
};

export default Aperture;
