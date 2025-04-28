import ErrorMessage from "@/modules/app/components/ErrorMessage";
import TeamService from "@/services/TeamService";
import { EditTeam, EditTeamFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import FormContainer from "../FormContainer";
import InputContainer from "../../../app/components/InputContainer";
import LabelInput from "../../../app/components/LabelInput";
import SubmitForm from "../SubmitForm";


type EditTeamFormProps = {
    team: EditTeam['data'][0]
}

export default function EditTeamForm({ team }: EditTeamFormProps) {
    const queryClient = useQueryClient();
    const params = useParams();
    const contestId = params.contestId || '';

    const initialValues: EditTeamFormData = {
        name: team.name,
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: TeamService.editTeam,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['teams', contestId] });
            queryClient.invalidateQueries({ queryKey: ['edit-team', team.id.toString()] });
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleCreateTeam: SubmitHandler<EditTeamFormData> = (data) =>
        mutate({
            dataEdit: data,
            contestId: Number(contestId),
            teamId: Number(params.teamId)
        })

    return (
        <>

            <FormContainer className="mt-16" onSubmit={handleSubmit(handleCreateTeam)}>
                <InputContainer>
                    <LabelInput htmlFor="name">
                        Nombre del Equipo:
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

                <SubmitForm
                    value="Guardar Cambios"
                    disabled={isPending}
                />
            </FormContainer>
        </>
    )
}
