import React from "react";

function SvgWave() {
  return (
    <svg
      className="homePageWave"
      width="100vw"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
    >
      <path
        fill="#8CA8E0"
        fillOpacity="1"
        d="M0,32L80,64C160,96,320,160,480,165.3C640,171,800,117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  );
}

export default SvgWave;
