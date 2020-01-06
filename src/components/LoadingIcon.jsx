import React from 'react';

export default function LoadingIcon() {
  return (
    <svg
      className="loading-icon"
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      viewBox="0 0 128 128"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
      <g>
        <linearGradient id="linear-gradient">
          <stop offset="0%" stop-color="#ffffff" fill-opacity="0" />
          <stop offset="100%" stop-color="#242488" fill-opacity="1" />
        </linearGradient>
        <path
          d="M63.85 0A63.85 63.85 0 1 1 0 63.85 63.85 63.85 0 0 1 63.85 0zm.65 19.5a44 44 0 1 1-44 44 44 44 0 0 1 44-44z"
          fill="url(#linear-gradient)"
          fill-rule="evenodd"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur="1080ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
}
