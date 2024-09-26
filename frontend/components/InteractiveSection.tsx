"use client";

import { useState } from "react";
import { PredictionType, Canvas } from "./Canvas";
import { env } from "next-runtime-env";
import { ExplanationList, MockExplanationList } from "./ExplanationList";
import Confidence from "./Confidence";
import TextualInformation from "./TextualInformation";

export default function InteractiveSection() {
  const [result, setResult] = useState<PredictionType>({
    prediction: null,
    confidence: null,
    explanations: [],
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (blob: Blob) => {
    const file = new File([blob], "canvas-image.png", { type: blob.type });

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    // Send the file to the server
    const host = env("NEXT_PUBLIC_API_HOST");
    fetch(host + "/predict", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setResult({
              prediction: data.prediction,
              confidence: data.confidence,
              explanations: data.explanations,
            });
          });
        } else {
          console.error("Failed to upload image.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const onClear = () => {
    setLoading(false);
    setResult({
      prediction: null,
      confidence: null,
      explanations: [],
    });
  };

  return (
    <div
      className="flex-grow
    "
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <TextualInformation />
        </div>

        <div className="flex justify-center w-full">
          <div className="w-1/2">
            <Canvas onSubmit={onSubmit} onClear={onClear} />
          </div>
        </div>

        <div className="w-full">
          <Confidence result={result} />
        </div>
      </div>

      <div className="mt-2">
        {loading && !result.explanations && <MockExplanationList />}
        {result.explanations && <ExplanationList result={result} />}
      </div>
    </div>
  );
}
