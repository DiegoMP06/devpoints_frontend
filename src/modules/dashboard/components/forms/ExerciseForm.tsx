import 'react-quill-new/dist/quill.snow.css';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch } from "react-hook-form";
import ReactQuill, { EmitterSource } from 'react-quill-new';
import { ExerciseFormData } from "@/types";
import InputContainer from "../../../app/components/InputContainer";
import LabelInput from "../../../app/components/LabelInput";
import ErrorMessage from "app/components/ErrorMessage";
import { Delta } from 'quill';
import { useEffect, useState } from 'react';

type ExerciseFormProps = {
    register: UseFormRegister<ExerciseFormData>
    errors: FieldErrors<ExerciseFormData>
    setError: UseFormSetError<ExerciseFormData>;
    setValue: UseFormSetValue<ExerciseFormData>
    watch: UseFormWatch<ExerciseFormData>
    clearErrors: UseFormClearErrors<ExerciseFormData>
}

export default function ExerciseForm({ register, errors, watch, setError, setValue, clearErrors }: ExerciseFormProps) {
    const description = watch("description");
    const [charsDescription, setCharsDescription] = useState(0);

    const onChangeDescription = (value: string, _delta: Delta, _source: EmitterSource, editor: ReactQuill.UnprivilegedEditor) => {
        setValue("description", value);
        const text = editor.getText();
        setCharsDescription(text.trim().length);
    }

    useEffect(() => {
        if (charsDescription === 0) {
            return setError("description", { message: "La descripcion es requerida" });
        }

        if (charsDescription < 100) {
            return setError("description", { message: "La descripcion debe tener mas de 100 caracteres" });
        }

        clearErrors("description");
    }, [charsDescription]);


    return (
        <>
            <InputContainer>
                <LabelInput htmlFor="name">
                    Nombre del Ejercicio:
                </LabelInput>

                <input
                    type="text"
                    id="name"
                    placeholder="Nombre del Ejercicio"
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
                <p className="text-lg sm:text-xl text-gray-600 block w-full font-bold">
                    Descripcion del Ejercicio:
                </p>

                <ReactQuill
                    onChange={onChangeDescription}
                    value={description}
                />


                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
            </InputContainer>

            <InputContainer>
                <LabelInput htmlFor="points">
                    Puntaje del Ejercio:
                </LabelInput>

                <input
                    type="number"
                    id="points"
                    placeholder="Puntaje del Ejercicio"
                    className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    min={1}
                    {...register("points", {
                        required: "El puntaje es requerido",
                        min: {
                            value: 1,
                            message: "El puntaje debe ser mayor a 1"
                        },
                        validate: (value) => {
                            if (isNaN(value)) {
                                return "El puntaje debe ser un número"
                            }

                            return true
                        }
                    })}
                />

                {errors.points && <ErrorMessage>{errors.points.message}</ErrorMessage>}
            </InputContainer>
        </>
    )
}
