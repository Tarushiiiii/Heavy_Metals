import React from "react";
import Hero from "../components/landing_page/Hero";
import NavbarHome from "../components/landing_page/navbar_home";
import { Footer } from "../components/layout/footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <NavbarHome />

      {/* Hero Section */}
      <Hero />

      {/* Info Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 bg-white">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Welcome to the Heavy Metals App
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 text-base sm:text-lg">
          Your one-stop solution for all heavy metal music needs. Explore, connect,
          and discover the world of heavy metal like never before.
        </p>
      </section>
      <div className='bg="black"'>
      <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
