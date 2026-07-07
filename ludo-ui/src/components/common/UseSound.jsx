
import { useRef } from "react";

export default function UseSound(src) {
  const audioRef = useRef(new Audio(src));

  const play = () => {
    const audio = audioRef.current;
    audio.currentTime = 0; // Restart from beginning
    audio.play().catch(() => {});
  };

  return play;
}