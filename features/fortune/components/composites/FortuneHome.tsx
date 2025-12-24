"use client";

import toast from "react-hot-toast";

import SaveForm from "../primitives/SaveForm";
import { useState } from "react";

import { FortuneCard } from "../primitives/FortuneCard";
import { useRandomFortune, useSaveFortune } from "../../api/useFortunes";
import { Skeleton } from "@/features/common/components/skeletons/Skeleton";

export default function FortuneHome() {
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const randomFortune = useRandomFortune();
  const saveFortune = useSaveFortune();

  const generate = () => {
    setIsSaved(false); // reset saved state
    randomFortune.refetch();
  };

  const onSave = () => {
    if (!randomFortune.data) return;
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    saveFortune.mutate(
      { name, text: randomFortune.data.text },
      {
        onSuccess: () => {
          toast.success("Saved! 🎉");
          setIsSaved(true);
          setName("");
        },
        onError: () => toast.error("Failed to save fortune"),
      }
    );
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            🔮 Fortune Cookie
          </h1>
          <p className="text-white text-lg opacity-90">
            Discover your destiny with a click
          </p>
        </div>

        <div className="bg-white p-8 shadow-2xl rounded-3xl">
          {/* Initial state: no fortune */}
          {!randomFortune.data ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🥠</div>

              <button
                onClick={generate}
                disabled={randomFortune.isLoading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
              >
                {randomFortune.isLoading ? "Generating..." : "Generate Fortune"}
              </button>
            </div>
          ) : (
            <>
              {randomFortune.isFetching ? (
                <Skeleton className="w-full h-[180px] rounded-xl" />
              ) : (
                <FortuneCard
                  fortune={randomFortune.data}
                  name={name}
                  setName={setName}
                  onSave={onSave}
                  onNew={generate}
                  isSaved={isSaved}
                  saveLoading={saveFortune.isPending}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
