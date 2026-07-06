// CopyText.jsx
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyText({ text, label = "Room ID" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full rounded-xl border border-slate-700 bg-slate-800 p-1.5 shadow-lg">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="flex items-center justify-between gap-3">
        <span className="truncate font-mono text-base font-semibold text-white">
          {text}
        </span>

        <button
          onClick={handleCopy}
          className={`flex h-8 w-10 items-center justify-center rounded-lg transition-all duration-200 ${
            copied
              ? "bg-emerald-500 text-white"
              : "bg-slate-700 text-slate-200 hover:bg-slate-600"
          }`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
}