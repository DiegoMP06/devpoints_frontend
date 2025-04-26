import Modal from '@/modules/app/components/Modal'
import { DialogTitle } from '@headlessui/react'
import TeamMemberForm from '../../forms/TeamMemberForm'
import SubmitForm from '../../SubmitForm'
import { TeamMemberFormData } from '@/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'react'

type EditTeamMemberFormProps = {
    member: TeamMemberFormData;
    setMember: Dispatch<SetStateAction<TeamMemberFormData | null>>
    handleUpdateMembers: (data: TeamMemberFormData) => void
}

export default function EditTeamMemberForm({member, setMember, handleUpdateMembers}: EditTeamMemberFormProps) {

    const initialValues: TeamMemberFormData = {
        name: member.name,
        father_last_name: member.father_last_name,
        mother_last_name: member.mother_last_name,
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const onSubmit: SubmitHandler<TeamMemberFormData> = (data) => {
        handleUpdateMembers({...data, id: member.id});
        reset();
        setMember(null);
    }

    return (
        <Modal show={true} onClose={() => { }}>
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
                />
            </form>
        </Modal>
    )
}
