import { HashLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <HashLoader size={64} color="#2563eb" />
      <p className="mt-4 text-gray-600 font-semibold text-lg">Cargando</p>
    </div>
  );
}
