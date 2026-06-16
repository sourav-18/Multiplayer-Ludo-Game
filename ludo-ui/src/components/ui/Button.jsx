import clsx from "clsx";

const variants = {
  primary:
    "bg-gradient-to-r from-yellow-500 to-yellow-400 text-black hover:scale-105",
  secondary:
    "bg-[#23233B] border border-[#2A2A40] hover:border-yellow-400",
  danger:
    "bg-gradient-to-r from-red-600 to-red-500 hover:scale-105",
};

function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        "rounded-xl px-6 py-3 font-semibold transition-all duration-300 shadow-lg",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;