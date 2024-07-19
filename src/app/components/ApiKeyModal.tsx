"use client";
import React, { useState } from "react";

interface APIProps {
  setStoredKey: React.Dispatch<React.SetStateAction<string | null>>;
  setToggleApiKey: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApiKeyModal: React.FC<APIProps> = ({ setStoredKey, setToggleApiKey }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    if (apiKey) {
      localStorage.setItem("openaiApiKey", apiKey);
      setStoredKey(apiKey);
      setToggleApiKey(false);
    }
  };
  return (
    <div className="border border-[#7a7a7a] absolute mt-6 bg-white backdrop-blur-sm max-h-[30vh] bg-opacity-70 w-[95%] inset-0 mx-auto z-30 rounded-lg  shadow-2xl">
      <form onSubmit={handleSubmit} className="px-2">
        <div className="my-4">
          <label
            htmlFor="apiKey"
            className="block text-sm font-medium text-gray-700"
          >
            OpenAI API key
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your OpenAI API key"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApiKeyModal;
