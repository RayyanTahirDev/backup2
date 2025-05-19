import { useEffect, useRef } from "react";

export default function FeaturesSection() {
  const sectionRef = useRef();
  const featureRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featureRefs.current) {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (featureRefs.current) {
        featureRefs.current.forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, []);

  return (
    <section id="features" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Skills Intelligence Platform
          </h2>
          <p className="text-lg text-gray-600">
            RELVE delivers powerful insights to help you understand and optimize your organization's skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div ref={(el) => (featureRefs.current[0] = el)} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-500 opacity-0 translate-y-8 hover:shadow-md">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Skills Intelligence</h3>
            <p className="text-gray-600 mb-4">
              Gain deep insights into your workforce's capabilities with AI-powered skills profiling.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>User skill profiling</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Skill gap analysis</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Learning recommendations</li>
            </ul>
          </div>

          <div ref={(el) => (featureRefs.current[1] = el)} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-500 delay-150 opacity-0 translate-y-8 hover:shadow-md">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Org Design</h3>
            <p className="text-gray-600 mb-4">
              Visualize and optimize your organizational structure based on skills distribution.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span>Reporting line visualization</li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span>Team composition planning</li>
              <li className="flex items-start"><span className="text-indigo-600 mr-2">•</span>Role requirement mapping</li>
            </ul>
          </div>

          <div ref={(el) => (featureRefs.current[2] = el)} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-500 delay-300 opacity-0 translate-y-8 hover:shadow-md">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Skills Management</h3>
            <p className="text-gray-600 mb-4">
              Track, develop, and manage skills across your entire organization.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Skill development tracking</li>
              <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Learning path creation</li>
              <li className="flex items-start"><span className="text-purple-600 mr-2">•</span>Progress reporting</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}