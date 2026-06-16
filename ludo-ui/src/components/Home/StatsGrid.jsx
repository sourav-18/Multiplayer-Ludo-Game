import StatsCard from "./StatsCard";

function StatsGrid() {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4">

      <StatsCard
        value="2-4"
        label="Players"
      />

      <StatsCard
        value="∞"
        label="Rooms"
      />

      <StatsCard
        value="24/7"
        label="Online"
      />

    </div>
  );
}

export default StatsGrid;