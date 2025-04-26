import { Link } from "react-router";

export default function ForgotPasswordView() {
    return (
        <>
            <h1 className="text-4xl font-bold text-white">
                Recuperar Contraseña
            </h1>

            <p className="text-xl font-medium text-purple-100 mt-2">
                Recupera tu contraseña llenando el siguiente formulario, y sigue las instrucciones.
            </p>

            <form className="mt-10 space-y-4 p-8 bg-white">
                <div className="block space-y-2">
                    <label htmlFor="email" className="text-xl text-gray-600 block w-full">
                        Tu Email:
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
                    />
                </div>

                <input
                    type="submit"
                    value="Enviar"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 cursor-pointer transition-colors block w-full text-center"
                />
            </form>

            <nav className="flex gap-6 justify-between items-center mt-10 flex-col lg:flex-row">
                <Link to="/login" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

                <Link to="/register" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿No tienes una cuenta? Registrate
                </Link>
            </nav>
        </>
    )
}
