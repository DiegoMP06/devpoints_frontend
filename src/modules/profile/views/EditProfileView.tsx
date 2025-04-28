import useApp from "@/hooks/useApp";
import ErrorMessage from "@/modules/app/components/ErrorMessage";
import InputContainer from "@/modules/app/components/InputContainer";
import LabelInput from "@/modules/app/components/LabelInput";
import FormContainer from "@/modules/auth/components/FormContainer";
import Heading from "@/modules/dashboard/components/Heading";
import SubmitForm from "@/modules/dashboard/components/SubmitForm";
import ProfileService from "@/services/ProfileService";
import { EditProfileFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditProfileView() {
    const { mutateAuth, user } = useApp();
    const initialValues: EditProfileFormData = {
        name: user?.name || '',
        email: user?.email || '',
    }

    const { handleSubmit, register, formState: { errors }, getValues } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: ProfileService.editProfile,
        onSuccess(data) {
            mutateAuth({
                ...user!,
                name: getValues('name'),
                email: getValues('email'),
            })
            toast.success(data)
        },
        onError(error) {
            toast.error(error.message)
        }
    });

    const handleEditProfile: SubmitHandler<EditProfileFormData> = (data) =>
        mutate(data)

    return (
        <>
            <Heading className="max-w-2xl mx-auto mt-10">
                Editar Perfil
            </Heading>

            <FormContainer className="max-w-2xl mx-auto" onSubmit={handleSubmit(handleEditProfile)}>
                <InputContainer>
                    <LabelInput>
                        Nombre:
                    </LabelInput>

                    <input
                        type="text"
                        placeholder="Tu Nombre"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                        {...register("name", { required: "El nombre es requerido" })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </InputContainer>

                <InputContainer>
                    <LabelInput>
                        Email:
                    </LabelInput>

                    <input
                        type="email"
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

                <SubmitForm
                    value="Guardar Cambios"
                    disabled={isPending}
                />
            </FormContainer>
        </>
    )
}
