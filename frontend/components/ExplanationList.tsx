import { PredictionType } from "./Canvas";
import Image from "next/image";

export function ExplanationList({ result }: { result: PredictionType }) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {result.explanations.map((explanation, index) => (
        <div key={index}>
          <span className="mb-1 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:text-gray-300">
            {" "}
            {"explanation " + (index + 1)} -{" "}
            <span className="">{explanation.split("/").at(-2)}</span>
          </span>

          <Image
            className="dark:invert-0 invert flex-shrink-0 rounded-lg border border-solid border-gray-700 dark:border-white"
            src={explanation}
            alt="Case-based explanation"
            width={150}
            height={150}
          />
        </div>
      ))}
    </div>
  );
}

export function MockExplanationList() {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {[...Array(6)].map((explanation, index) => (
        <div key={index}>
          <span className="mb-1 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:text-gray-300">
            {" "}
            {"explanation " + (index + 1)}
          </span>

          <div
            className="flex items-center justify-center flex-shrink-0 rounded-lg border border-solid border-gray-200 dark:border-white dark:bg-gray-700 animate-pulse"
            style={{ width: "150px", height: "150px" }}
          >
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
