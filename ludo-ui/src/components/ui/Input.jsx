function Input({
  label,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-gray-300">
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          rounded-xl
          border
          border-[#2A2A40]
          bg-[#151526]
          px-4
          py-3
          outline-none
          transition
          focus:border-yellow-400
          ${className}
        `}
        {...props}
      />
    </div>
  );
}

export default Input;