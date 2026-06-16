function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-[#2A2A40]
        bg-[#1A1A2E]
        shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;