import { useEffect, useRef } from "react";
import Link from "next/link";

export default function SkillsSection() {
  const sectionRef = useRef();
  const textRef = useRef();
  const imageRef = useRef();

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

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="skills-dashboard" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="max-w-xl transition-all duration-700 opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Powerful Skills Dashboard
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get a comprehensive view of skills across your organization with our intuitive Skills Dashboard.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">User Skill Profiles</h3>
                <p className="text-gray-600">
                  Detailed skill profiles for every team member with proficiency levels and growth trends.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Skill Level Analytics</h3>
                <p className="text-gray-600">
                  Visual analytics showing skill distribution and progress over time.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Learning Recommendations</h3>
                <p className="text-gray-600">
                  AI-powered suggestions for skill development based on individual profiles.
                </p>
              </div>
            </div>

            <Link href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Explore Skills Dashboard
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>

          <div ref={imageRef} className="transition-all duration-700 delay-200 opacity-0 translate-y-8">
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500">Dashboard</span>
                <h3 className="text-xl font-bold">Skill Analytics</h3>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">User Skill Profiles</h4>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="flex justify-between mb-3">
                      <span className="font-medium">Usman Ahmed</span>
                      <span className="text-sm text-gray-500">Product Designer</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>UI Design</span>
                          <span>50%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: "50%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Prototyping</span>
                          <span>95%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: "95%"}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>User Research</span>
                          <span>65%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: "65%"}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">Skill Development Over Time</h4>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-gray-100">
                    <div className="h-32 flex items-end justify-between pt-4">
                      <div className="w-8 bg-blue-200 rounded-t-sm" style={{height: "40%"}}></div>
                      <div className="w-8 bg-blue-300 rounded-t-sm" style={{height: "55%"}}></div>
                      <div className="w-8 bg-blue-400 rounded-t-sm" style={{height: "70%"}}></div>
                      <div className="w-8 bg-blue-500 rounded-t-sm" style={{height: "65%"}}></div>
                      <div className="w-8 bg-blue-600 rounded-t-sm" style={{height: "80%"}}></div>
                      <div className="w-8 bg-blue-700 rounded-t-sm" style={{height: "90%"}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}