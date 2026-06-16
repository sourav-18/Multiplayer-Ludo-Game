const COLORS = [
  {
    id: "red",
    color: "#E63946",
  },
  {
    id: "green",
    color: "#2DC653",
  },
  {
    id: "yellow",
    color: "#F4C430",
  },
  {
    id: "blue",
    color: "#4A90E2",
  },
];

function ColorPicker({
  value,
  onChange,
}) {
  return (
    <div className="flex gap-4 justify-center">
      {COLORS.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`h-12 w-12 rounded-full transition-all duration-300
          ${
            value === item.id
              ? "ring-4 ring-white scale-110"
              : "hover:scale-105"
          }`}
          style={{
            background: item.color,
          }}
        />
      ))}
    </div>
  );
}

export default ColorPicker;