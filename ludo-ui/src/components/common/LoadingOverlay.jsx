import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ loading, text }) {
    if (!loading) return null;
    if (!loading) text = "Loading...";

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
            {/* Blur + Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Loading Card */}
            <div className="relative flex flex-col items-center gap-4 bg-transparent px-10 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-violet-400" />

                <p className="text-lg font-medium text-white">
                    {text}
                </p>
            </div>
        </div>
    );
}