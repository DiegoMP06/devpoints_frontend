import { Link } from "react-router";

export default function NotFoundView() {
    return (
        <>
            <h1 className="text-4xl font-black text-gray-600 text-center mt-20">
                Pagina no encontrada
            </h1>

            <p className="text-xl font-bold text-gray-400 text-center max-w-xl mx-auto mt-4">
                La pagina que estas buscando no existe. Si deseas ir al inicio, puedes hacerlo <Link className="text-cyan-700" to="/">aqui.</Link>
            </p>
        </>
    )
}
