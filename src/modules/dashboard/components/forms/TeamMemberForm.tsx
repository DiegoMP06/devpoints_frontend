import ErrorMessage from "@/modules/app/components/ErrorMessage";
import InputContainer from "../../../app/components/InputContainer";
import LabelInput from "../../../app/components/LabelInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TeamMemberFormData } from "@/types";

type TeamMemberFormProps = {
    register: UseFormRegister<TeamMemberFormData>
    errors: FieldErrors<TeamMemberFormData>
}

export default function TeamMemberForm({ register, errors }: TeamMemberFormProps) {
    return (
        <>
            <InputContainer>
                <LabelInput htmlFor="name">
                    Nombre:
                </LabelInput>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre del Miembro"
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
                <LabelInput htmlFor="father_last_name">
                    Apellido Paterno:
                </LabelInput>

                <input
                    type="text"
                    id="father_last_name"
                    placeholder="Apellido Paterno del Miembro"
                    className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    {...register("father_last_name", {
                        required: "El apellido es requerido",
                        maxLength: {
                            message: "El apellido debe tener menos de 100 caracteres",
                            value: 100
                        }
                    })}
                />

                {errors.father_last_name && <ErrorMessage>{errors.father_last_name.message}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
                <LabelInput htmlFor="mother_last_name">
                    Apellido Materno:
                </LabelInput>

                <input
                    type="text"
                    id="mother_last_name"
                    placeholder="Apellido Materno del Miembro"
                    className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    {...register("mother_last_name", {
                        required: "El apellido es requerido",
                        maxLength: {
                            message: "El apellido debe tener menos de 100 caracteres",
                            value: 100
                        }
                    })}
                />

                {errors.mother_last_name && <ErrorMessage>{errors.mother_last_name.message}</ErrorMessage>}
            </InputContainer>
        </>
    )
}
