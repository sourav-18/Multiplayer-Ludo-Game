function StatsCard({
  value,
  label,
}) {
  return (
    <div className="rounded-xl bg-white/5 p-5">

      <h2 className="text-3xl font-black">
        {value}
      </h2>

      <p className="mt-2 text-gray-400">
        {label}
      </p>

    </div>
  );
}

export default StatsCard;