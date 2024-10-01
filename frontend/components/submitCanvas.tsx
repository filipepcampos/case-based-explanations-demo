"use server";

import { env } from "next-runtime-env";
import { PredictionType } from "./Canvas";

export default async function submitCanvas({
  canvasFormData,
}: {
  canvasFormData: FormData;
}) {
  const host = env("NEXTJS_API_HOST");

  let prediction: PredictionType = {
    prediction: null,
    confidence: null,
    explanations: [],
  };

  const response = await fetch(host + "/predict", {
    method: "POST",
    body: canvasFormData,
  });

  if (response.ok) {
    const data = await response.json();
    return prediction = {
      prediction: data.prediction,
      confidence: data.confidence,
      explanations: data.explanations,
    };
  } else {
    return prediction;
  }
}
