import Token from "./Token";

function HomeBase({
  color,
}) {
  return (
    <div
      className="grid h-full w-full grid-cols-2 gap-5 rounded-xl p-5"
      style={{
        background: color,
      }}
    >
      <Token color="white" />
      <Token color="white" />
      <Token color="white" />
      <Token color="white" />
    </div>
  );
}

export default HomeBase;