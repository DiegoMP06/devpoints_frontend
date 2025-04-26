import Modal from "@/modules/app/components/Modal";
import { EditTeamMember, TeamMemberFormData } from "@/types";
import { DialogTitle } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import TeamMemberForm from "../../forms/TeamMemberForm";
import SubmitForm from "../../SubmitForm";
import TeamService from "@/services/TeamService";
import { toast } from "react-toastify";

type EditTeamMemberFormProps = {
    member: EditTeamMember['data'][0]
}

export default function EditTeamMemberForm({ member }: EditTeamMemberFormProps) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const params = useParams();
    const contestId = params.contestId || '';
    const teamId = params.teamId || '';

    const initialValues: TeamMemberFormData = {
        name: member.name,
        father_last_name: member.father_last_name,
        mother_last_name: member.mother_last_name,
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: TeamService.editTeamMember,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['edit-team', teamId] });
            queryClient.invalidateQueries({ queryKey: ['edit-team-member', teamId, member.id.toString()] });
            toast.success(data);
            navigate(`/dashboard/contests/${contestId}/teams/${teamId}/edit`);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const onSubmit: SubmitHandler<TeamMemberFormData> = (data) =>
        mutate({
            contestId: Number(contestId),
            teamId: Number(teamId),
            memberId: member.id,
            dataMember: data,
        })

    return (
        <Modal show={true} onClose={() => navigate(`/dashboard/contests/${contestId}/teams/${teamId}/edit`)}>
            <DialogTitle
                as="h3"
                className="text-3xl font-bold text-gray-600"
            >
                Editar Miembro
            </DialogTitle>

            <p className="text-xl text-gray-400 font-bold mt-2">
                Aqui puedes modificar los datos del miembro
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-10"
            >
                <TeamMemberForm register={register} errors={errors} />

                <SubmitForm
                    value="Guardar Cambios"
                    disabled={isPending}
                />
            </form>
        </Modal>
    );
}
