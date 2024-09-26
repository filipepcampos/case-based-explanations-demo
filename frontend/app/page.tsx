import { env } from "next-runtime-env";

import Image from "next/image";
import InteractiveSection from "../components/InteractiveSection";

export default function Home() {
  // Send a heartbeat to the API to wake up the API container
  const host = env("NEXT_PUBLIC_API_HOST");
  fetch(`${host}/`, { method: "GET"});

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="flex mb-4 text-4xl font-extrabold leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Case-based explanations demo
        </h1>
        <InteractiveSection />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/filipepcampos/case-based-explanations-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Github
        </a>
      </footer>
    </div>
  );
}
