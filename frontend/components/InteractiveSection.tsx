"use client";

import { PredictionType, PixelatedCanvas } from "./canvas/PixelatedCanvas";
import { ExplanationList } from "./ExplanationList";
import Confidence from "./Confidence";
import TextualInformation from "./TextualInformation";
import submitCanvas from "./submitCanvas";
import { useState } from "react";
import { SmoothCanvas } from "./canvas/SmoothCanvas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InteractiveSection() {
  const [result, setResult] = useState<PredictionType>({
    prediction: null,
    confidence: null,
    explanations: [],
  });
  const [canvasStyle, setCanvasStyle] = useState<string>("pixel");

  const onSubmit = async (formData: FormData) => {
    const updatedPrediction = await submitCanvas({ canvasFormData: formData });
    setResult(updatedPrediction);
  };

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

        <div>
          <div className="flex gap-2 mb-4 mt-8 md:mt-2 text-sm justify-center align-center w-full">
            <p>Drawing style: </p>
            <Select
              defaultValue="pixel"
              onValueChange={(v) => setCanvasStyle(v)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pixelated" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pixel">Pixelated</SelectItem>
                <SelectItem value="smooth">Smooth</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-1/2">
              {canvasStyle === "pixel" ? (
                <PixelatedCanvas onSubmit={onSubmit} onClear={onClear} />
              ) : (
                <SmoothCanvas onSubmit={onSubmit} onClear={onClear} />
              )}
            </div>
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
