import { safeFetch } from "@/features/lib/apiClient";

export type Template = {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

// Get All Templates
export async function getTemplates(): Promise<Template[]> {
  return safeFetch<Template[]>("/", { method: "GET" });
}

export async function createTemplate(text: string): Promise<Template> {
  return safeFetch<Template>("/create", {
    method: "POST",
    body: JSON.stringify(text),
  });
}
