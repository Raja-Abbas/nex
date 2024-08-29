import React from "react";

const BounceAnimation = () => {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="bounce bounce-1"
        y="9.30078"
        width="4"
        height="4"
        rx="2.5"
        fill="white"
      />
      <rect
        className="bounce bounce-2"
        x="8"
        y="9.30078"
        width="4"
        height="4"
        rx="2.5"
        fill="#1EB8CD"
      />
      <rect
        className="bounce bounce-3"
        x="16"
        y="9.30078"
        width="4"
        height="4"
        rx="2.5"
        fill="#949494"
      />
    </svg>
  );
};

export default BounceAnimation;
