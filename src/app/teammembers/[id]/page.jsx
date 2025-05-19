"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function TeamMemberPage({ params }) {
  const { id } = params; // Correctly destructure params

  const router = useRouter();
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const res = await fetch(`/api/teammembers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch team member");
        }
        const data = await res.json();
        setTeamMember(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTeamMember();
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
  if (!teamMember)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        No team member found.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-white text-black px-4 py-10 max-w-3xl mx-auto">
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

      {/* Main Content */}
      <div>
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
          {teamMember.name}
        </h1>
        <div className="text-xl font-semibold text-gray-700 mb-6">
          {teamMember.role}
        </div>
        <div className="space-y-3 divide-y divide-gray-200">
          <InfoRow label="Email" value={teamMember.email} />
          <InfoRow label="Reports To" value={teamMember.reportTo || "-"} />
          <InfoRow
            label="Organization"
            value={teamMember.organization?.name || "N/A"}
          />
          <InfoRow
            label="Department"
            value={teamMember.department?.departmentName || "N/A"}
          />
          {teamMember.subfunctionName && (
            <InfoRow label="Subfunction" value={teamMember.subfunctionName} />
          )}
          <InfoRow
            label="Invited"
            value={
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                  teamMember.invited
                    ? "bg-gray-100 text-gray-900 border-gray-300"
                    : "bg-gray-50 text-gray-400 border-gray-200"
                }`}
              >
                {teamMember.invited ? "Yes" : "No"}
              </span>
            }
          />
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
