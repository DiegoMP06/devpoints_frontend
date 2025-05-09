import InputContainer from "@/modules/app/components/InputContainer";
import FormContainer from "../components/FormContainer";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import LabelInput from "@/modules/app/components/LabelInput";
import { ResetPasswordForm } from "@/types";
import { useLocation, useNavigate, useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import { toast } from "react-toastify";
import ErrorMessage from "@/modules/app/components/ErrorMessage";

export default function ResetPasswordView() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = params.token || '';
    const email = queryParams.get('email') || '';

    const initialValues: ResetPasswordForm = {
        token,
        email,
        password: "",
        password_confirmation: "",
    }

    const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: initialValues });

    const password = watch("password");

    const { mutate, isPending } = useMutation({
        mutationFn: AuthService.resetPassword,
        onSuccess(data) {
            toast.success(data);
            navigate('/login');
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleResetPassword: SubmitHandler<ResetPasswordForm> = (data) =>
        mutate(data);

    return (
        <>
            <Heading>
                Restablecer Contraseña
            </Heading>

            <Subheading>
                Restablece tu contraseña llenando el siguiente formulario.
            </Subheading>

            <FormContainer onSubmit={handleSubmit(handleResetPassword)}>
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
                    type="submit"
                    value="Cambiar Contraseña"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center disabled:opacity-25 disabled:cursor-not-allowed"
                    disabled={isPending}
                />
            </FormContainer>
        </>
    )
}
