import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-20 lg:pt-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] w-[140%] h-[140%] rounded-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className={`max-w-2xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Transform Your <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Workforce</span> with <span className="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">Skills Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              ReeOrg gives you the power to analyze skills, design optimal org structures, and make data-driven talent decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                Request Demo
              </Link>
              <Link href="#features" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                  <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative bg-white rounded-xl shadow-xl p-4 border border-gray-100">
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Skills Dashboard Overview
              </div>
              <div className="absolute -top-4 right-4 text-gray-500 text-sm">
                Last updated: Today
              </div>
              <img
                src="https://images.pexels.com/photos/7947401/pexels-photo-7947401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Skills Dashboard Preview"
                className="rounded-lg shadow-lg w-full h-auto mt-6"
                width={600}
                height={400}
              />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">Interactive Dashboard Preview</span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}