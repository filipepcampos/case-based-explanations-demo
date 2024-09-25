"use client";

import { useState } from "react";
import { PredictionType, Canvas } from "./Canvas";
import Image from "next/image";

export default function InteractiveSection() {
  const [result, setResult] = useState<PredictionType>({
    prediction: null,
    confidence: null,
    explanations: [],
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="pl-8">
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">
                    Get started by drawing a number from{" "}
                    <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                    0 to 9
                    </code>
                    .
                </li>
                <li className="mb-2">
                    Submit and see a prediction alongside a set of examples which explain it.
                </li>
            </ol>

            { (result.prediction || result.prediction === 0) && result.confidence && (
                <div>
                <div className="mt-4 text-md">
                    prediction: <span className="text-blue-700 dark:text-white text-3xl">{result.prediction}</span>
                </div>
                <div className="pt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 pb-2">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: result.confidence * 100 + "%" }}
                    ></div>
                    <div className="flex justify-between mt-1">
                    <span className="text-xs text-blue-700 dark:text-white">
                        Confidence
                    </span>
                    <span className="text-xs text-blue-700 dark:text-white">
                        {Math.round(result.confidence * 100)}%
                    </span>
                    </div>
                    </div>
                </div>
                </div>
            )}
        </div>

                <div className="flex justify-center">
                  <div className="w-1/2">
                    <Canvas setResult={(result: PredictionType) => setResult(result)} />
                  </div>
                </div>
      </div>

      <div className="mt-8">
        {result.explanations && (
          <div className="flex gap-2 justify-center flex-wrap">
            {result.explanations.map((explanation, index) => (
              <div key={index}>
              <span className="mb-1 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:text-gray-300"> { "explanation " + (index+1)} - <span className="">{explanation.split("/").at(-2)}</span></span>
              
              <Image
                className="dark:invert-0 invert flex-shrink-0 rounded-lg border border-solid border-gray-200 dark:border-white"
                src={explanation}
                alt="Case-based explanation"
                width={150}
                height={150}
              />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
