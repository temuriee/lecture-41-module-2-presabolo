"use client";

import { Fortune } from "../../types/fortuneTypes";

type Props = {
  fortune: Fortune;
  name: string;
  setName: (v: string) => void;
  onSave: () => void;
  onNew: () => void;
  isSaved: boolean;
  saveLoading: boolean;
};

export function FortuneCard({
  fortune,
  name,
  setName,
  onSave,
  onNew,
  isSaved,
  saveLoading,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Fortune text */}
      <div className="text-center">
        <div className="text-6xl mb-4">✨</div>
        <p className="text-2xl text-gray-800 font-medium italic leading-relaxed">
          "{fortune.text}"
        </p>
      </div>

      <div className="border-t pt-6 min-h-[110px]">
        {/* Saved state (no input) */}
        {isSaved ? (
          <div className="p-4 rounded-lg bg-green-100 text-green-700 font-semibold text-center">
            This fortune has been saved! 🎉
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Save this fortune with your name:
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />

              <button
                onClick={onSave}
                disabled={saveLoading}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
              >
                {saveLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onNew}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
      >
        Generate Another Fortune
      </button>
    </div>
  );
}
