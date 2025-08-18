import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100 px-6 py-12">
      <div className="absolute top-4 left-4">
        <img src="/summasoft.svg" alt="Logo SummaSoft" className="w-48" />
      </div>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl font-semibold text-zinc-800 mb-2">
          Página no encontrada
        </p>
        <p className="text-zinc-600 mb-6">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
