import GlassCard from "../ui/GlassCard";

function FeatureCard({
  title,
  subtitle,
}) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {subtitle}
      </p>
    </GlassCard>
  );
}

export default FeatureCard;