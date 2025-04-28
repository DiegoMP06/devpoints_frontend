import ErrorMessage from "@/modules/app/components/ErrorMessage";
import InputContainer from "@/modules/app/components/InputContainer";
import LabelInput from "@/modules/app/components/LabelInput";
import FormContainer from "@/modules/auth/components/FormContainer";
import Heading from "@/modules/dashboard/components/Heading";
import SubmitForm from "@/modules/dashboard/components/SubmitForm";
import ProfileService from "@/services/ProfileService";
import { EditPasswordFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
    const initialValues: EditPasswordFormData = {
        password: '',
        password_confirmation: '',
        current_password: '',
    }

    const { handleSubmit, register, formState: { errors }, reset, watch } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: ProfileService.editPassword,
        onSuccess(data) {
            reset();
            toast.success(data)
        },
        onError(error) {
            toast.error(error.message)
        }
    });

    const password = watch('password');

    const handleEditPassword: SubmitHandler<EditPasswordFormData> = (data) =>
        mutate(data)

    return (
        <>
            <Heading className="max-w-2xl mx-auto mt-10">
                Cambiar Contraseña
            </Heading>

            <FormContainer onSubmit={handleSubmit(handleEditPassword)} className="max-w-2xl mx-auto">
                <InputContainer>
                    <LabelInput>
                        Contraseña Actual:
                    </LabelInput>

                    <input
                        type="password"
                        placeholder="Tu Contraseña Actual"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("current_password", {
                            required: "La contraseña es requerida",
                        })}
                    />

                    {errors.current_password && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <LabelInput>
                        Contraseña Nueva:
                    </LabelInput>

                    <input
                        type="password"
                        placeholder="Tu Contraseña Nueva"
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
                    <LabelInput>
                        Repetir Contraseña:
                    </LabelInput>

                    <input
                        type="password"
                        placeholder="Repite tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("password_confirmation", {
                            required: "La confirmación de la contraseña es requerida",
                            validate: (value) => value === password || "Las contraseñas no coinciden",
                        })}
                    />


                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </InputContainer>

                <SubmitForm
                    value="Guardar Cambios"
                    disabled={isPending}
                />
            </FormContainer>
        </>
    )
}
