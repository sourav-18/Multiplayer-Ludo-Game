import FeatureCard from "./FeatureCard";

function FeatureGrid() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2">

      <FeatureCard
        title="Realtime"
        subtitle="Fast socket gameplay."
      />

      <FeatureCard
        title="Private Rooms"
        subtitle="Invite only your friends."
      />

      {/* <FeatureCard
        title="Smooth Animation"
        subtitle="Premium experience."
      /> */}

    </div>
  );
}

export default FeatureGrid;