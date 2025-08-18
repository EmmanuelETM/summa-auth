const badgeColor = {
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  blue: "bg-sky-100 text-sky-800",
};

export function Badge({ text, color = "green", Icon }) {
  const colorClasses = badgeColor[color] || badgeColor.green;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${colorClasses}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </span>
  );
}
