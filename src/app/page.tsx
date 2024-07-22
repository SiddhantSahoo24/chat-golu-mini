'use client';

import React, { useEffect, useState } from "react";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai" ;

const apiKey = new String(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

function Gola() {
  const [ data , setData] = useState<string>("");

    
    async function run(prompt:any) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  //console.log(result.response);

  console.log(typeof(result.response.text()));
  setData(result.response.text())

}

//run();
const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = (event.target as HTMLFormElement)?.prompt?.value || "";
    run(prompt);
  };

  const parsedData = data.split('\n').map((line, index) => <p key={index}>{line}</p>);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-2">ChatGolu mini.</h1>

      <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={onSubmit} className="">
        <p className="mb-2">Enter your prompt here</p>
        <input
          type="text"
          placeholder="Enter your prompt here"
          name="prompt"
          className="border-none outline-none p-4 rounded-lg text-black"
        />{" "}
        <br />
        <button
          type="submit"
          className="bg-white border border-none outline-none p-4 rounded-lg text-black font-bold uppercase mt-2"
        >
          Submit
        </button>
      </form>
  {data && (
        <div>
          <h1 className="mt-32">Output</h1>
         {data}
        </div>
      )}  
    </main>


    </div>
  )
}

export default Gola;
