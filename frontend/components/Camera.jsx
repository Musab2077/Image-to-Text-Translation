import React, { useRef } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";

export default function Camera() {
  const navigate = useNavigate();
  const screenshotRef = useRef();

  const handleCapture = async () => {
    // if (!screenshotRef.current) return;

    // try {
    //   const canvas = await html2canvas(screenshotRef.current);
    //   const dataURL = canvas.toDataURL("image/png");

    //   // Create a blob from the dataURL
    //   const blob = await (await fetch(dataURL)).blob();

    //   // Use FileSaver.js or browser-specific download
    //   const link = document.createElement("a");
    //   link.href = URL.createObjectURL(blob);
    //   link.download = "screenshot.png";
    //   link.click();

    //   // Optionally revoke the URL object after download
    //   setTimeout(() => URL.revokeObjectURL(link.href), 100);
    // } catch (error) {
    //   console.error("Error capturing screenshot:", error);
    // }
  };

  return (
    <>
      <div className="grid xl:place-items-center h-screen xl:place-self-center min-[320px]:place-items-center">
        <div ref={screenshotRef}>
          <Webcam height={900} width={900} />
        </div>
        <div className="space-x-32">
          <button
            className="px-3 py-1.5 bg-cyan-300 hover:bg-cyan-400 rounded-md active:bg-cyan-500"
            onClick={() => navigate("/")}
          >
            Close
          </button>
          <button
            className="px-3 py-1.5 bg-slate-300 hover:bg-slate-400 rounded-md active:bg-slate-500"
            onClick={handleCapture}
          >
            Translate
          </button>
        </div>
      </div>
    </>
  );
}