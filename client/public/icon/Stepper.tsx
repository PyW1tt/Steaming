import React from "react";
import { PropColor } from "../../src/model/PropState";

export function Step1(props: PropColor) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="48"
        height="48"
        rx="24"
        fill={!props.colorBg ? "#F6F6F9" : props.colorBg}
      />
      <path
        d="M23.656 18.216H19.816V15.456H26.608V33H23.656V18.216Z"
        fill={!props.colorNum ? "#7B7E8F" : props.colorNum}
      />
    </svg>
  );
}

export function Step2(props: PropColor) {
  return (
    <svg
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        width="48"
        height="48"
        rx="24"
        fill={!props.colorBg ? "#F6F6F9" : props.colorBg}
      />
      <path
        d="M30.272 32.976L18.104 33V30.696L23.84 25.848C26.216 23.832 27.008 22.68 27.008 21C27.008 19.008 25.928 17.88 24.08 17.88C22.16 17.88 20.96 19.224 20.936 21.48H17.888C17.912 17.64 20.36 15.144 24.08 15.144C27.824 15.144 30.152 17.28 30.152 20.832C30.152 23.28 28.808 25.128 26.144 27.408L22.976 30.12H30.272V32.976Z"
        fill={!props.colorNum ? "#7B7E8F" : props.colorNum}
      />
    </svg>
  );
}

export function Step3(props: PropColor) {
  return (
    <svg
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        width="48"
        height="48"
        rx="24"
        fill={!props.colorBg ? "#F6F6F9" : props.colorBg}
      />
      <path
        d="M23.716 24.312H21.58V22.32L26.092 18.168H18.796V15.456H29.932V17.904L25.66 21.84C28.348 22.368 30.436 24.336 30.436 27.432C30.436 31.032 27.628 33.312 24.076 33.312C20.644 33.312 17.98 31.2 17.98 27.408H21.004C21.004 29.424 22.252 30.576 24.124 30.576C26.044 30.576 27.316 29.328 27.316 27.384C27.316 25.608 26.164 24.312 23.716 24.312Z"
        fill={!props.colorNum ? "#7B7E8F" : props.colorNum}
      />
    </svg>
  );
}
