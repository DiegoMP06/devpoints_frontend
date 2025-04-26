import Modal from "app/components/Modal";
import { TeamMemberFormData } from "@/types";
import { DialogTitle } from "@headlessui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import SubmitForm from "../../SubmitForm";
import TeamMemberForm from "../../forms/TeamMemberForm";

type AddMemberFormProps = {
    handleUpdateMembers: (data: TeamMemberFormData) => void;
}


export default function AddTeamMemberForm({handleUpdateMembers} : AddMemberFormProps) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('add-member') || '';
    const show = addMember.toLowerCase() === 'true';
    const navigate = useNavigate();

    const initialValues: TeamMemberFormData = {
        name: '',
        father_last_name: '',
        mother_last_name: '',
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const onSubmit: SubmitHandler<TeamMemberFormData> = (data) => {
        handleUpdateMembers(data);
        reset();
        navigate('', { replace: true });
    }

    return (
        <Modal show={show} onClose={() => navigate('', { replace: true })}>
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
                />
            </form>
        </Modal>
    )
}
