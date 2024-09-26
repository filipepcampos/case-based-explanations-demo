export default function TextualInformation() {
  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mb-2">About</h2>
        <div>
          Case-based explanations help understand the rational behind
          Machine-learning classifiers through the use of historical examples.
        </div>
        <div>
          This demo showcases a simple case-based explanation system for a
          handwritten digit classifier. The system will evaluate a
          user-submitted drawing and present a set of similar examples based on
          the features computed by a Neural Network. For more information visit
          our{" "}
          <a
            href="/about"
            className="underline text-blue-500 hover:text-blue-700"
          >
            About page
          </a>
          .
        </div>
      </div>
      <h2 className="text-lg font-bold mt-4 mb-2">Instructions</h2>
      <ol className="list-inside list-decimal text-sm text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get started by drawing a number from{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            0 to 9
          </code>
          .
        </li>
        <li className="mb-2">Submit your drawing by clicking the button.</li>
        <li className="mb-2">Wait for our API to process your drawing.</li>
        <li className="mb-2">See the results below.</li>
      </ol>
    </div>
  );
}
