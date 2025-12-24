"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import toast from "react-hot-toast";
import { useCreateTemplate } from "../../api/useCreateTemplates";

const schema = z.object({
  text: z
    .string()
    .min(1, "Please enter fortune text")
    .max(500, "Max 500 characters"),
});

type FormData = z.infer<typeof schema>;

export default function CreateTemplatePage() {
  const { register, handleSubmit, reset, watch, formState } = useForm<FormData>(
    {
      resolver: zodResolver(schema),
      defaultValues: { text: "" },
    }
  );
  const { errors } = formState;

  const createTemplateMutation = useCreateTemplate();

  const onSubmit = async (data: FormData) => {
    try {
      await createTemplateMutation.mutateAsync(data.text);
      toast.success("Fortune template created successfully! 🎉");
      reset();
    } catch (err) {
      toast.error("Failed to create fortune template");
      console.error(err);
    }
  };

  // Watch text field for character count
  const textValue = watch("text");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="max-w-3xl mx-auto pt-8">
        <Link
          href="/"
          className="text-white mb-6 flex items-center gap-2 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Create Fortune Template
            </h1>
            <p className="text-gray-600">Add a new fortune to the collection</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Fortune Text
              </label>
              <textarea
                {...register("text")}
                placeholder="Enter your fortune message..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              {errors.text && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.text.message}
                </p>
              )}
              <p
                className={`text-sm text-gray-500 mt-2 ${
                  textValue?.length > 500 && "text-red-500"
                }`}
              >
                {textValue?.length ?? 0} characters
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Create Fortune Template
              </button>
              <Link
                href="/templates"
                className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                View Templates
              </Link>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">💡 Tips:</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Keep it positive and inspiring</li>
              <li>• Make it universal and relatable</li>
              <li>• Add emojis for extra charm ✨</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
