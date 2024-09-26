export default function About() {
  return (
    <main
      className="grid grid-rows-[20px_1fr_20px] justify-items-center p-8 gap-16 sm:p-0 min-h-screen font-[family-name:var(--font-geist-sans)
      mx-auto w-full max-w-screen-xl"
    >
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex-grow grid h-screen place-content-center bg-white px-4">
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Uh-oh! Under construction.
            </p>

            <p className="mt-4 text-gray-700">
              We are glad for your interest in the application. Unfortunately at
              this time the About page is still under construction. Meanwhile if
              you are still craving for more information do feel free to check
              out our{" "}
              <a
                href="https://github.com/filipepcampos/case-based-explanations-demo"
                className="text-blue-500 hover:text-blue-700"
              >
                github repository.
              </a>
            </p>

            <a
              href="/"
              className="mt-6 inline-block rounded bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
