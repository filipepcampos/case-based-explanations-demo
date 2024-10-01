'use client';

import { PredictionType, Canvas } from "./Canvas";
import { ExplanationList } from "./ExplanationList";
import Confidence from "./Confidence";
import TextualInformation from "./TextualInformation";
import submitCanvas from "./submitCanvas";
import { useState } from "react";

export default function InteractiveSection() {
  const [result, setResult] = useState<PredictionType>({
    prediction: null,
    confidence: null,
    explanations: [],
  });

  const onSubmit = async (formData: FormData) => {
    const updatedPrediction = await submitCanvas({ canvasFormData: formData });
    setResult(updatedPrediction);
  }
  
  const onClear = () => {
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
        {result.explanations && <ExplanationList result={result} />}
      </div>
    </div>
  );
}
