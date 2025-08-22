export function Button({
  Icon,
  text,
  onClick,
  variant = "primary",
  className,
  disabled = false,
}) {
  const buttonVariants = {
    primary: `text-white hover:bg-sky-600 transition-colors cursor-pointer ${
      disabled ? "bg-sky-600 cursor-not-allowed" : "bg-sky-700 hover:bg-sky-600"
    }`,
    secondary:
      "border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-100 transition-colors",
    link: " text-sky-600 hover:underline cursor-pointer",
    danger: "bg-red-600 text-white shadow hover:bg-red-700 transition-colors",
  };
  return (
    <button
      className={`p-2 rounded-lg font-medium  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${buttonVariants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {text && text}
    </button>
  );
}
