import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import arabicReshaper from "arabic-reshaper";

function FileUploader() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [option, setOption] = useState("");
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [translatedResposne, setTranslatedResponse] = useState("");
  const [wholeResponse, setWholeResponse] = useState("");

  const localhostURL = "http://127.0.0.1:8000";

  var imgName = "";

  useEffect(() => {
    console.log("Updated Translated Response:", translatedResposne);
  }, [translatedResposne]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Get the first file selected

    console.log(file);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${localhostURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      imgName = imgName + response.data.filename;
      setFileName(response.data.filename);
      console.log("File Name:", fileName);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleOption = (event) => {
    setOption(event.target.selectedOptions[0].value);
    // console.log(event.target.selectedOptions[0].value);
  };

  // For Translation
  const handleTranslation = async () => {
    try {
      setLoadingAnimation(true);
      setWholeResponse('opacity-70 blur-[2px]');
      const response = await axios.post(`${localhostURL}/translation`, {
        filename: fileName,
        language: option,
      });
      const urduText = response.data.translation;
      setTranslatedResponse(urduText);
    } catch (error) {
      console.log("Error occured in translation post request", error);
    } finally {
      setLoadingAnimation(false);
      setWholeResponse('');
      // console.log(translatedResposne);
    }
  };

  return (
    <div className="w-screen h-screen place-items-center">
      <div className="w-1/2 ">
        <div
          className={`flex justify-between pt-9 pb-24 border-b-stone-300 border-b-4 ${wholeResponse}`}
        >
          {/* Selecting a file form your PC */}
          <div>
            <p className="mb-8 text-blue-600">1 Step - Upload an Image</p>
            <label className="cursor-pointer text-2xl bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600">
              Select File...
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
          {/* Options to translate */}
          <div>
            <p className="mb-8 text-blue-600">2 Step - Select language</p>
            <div className="place-self-center">
              <select
                className="border border-black p-1 w-28"
                onClick={handleOption}
              >
                <option id="1" value="ur">
                  Urdu
                </option>
                <option id="2" value="de">
                  Germany
                </option>
                <option id="3" value="ja">
                  Japanese
                </option>
              </select>
            </div>
          </div>
          {/* Uploding the file to the backend */}
          <div className="ml-6">
            <p className="mb-4 text-blue-600">3 Step - Translation</p>
            <div className="flex flex-row">
              <button
                className="text-2xl bg-blue-500 text-white px-8 py-4 rounded-md hover:bg-blue-600"
                onClick={handleTranslation}
              >
                Translation
              </button>
              <div className="place-content-center ml-3 ">
                {/* <AiOutlineLoading3Quarters className="animate-spin" /> */}
              </div>
            </div>
          </div>
          {/* {file && <p>Selected File: {file.name}</p>} */}
        </div>
        <div className="place-items-center m-24">
          {loadingAnimation && (
            <AiOutlineLoading3Quarters className="size-20 animate-spin" />
          )}
        </div>
        <p className="font-sans text-lg">{translatedResposne}</p>
      </div>
    </div>
  );
}

export default FileUploader;
