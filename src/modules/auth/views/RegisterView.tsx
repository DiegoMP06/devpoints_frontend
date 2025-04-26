import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import ErrorMessage from "@/modules/app/components/ErrorMessage";
import AuthService from "@/services/AuthService";
import { UserRegisterForm } from "@/types";
import useApp from "@/hooks/useApp";

export default function RegisterView() {
    const { mutateAuth } = useApp();
    const navigate = useNavigate();
    const initialValues: UserRegisterForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: AuthService.register,
        onSuccess: (data) => {
            mutateAuth(data);
            navigate('/email/verification-notification')
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    const password = watch("password");

    const handleRegisterUser: SubmitHandler<UserRegisterForm> = (data) =>
        mutate(data);

    return (
        <>
            <h1 className="text-4xl font-bold text-white">
                Crear Cuenta
            </h1>

            <p className="text-xl font-medium text-purple-100 mt-2">
                Crea una cuenta y comienza a disfrutar de nuestra plataforma.
            </p>

            <form
                className="mt-10 space-y-4 p-8 bg-white"
                onSubmit={handleSubmit(handleRegisterUser)}
            >
                <div className="block space-y-2">
                    <label htmlFor="name" className="text-xl text-gray-600 block w-full">
                        Tu Nombre:
                    </label>

                    <input
                        type="text"
                        id="name"
                        placeholder="Tu Nombre"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
                        {...register("name", { required: "El nombre es requerido" })}
                    />

                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="block space-y-2">
                    <label htmlFor="email" className="text-xl text-gray-600 block w-full">
                        Tu Email:
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
                        {...register("email", {
                            required: "El email es requerido",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El email no es válido",
                            },
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
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres",
                            },
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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
                        {...register("password_confirmation", {
                            required: "La confirmación de la contraseña es requerida",
                            validate: (value) => value === password || "Las contraseñas no coinciden",
                        })}
                    />

                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <input
                    disabled={isPending}
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed"
                />
            </form>

            <nav className="flex gap-6 justify-between items-center mt-10 flex-col lg:flex-row">
                <Link to="/login" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

                <Link to="/forgot-password" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿Olvidaste tu contraseña? Recuperala
                </Link>
            </nav>
        </>
    )
}
