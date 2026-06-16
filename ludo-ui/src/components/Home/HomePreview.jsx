import { FaDice } from "react-icons/fa";

function HomePreview() {
  return (
    <div className="relative flex items-center justify-center">

      <div className="grid h-[500px] w-[500px] place-items-center rounded-[40px] border border-white/10 bg-[#1A1A2E] shadow-2xl">

        <FaDice
          size={120}
          className="text-yellow-400"
        />

      </div>

    </div>
  );
}

export default HomePreview;