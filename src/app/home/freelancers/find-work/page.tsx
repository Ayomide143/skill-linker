"use client";
import Footer from "@/components/Footer";
import JobsHero from "@/components/JobsHero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-5 py-3">
        <JobsHero />
        <Footer />
      </div>
    </>
  );
}
