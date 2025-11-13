import React from "react";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center text-gray-900 px-6 sm:px-10 overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #0D9486 0%, #2EB87A 50%, #9CD97B 100%)",
      }}
    >
      {/* Overlay Gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>

      <main className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center">
        {/* Small Button */}
        <button
          className="mb-8 flex items-center space-x-2 border border-white text-white text-xs rounded-full px-4 py-1.5 hover:bg-white/10 transition"
          type="button"
        >
          <span>Explore how we help grow brands</span>
          <span className="flex items-center justify-center size-6 p-1 rounded-full bg-white">
            <svg
              width="14"
              height="11"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.5h14M9.5 1 15 6.5 9.5 12"
                stroke="#0D9486"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        {/* Title */}
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-white leading-tight tracking-tight drop-shadow-md">
          Your Ultimate Hub for{" "}
          <span className="text-gray-900">Heavy Metal Music</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-white/90 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Discover the latest metal releases, connect with fans, and dive deep
          into the world of heavy metal culture.
        </p>

        {/* CTA Button */}
        <button
          className="mt-10 bg-white text-[#0D9486] px-8 py-3 rounded-full text-sm font-semibold flex items-center space-x-2 hover:bg-gray-100 transition shadow-md"
          type="button"
        >
          <span>Get Started</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
              stroke="#0D9486"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </main>

      {/* Subtle fade into white for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
