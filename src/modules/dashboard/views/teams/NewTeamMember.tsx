import Modal from "@/modules/app/components/Modal";
import { DialogTitle } from "@headlessui/react";
import TeamMemberForm from "dashboard/components/forms/TeamMemberForm";
import SubmitForm from "dashboard/components/SubmitForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { TeamMemberFormData } from "@/types";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TeamService from "@/services/TeamService";
import { toast } from "react-toastify";

export default function NewTeamMember() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const params = useParams();
    const contestId = params.contestId || '';
    const teamId = params.teamId || '';

    const initialValues: TeamMemberFormData = {
        name: '',
        father_last_name: '',
        mother_last_name: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: TeamService.createTeamMember,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['edit-team', teamId] });
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
            dataMember: data
        })

    return (
        <Modal show={true} onClose={() => navigate(`/dashboard/contests/${contestId}/teams/${teamId}/edit`)}>
            <DialogTitle
                as="h3"
                className="text-3xl font-bold text-gray-600"
            >
                Agregar Miembro
            </DialogTitle>

            <p className="text-xl text-gray-400 font-bold mt-2">
                Llena el formulario para agregar un nuevo miembro al equipo
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-10"
            >
                <TeamMemberForm register={register} errors={errors} />

                <SubmitForm
                    value="Agregar Miembro"
                    disabled={isPending}
                />
            </form>
        </Modal>
    );
}
