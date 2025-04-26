import { useNavigate, useParams } from "react-router";
import Heading from "dashboard/components/Heading";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import NavLink from "dashboard/components/NavLink";
import FormContainer from "dashboard/components/FormContainer";
import SubmitForm from "dashboard/components/SubmitForm";
import { ExerciseFormData } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import ExerciseForm from "dashboard/components/forms/ExerciseForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ExerciseService from "@/services/ExerciseService";
import { toast } from "react-toastify";

export default function NewExerciseView() {
    const params = useParams();
    const contestId = params.contestId || '';
    const queryClient = useQueryClient();
    const navigate = useNavigate()

    const initialValues: ExerciseFormData = {
        name: '',
        description: '',
        points: 0
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
        mutationFn: ExerciseService.createExercise,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['exercises', contestId] });
            navigate(`/dashboard/contests/${contestId}/exercises`);
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleCreateExercise: SubmitHandler<ExerciseFormData> = (data) =>
        mutate({ data, contestId: Number(contestId) });

    return (
        <>
            <Heading>
                Nuevo Ejercicio
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
                    value="Crear Ejercicio"
                />
            </FormContainer>
        </>
    )
}
