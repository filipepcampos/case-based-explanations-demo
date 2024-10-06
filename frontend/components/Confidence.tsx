import { PredictionType } from "./canvas/PixelatedCanvas";

export default function Confidence({ result }: { result: PredictionType }) {
  return (
    <div>
      {(result.prediction || result.prediction === 0) && result.confidence && (
        <div>
          <div className="mt-4 text-lg font-bold mb-2">Prediction:</div>

          <div className="flex flex-col md:flex-row md:gap-0 gap-4">
            <div className="text-base">
              You drew the number{" "}
              <span className="text-blue-700 dark:text-white">
                {result.prediction}
              </span>
              .
            </div>
            <div className="ml-6 flex-1">
              <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
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
          <div className="mt-8 md:mt-4 text-lg font-bold mb-2">
            Explanations:
          </div>
        </div>
      )}
    </div>
  );
}
