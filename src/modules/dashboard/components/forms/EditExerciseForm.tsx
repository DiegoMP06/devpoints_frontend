import { EditExercise, ExerciseFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Heading from "../Heading";
import NavLinkContainer from "../NavLinkContainer";
import NavLink from "../NavLink";
import FormContainer from "../FormContainer";
import ExerciseForm from "./ExerciseForm";
import SubmitForm from "../SubmitForm";
import ExerciseService from "@/services/ExerciseService";
import { toast } from "react-toastify";

type EditExerciseFormProps = {
    exercise: EditExercise['data'][0]
}


export default function EditExerciseForm({ exercise }: EditExerciseFormProps) {
    const params = useParams();
    const contestId = params.contestId || '';
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const initialValues: ExerciseFormData = {
        name: exercise.name,
        description: exercise.description,
        points: exercise.points
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        setError,
        clearErrors
    } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: ExerciseService.editExercise,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['exercises', contestId] });
            queryClient.invalidateQueries({ queryKey: ['edit-exercise', exercise.id.toString()], });
            navigate(`/dashboard/contests/${contestId}/exercises`);
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleCreateExercise: SubmitHandler<ExerciseFormData> = (data) =>
        mutate({ data, contestId: Number(contestId), exerciseId: exercise.id });

    return (
        <>
            <Heading>
                Editar Ejercicio
            </Heading>

            <NavLinkContainer>
                <NavLink to={`/dashboard/contests/${contestId}/exercises`}>
                    Volver
                </NavLink>
            </NavLinkContainer>

            <FormContainer onSubmit={handleSubmit(handleCreateExercise)} className="mt-16">
                <ExerciseForm
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    setError={setError}
                    clearErrors={clearErrors}
                />

                <SubmitForm
                    disabled={isPending}
                    value="Guardar Cambios"
                />
            </FormContainer>
        </>
    )
}
