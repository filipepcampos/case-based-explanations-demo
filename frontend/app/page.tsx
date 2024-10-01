import { env } from "next-runtime-env";

import InteractiveSection from "../components/InteractiveSection";
import Footer from "@/components/Footer";

export default function Home() {
  // Send a heartbeat to the API to wake up the API container
  const host = env("NEXTJS_API_HOST");
  fetch(`${host}/`, { method: "GET" });

  return (
    <main
      className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 gap-16 sm:p-0 min-h-screen font-[family-name:var(--font-geist-sans)
      mx-auto w-full max-w-screen-xl"
    >
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="mb-4 text-4xl font-extrabold leading-none text-gray-800 md:text-5xl lg:text-6xl dark:text-white">
          Case-based explanations - A small demo
        </h1>
        <InteractiveSection />
        <Footer />
      </div>
    </main>
  );
}
