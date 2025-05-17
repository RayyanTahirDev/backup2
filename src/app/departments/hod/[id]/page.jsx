"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DepartmentPage({ params }) {
  const { id } = React.use(params);

  const router = useRouter();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const res = await fetch(`/api/departments/hod/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch department");
        }
        const data = await res.json();
        setDepartment(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDepartment();
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
  if (!department)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        No department found.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-white text-black px-4 py-10">
      {/* Back link pinned to the extreme left */}
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

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          {department.hodName}
        </h1>
        <div className="text-xl font-semibold text-gray-700 mb-6">
          {department.role}
        </div>
        <div className="space-y-0.5 divide-y divide-gray-200">
          <InfoRow label="Email" value={department.hodEmail} />
          <InfoRow label="Reports To" value="CEO" />
          <InfoRow
            label="Organization"
            value={department.organization?.name || "N/A"}
          />
          <InfoRow label="Department" value={department.departmentName} />
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
