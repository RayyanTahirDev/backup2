"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrganizationPage({ params }) {
  const { id } = React.use(params);

  const router = useRouter();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrg = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }
        // FIXED: Correct API route
        const res = await fetch(`/api/organization/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch organization");
        }
        const data = await res.json();
        setOrg(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrg();
  }, [id, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-600">
        Error: {error}
      </div>
    );
  if (!org)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        No organization found.
      </div>
    );

  // Split details into two columns
  const leftDetails = [
    { label: "CEO", value: org.ceoName },
    { label: "CEO Email", value: org.email },
    { label: "Company Size", value: org.companySize },
    { label: "Location", value: `${org.city}, ${org.country}` },
    { label: "Year Founded", value: org.yearFounded },
  ];
  const rightDetails = [
    { label: "Type", value: org.organizationType },
    { label: "Offices", value: org.numberOfOffices },
    { label: "HR Tools Used", value: org.hrToolsUsed },
    { label: "Hiring Level", value: org.hiringLevel },
    { label: "Work Model", value: org.workModel },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-black px-4 py-10">
      <div className="w-full flex justify-start mb-8">
        <Link
          href="/chart"
          className="inline-flex items-center text-gray-600 hover:text-black font-medium group transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Organization Chart
        </Link>
      </div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          {org.name}
        </h1>
        <div className="text-xl font-semibold text-gray-700 mb-6">
          {org.industry}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="py-2">
            {leftDetails.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
          <div className="py-2">
            {rightDetails.map((item) => (
              <InfoRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 py-3">
      <span className="w-40 text-gray-500 font-medium">{label}:</span>
      <span className="text-black text-base">{value}</span>
    </div>
  );
}
