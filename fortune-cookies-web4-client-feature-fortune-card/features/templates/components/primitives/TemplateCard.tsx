import { Template } from "../../api/templates";

export function TemplateCard({
  template,
  index,
}: {
  template: Template;
  index: number;
}) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">✨</span>
        <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
          #{index + 1}
        </span>
      </div>

      <p className="text-gray-800 italic leading-relaxed">"{template.text}"</p>

      <div className="mt-4 pt-4 border-t border-purple-200">
        <p className="text-xs text-gray-500">
          Created: {new Date(template.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
