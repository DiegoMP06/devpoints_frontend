import useApp from "@/hooks/useApp";
import ErrorMessage from "@/modules/app/components/ErrorMessage";
import AuthService from "@/services/AuthService";
import { UserLoginForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function LoginView() {
    const { mutateAuth } = useApp();
    const navigate = useNavigate();
    const initialValues: UserLoginForm = {
        email: '',
        password: ''
    };
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: AuthService.login,
        onSuccess(data) {
            mutateAuth(data);
            navigate('/dashboard');
        },
        onError(error) {
            toast.error(error.message)
        }
    });

    const handleLoginUser: SubmitHandler<UserLoginForm> = (data) =>
        mutate(data);

    return (
        <>
            <h1 className="text-4xl font-bold text-white">
                Iniciar Sesión
            </h1>

            <p className="text-xl font-medium text-purple-100 mt-2">
                Inicia sesión y comienza a disfrutar de nuestra plataforma.
            </p>

            <form className="mt-10 space-y-4 p-8 bg-white" onSubmit={handleSubmit(handleLoginUser)}>
                <div className="block space-y-2">
                    <label htmlFor="email" className="text-xl text-gray-600 block w-full">
                        Tu Email:
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
                        {...register('email', {
                            required: "El email es requerido",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El email no es válido",
                            }
                        })}
                    />

                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
                        {...register("password", {
                            required: "La contraseña es requerida",
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <input
                    disabled={isPending}
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed"
                />
            </form>

            <nav className="flex gap-6 justify-between items-center mt-10 flex-col lg:flex-row">
                <Link to="/register" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿No tienes una cuenta? Registrate
                </Link>

                <Link to="/forgot-password" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿Olvidaste tu contraseña? Recuperala
                </Link>
            </nav>
        </>
    )
}
