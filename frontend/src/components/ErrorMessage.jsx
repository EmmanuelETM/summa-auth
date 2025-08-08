import { AlertCircle } from "lucide-react";

const bgColors = {
  error: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-200 text-yellow-800 border-yellow-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

export function ErrorMessage({
  message = "Ocurrió un error inesperado.",
  type = "error",
  icon = <AlertCircle className="w-6 h-6 mr-2" />,
  children,
}) {
  return (
    <div
      className={`flex items-center justify-between border-2 gap-4 p-6 my-6 rounded-lg text-base font-medium ${bgColors[type]}`}
    >
      <div className="flex items-center">
        {icon}
        <span>{message}</span>
      </div>
      {children && <div className="ml-auto">{children}</div>}
    </div>
  );
}
