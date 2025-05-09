import type { ContestFormData } from "@/types";
import InputContainer from "app/components/InputContainer";
import LabelInput from "app/components/LabelInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "@/modules/app/components/ErrorMessage";

type ContestFormProps = {
    register: UseFormRegister<ContestFormData>
    errors: FieldErrors<ContestFormData>
    image?: string;
}

export default function ContestForm({ register, errors, image }: ContestFormProps) {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    return (
        <>
            <InputContainer>
                <LabelInput htmlFor="name">
                    Nombre de la Competencia:
                </LabelInput>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre de la Competencia"
                    className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    {...register("name", {
                        required: "El nombre es requerido",
                        maxLength: {
                            message: "El nombre debe tener menos de 100 caracteres",
                            value: 100
                        }
                    })}
                />

                {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            </InputContainer>

            <InputContainer>
                <LabelInput htmlFor="name">
                    Inicio de la Competencia:
                </LabelInput>

                <input
                    type="datetime-local"
                    id="started_at"
                    className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    {...register("started_at", {
                        required: "La fecha es requerida",
                    })}
                />

                {errors.started_at && <ErrorMessage>{errors.started_at.message}</ErrorMessage>}
            </InputContainer>

            <InputContainer>
                <LabelInput htmlFor="name">
                    Fin de la Competencia:
                </LabelInput>

                <input
                    type="datetime-local"
                    id="ended_at"
                    className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    {...register("ended_at", {
                        required: "La fecha es requerida",
                    })}
                />

                {errors.ended_at && <ErrorMessage>{errors.ended_at.message}</ErrorMessage>}
            </InputContainer>

            {image &&
                <div className="max-w-40 w-full">
                    <img className="w-full h-auto block" src={`${BACKEND_URL}/storage/contests/${image}`} alt="Imagen de la Competencia a editar" width={100} height={100} />
                </div>
            }

            <InputContainer>
                <LabelInput htmlFor="image">
                    Imagen de la Competencia:
                </LabelInput>

                <input
                    accept="image/jpeg, image/png, image/jpeg"
                    title="Selecciona Imagen de la Competencia"
                    type="file"
                    id="image"
                    className="border border-dashed border-gray-300 w-full px-4 py-2"
                    {...register("image", image ? {} : {
                        required: "La imagen es requerida",
                        validate: (value) => value?.length === 1 || "La imagen es requerida"
                    })}
                />

                {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
            </InputContainer>
        </>
    )
}
