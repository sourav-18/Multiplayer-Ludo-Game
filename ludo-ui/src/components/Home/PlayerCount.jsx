function PlayerCount({
  value,
  onChange,
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {[2, 3, 4].map((count) => (
        <button
          key={count}
          onClick={() => onChange(count)}
          className={`rounded-xl py-3 font-bold transition
          ${
            value === count
              ? "bg-yellow-400 text-black"
              : "bg-[#23233B]"
          }`}
        >
          {count} Players
        </button>
      ))}
    </div>
  );
}

export default PlayerCount;