"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function CeoPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [ceo, setCeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("education");

  useEffect(() => {
    const fetchCeo = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const res = await fetch(`/api/organization/ceo?id=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch CEO");
        }
        const data = await res.json();
        setCeo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCeo();
  }, [id, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-600">
        Error: {error}
      </div>
    );
  if (!ceo)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        No CEO found.
      </div>
    );

  const skills = [
    { id: 1, name: "React", proficiency: 4, category: "Frontend" },
    { id: 2, name: "Tailwind CSS", proficiency: 5, category: "Frontend" },
    { id: 3, name: "Node.js", proficiency: 3, category: "Backend" },
    { id: 4, name: "PostgreSQL", proficiency: 4, category: "Database" },
    { id: 5, name: "TypeScript", proficiency: 4, category: "Languages" },
  ];

  const education = [
    {
      id: 1,
      institution: "Tech University",
      degree: "BSc Computer Science",
      location: "New York, USA",
      startDate: "2015",
      endDate: "2019",
      gpa: "3.8",
    },
  ];

  const experience = [
    {
      id: 1,
      company: "Innovate Corp",
      position: "Senior Developer",
      location: "San Francisco, CA",
      startDate: "2020",
      endDate: "Present",
      current: true,
      responsibilities: [
        "Lead frontend team",
        "Implemented design systems",
        "Mentored junior devs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/chart"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium group transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Organization Chart
        </Link>
      </div>

      {/* Gradient Profile Header with subtle grey */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl overflow-hidden p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            {ceo.name[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{ceo.name}</h1>
            <p className="text-sm text-gray-700 font-medium">Chief Executive Officer</p>
            <div className="flex flex-wrap text-sm text-gray-600 gap-4 mt-2">
              <span>{ceo.email}</span>
              <span>{ceo.organization}</span>
              <span>{ceo.industry}</span>
              <span className="font-medium">
                Report To: <span className="font-normal">-</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex justify-center sm:justify-start gap-4">
          {["education", "experience", "skills"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gray-700 text-white shadow-md"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "education" && (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-700 text-sm">
                {edu.institution} — {edu.location}
              </p>
              <p className="text-gray-500 text-sm">
                {edu.startDate} - {edu.endDate}
              </p>
              {edu.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {activeTab === "experience" && (
        <div className="space-y-4">
          {experience.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                {job.current && (
                  <span className="text-xs text-white bg-gray-700 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm">
                {job.company} — {job.location}
              </p>
              <p className="text-gray-500 text-sm">
                {job.startDate} - {job.endDate}
              </p>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "skills" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="relative group bg-gradient-to-br from-gray-200 to-gray-300 border border-gray-300 rounded-xl p-5 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative mb-3">
                <svg className="w-16 h-16">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="176"
                    strokeDashoffset={176 - (176 * skill.proficiency) / 5}
                    className="text-gray-700 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-semibold text-gray-800 text-lg">
                  {skill.proficiency}/5
                </div>
              </div>
              <h3 className="text-md font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                {skill.name}
              </h3>
              <span className="text-xs text-gray-600">{skill.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
