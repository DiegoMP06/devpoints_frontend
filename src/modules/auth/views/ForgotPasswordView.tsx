import { Link } from "react-router";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import FormContainer from "../components/FormContainer";
import InputContainer from "@/modules/app/components/InputContainer";
import LabelInput from "@/modules/app/components/LabelInput";
import { ForgotPasswordForm } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "@/modules/app/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: "",
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: AuthService.forgotPassword,
        onSuccess(data) {
            toast.success(data);
            reset();
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    const handleForgotPassword: SubmitHandler<ForgotPasswordForm> = (data) =>
        mutate(data);

    return (
        <>
            <Heading>
                Recuperar Contraseña
            </Heading>

            <Subheading>
                Recupera tu contraseña llenando el siguiente formulario, y sigue las instrucciones.
            </Subheading>

            <FormContainer onSubmit={handleSubmit(handleForgotPassword)}>
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
                                message: "El email no es valido",
                            },
                        })}
                    />

                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </InputContainer>

                <input
                    type="submit"
                    value="Enviar"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed"
                    disabled={isPending}
                />
            </FormContainer>

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
