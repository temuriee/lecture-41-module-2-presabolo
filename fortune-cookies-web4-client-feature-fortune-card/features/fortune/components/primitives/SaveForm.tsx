"use client";

// ალტერნატიული გზა, რომელსაც არ ვიყენებთ
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SavedFortuneSchema,
  savedFortuneSchema,
} from "../../schemas/fortuneSchema";

import toast from "react-hot-toast";
import { useSaveFortune } from "../../api/useFortunes";

const SaveForm = ({ text }: { text: string }) => {
  const form = useForm<SavedFortuneSchema>({
    resolver: zodResolver(savedFortuneSchema),
    defaultValues: {
      name: "",
      text,
    },
  });

  const mutation = useSaveFortune();

  const onSubmit = (values: SavedFortuneSchema) => {
    mutation.mutate(values, {
      onSuccess: () => {
        toast.success(`Fortune saved for ${values.name}!`);
        form.reset({ name: "", text });
      },
      onError: () => toast.error("Failed to save fortune"),
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-6 bg-white p-5 rounded-xl shadow space-y-4"
    >
      <label className="block text-gray-700 font-medium">
        Enter your name:
      </label>
      <input
        {...form.register("name")}
        className="w-full p-3 border rounded-lg"
        placeholder="Your name"
      />
      {form.formState.errors.name && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.name.message}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
      >
        {mutation.isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default SaveForm;
