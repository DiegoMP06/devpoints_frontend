import useApp from "@/hooks/useApp";
import ErrorMessage from "@/modules/app/components/ErrorMessage";
import InputContainer from "@/modules/app/components/InputContainer";
import LabelInput from "@/modules/app/components/LabelInput";
import AuthService from "@/services/AuthService";
import { UserRegisterForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import FormContainer from "../components/FormContainer";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";

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
            <Heading>
                Crear Cuenta
            </Heading>

            <Subheading>
                Crea una cuenta y comienza a disfrutar de nuestra plataforma.
            </Subheading>

            <FormContainer
                onSubmit={handleSubmit(handleRegisterUser)}
            >
                <InputContainer>
                    <LabelInput htmlFor="name">
                        Tu Nombre:
                    </LabelInput>

                    <input
                        type="text"
                        id="name"
                        placeholder="Tu Nombre"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("name", { required: "El nombre es requerido" })}
                    />

                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <LabelInput htmlFor="email">
                        Tu Email:
                    </LabelInput>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("email", {
                            required: "El email es requerido",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El email no es válido",
                            },
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
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres",
                            },
                        })}
                    />

                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <LabelInput htmlFor="password_confirmation">
                        Repite Tu Contraseña:
                    </LabelInput>

                    <input
                        type="password"
                        id="password_confirmation"
                        placeholder="Repite Tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("password_confirmation", {
                            required: "La confirmación de la contraseña es requerida",
                            validate: (value) => value === password || "Las contraseñas no coinciden",
                        })}
                    />

                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </InputContainer>

                <input
                    disabled={isPending}
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed"
                />
            </FormContainer>

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
