import { HashLoader } from "react-spinners";

function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <HashLoader size={64} color="#0369a1" />
      <p className="mt-4 text-gray-600 font-semibold text-lg">Cargando</p>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-32 w-full text-gray-600 text-lg font-medium animate-pulse">
      <span className="flex flex-col items-center justify-center gap-2">
        <HashLoader size={64} color="#0369a1" />
        Cargando...
      </span>
    </div>
  );
}

function LoadingIcon() {
  return (
    <div className="flex flex-col items-center animate-pulse my-4">
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
      <div className="w-40 h-6 bg-gray-300 rounded mb-6" />
    </div>
  );
}

export { Loading, LoadingPage, LoadingIcon };
