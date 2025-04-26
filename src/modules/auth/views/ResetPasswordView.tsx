
export default function ResetPasswordView() {
    return (
        <>
            <h1 className="text-4xl font-bold text-white">
                Restablecer Contraseña
            </h1>

            <p className="text-xl font-medium text-purple-100 mt-2">
                Restablece tu contraseña llenando el siguiente formulario.
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

                <div className="block space-y-2">
                    <label htmlFor="password" className="text-xl text-gray-600 block w-full">
                        Tu Contraseña:
                    </label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
                    />
                </div>

                <div className="block space-y-2">
                    <label htmlFor="password_confirmation" className="text-xl text-gray-600 block w-full">
                        Repite Tu Contraseña:
                    </label>

                    <input
                        type="password"
                        id="password_confirmation"
                        placeholder="Repite Tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
                    />
                </div>

                <input
                    type="submit"
                    value="Cambiar Contraseña"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 cursor-pointer transition-colors block w-full text-center"
                />
            </form>
        </>
    )
}
