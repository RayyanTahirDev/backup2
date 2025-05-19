import { useEffect, useRef } from "react";
import Link from "next/link";

export default function OrgDesignSection() {
  const sectionRef = useRef();
  const imageRef = useRef();
  const textRef = useRef();

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
    <section id="org-design" ref={sectionRef} className="py-24 bg-gradient-to-tl from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="order-2 md:order-1 transition-all duration-700 opacity-0 translate-y-8">
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-500">Organization Structure</span>
                <h3 className="text-xl font-bold">Leadership Team</h3>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-indigo-100 text-indigo-800 px-6 py-3 rounded-lg text-center">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">JD</div>
                      <div>
                        <div className="font-medium">John Doe</div>
                        <div className="text-xs">CEO</div>
                      </div>
                    </div>
                    <div className="text-xs text-indigo-600">Executive</div>
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-300 mx-auto"></div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">SJ</div>
                    <div className="font-medium text-sm">Sarah Johnson</div>
                    <div className="text-xs text-gray-600">HR Director</div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">RS</div>
                    <div className="font-medium text-sm">Robert Smith</div>
                    <div className="text-xs text-gray-600">Engineering</div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">EB</div>
                    <div className="font-medium text-sm">Emily Brown</div>
                    <div className="text-xs text-gray-600">Marketing</div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">MJ</div>
                    <div className="font-medium text-sm">Michael Johnson</div>
                    <div className="text-xs text-gray-600">Finance</div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-4">
                    <h4 className="font-medium">Department Skills Overview</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span>Engineering</span>
                      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: "85%"}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Marketing</span>
                      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: "75%"}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Finance</span>
                      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{width: "90%"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={textRef} className="order-1 md:order-2 max-w-xl transition-all duration-700 opacity-0 translate-y-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visualize and Optimize Your Organization
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get a clear view of your organizational structure and make data-driven decisions about team composition.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Real-time Org Visualization</h3>
                <p className="text-gray-600">
                  See your complete organizational structure with detailed insights into roles and reporting lines.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Skills Distribution</h3>
                <p className="text-gray-600">
                  Analyze skill distribution across departments and identify areas for improvement.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">Future-ready Planning</h3>
                <p className="text-gray-600">
                  Model different organizational structures and simulate the impact of changes.
                </p>
              </div>
            </div>

            <Link href="#contact" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              Start Visualizing Your Org
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}