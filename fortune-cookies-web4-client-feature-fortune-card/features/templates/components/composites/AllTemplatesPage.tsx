"use client";

import Link from "next/link";

import { TemplateCard } from "../primitives/TemplateCard";
import { useTemplates } from "../../api/useTempaltes";
import { TemplatesSkeleton } from "@/features/common/components/skeletons/TemplatesSkeleton";

export default function AllTemplatesPage() {
  const { data, isLoading } = useTemplates();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Top buttons */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/"
            className="text-white flex items-center gap-2 hover:underline"
          >
            ← Back to Home
          </Link>

          <Link
            href="/create"
            className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            + Create New
          </Link>
        </div>

        {/* Main box */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Fortune Templates
            </h1>
            <p className="text-gray-600">
              All available fortune messages in the collection
            </p>
          </div>

          {isLoading ? (
            <TemplatesSkeleton />
          ) : data && data.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 mb-4">No templates found</p>

              <Link
                href="/create"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Create First Template
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data?.map((template, index) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  index={index}
                />
              ))}
            </div>
          )}

          {!isLoading && data && (
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Total Templates:{" "}
                <span className="font-bold text-purple-600">{data.length}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
