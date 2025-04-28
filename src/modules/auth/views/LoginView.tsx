import useApp from "@/hooks/useApp";
import ErrorMessage from "@/modules/app/components/ErrorMessage";
import AuthService from "@/services/AuthService";
import { UserLoginForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import FormContainer from "../components/FormContainer";
import InputContainer from "@/modules/app/components/InputContainer";
import LabelInput from "@/modules/app/components/LabelInput";

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
            <Heading>
                Iniciar Sesión
            </Heading>

            <Subheading>
                Inicia sesión y comienza a disfrutar de nuestra plataforma.
            </Subheading>

            <FormContainer onSubmit={handleSubmit(handleLoginUser)}>
                <InputContainer>
                    <LabelInput htmlFor="email">
                        Tu Email:
                    </LabelInput>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register('email', {
                            required: "El email es requerido",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El email no es válido",
                            }
                        })}
                    />

                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <LabelInput htmlFor="password">
                        Tu Contraseña:
                    </LabelInput>

                    <input
                        type="password"
                        id="password"
                        placeholder="Tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("password", {
                            required: "La contraseña es requerida",
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </InputContainer>

                <input
                    disabled={isPending}
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed"
                />
            </FormContainer>

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
