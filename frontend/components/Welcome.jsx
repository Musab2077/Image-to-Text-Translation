import React from "react";
import { useNavigate } from "react-router-dom";
// import opencv from "opencv.js";

export default function Welcome() {
  const navigate = useNavigate();
  // cv = require('opencv.js');
  
  const webcam = () => {
    axios.get('/webcam')
  }
  
  return (
    <div className="h-screen grid place-items-center bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200">
      <div className="place-items-center object-center">
        <div>
          {/* hovering text with animation */}
          <h1 className="text-center font-bold text-6xl mb-4">what you see</h1>
          <div className="text-center ">
            <p className="">Not sure how to describe it in words?</p>
            <p>Use your camera to translate in 3 languages.</p>
          </div>
          <div className="justify-self-center mt-5">
            <button
              className="bg-blue-500 text-white p-3 px-7 hover:bg-blue-600 rounded-md active:bg-blue-700 font-bold"
              onClick={() => navigate("/camera")}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
