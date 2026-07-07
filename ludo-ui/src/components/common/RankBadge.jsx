// RankBadge.jsx

import { Crown, Medal } from "lucide-react";

export default function RankBadge({ rank = 1 }) {
  const styles = {
    1: {
      bg: "from-yellow-300 via-yellow-400 to-amber-500",
      icon: <Crown size={22} className="text-yellow-950" />,
      text: "text-yellow-950",
      label: "1st",
    },
    2: {
      bg: "from-slate-200 via-slate-300 to-slate-400",
      icon: <Medal size={22} className="text-slate-800" />,
      text: "text-slate-900",
      label: "2nd",
    },
    3: {
      bg: "from-amber-500 via-amber-600 to-orange-700",
      icon: <Medal size={22} className="text-white" />,
      text: "text-white",
      label: "3rd",
    },
    4: {
      bg: "from-slate-600 via-slate-700 to-slate-800",
      icon: null,
      text: "text-white",
      label: "4th",
    },
  };

  const style = styles[rank];

  return (
    <div
      className={`
        inline-flex items-center gap-2
        rounded-2xl
        bg-gradient-to-r ${style.bg}
        px-5 py-2.5
        shadow-xl ring-1 ring-white/10
      `}
    >
      {style.icon}

      <span className={`text-base font-bold tracking-wide ${style.text}`}>
        {style.label}
      </span>
    </div>
  );
}