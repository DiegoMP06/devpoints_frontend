import TeamService from "@/services/TeamService";
import { CreateTeamFormData, TeamMemberFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "app/components/ErrorMessage";
import FormContainer from "dashboard/components/FormContainer";
import Heading from "dashboard/components/Heading";
import InputContainer from "dashboard/components/InputContainer";
import LabelInput from "dashboard/components/LabelInput";
import NavLink from "dashboard/components/NavLink";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import SubmitForm from "dashboard/components/SubmitForm";
import AddTeamMemberForm from "dashboard/components/teams/create/AddTeamMemberForm";
import EditTeamMemberForm from "dashboard/components/teams/create/EditTeamMemberForm";
import MembersList from "dashboard/components/teams/create/MembersList";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { v4 as uuid } from 'uuid';

export default function NewTeamView() {
    const [member, setMember] = useState<TeamMemberFormData | null>(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const params = useParams();
    const contestId = params.contestId || '';

    const initialValues: CreateTeamFormData = {
        name: '',
        members: [],
    };

    const {
        register,
        formState: { errors },
        setError,
        clearErrors,
        watch,
        setValue,
        handleSubmit,
    } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: TeamService.createTeam,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['teams', contestId] });
            navigate(`/dashboard/contests/${contestId}/teams`);
            toast.success(data);
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleCreateTeam: SubmitHandler<CreateTeamFormData> = (data) =>
        mutate({ dataCreate: data, contestId: Number(contestId) });

    const members = watch('members');

    const handleUpdateMembers = (data: TeamMemberFormData) => {
        let membersUpdate: TeamMemberFormData[] = [];
        if (data.id) {
            membersUpdate = members.map(
                member => member.id === data.id ? data : member
            );
        } else {
            membersUpdate = [...members, {
                ...data,
                id: uuid(),
            }]
        }

        setValue('members', membersUpdate);
    };

    const handleSelectMemberForEdit = (memberId: TeamMemberFormData['id']) => {
        const memberSelected = members.find(member => member.id === memberId);

        if (memberSelected) {
            setMember(structuredClone(memberSelected));
        }
    }

    const handleDeleteMember = (memberId: TeamMemberFormData['id']) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                const updateMembers = members.filter(member => member.id !== memberId);
                setValue('members', updateMembers);
            }
        });
    }

    useEffect(() => {
        if (members.length === 0) {
            setError('members', { message: 'El equipo debe tener al menos un miembro' });
            return
        }

        if (members.length > 10) {
            setError('members', { message: 'El equipo debe tener menos de 10 miembros' });
            return;
        }

        clearErrors('members');
    }, [members]);

    return (
        <>
            <Heading>
                Nuevo Equipo
            </Heading>

            <NavLinkContainer>
                <NavLink to={`/dashboard/contests/${contestId}/teams`}>
                    Volver
                </NavLink>
            </NavLinkContainer>

            <FormContainer className="mt-16" onSubmit={handleSubmit(handleCreateTeam)}>
                <InputContainer>
                    <LabelInput htmlFor="name">
                        Nombre del Equipo:
                    </LabelInput>

                    <input
                        type="text"
                        id="name"
                        placeholder="Nombre del Equipo"
                        className="border border-gray-300 w-full px-4 py-3 placeholder-gray-400"
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
                    <p className="text-xl text-gray-600 block w-full font-bold">
                        Miembros:
                    </p>

                    <MembersList
                        handleSelectMemberForEdit={handleSelectMemberForEdit}
                        handleDeleteMember={handleDeleteMember}
                        members={members}
                    />

                    {errors.members && <ErrorMessage>{errors.members.message}</ErrorMessage>}
                </InputContainer>

                <SubmitForm
                    value="Crear Equipo"
                    disabled={isPending}
                />
            </FormContainer>

            <AddTeamMemberForm
                handleUpdateMembers={handleUpdateMembers}
            />

            {member && <EditTeamMemberForm
                member={member}
                setMember={setMember}
                handleUpdateMembers={handleUpdateMembers}
            />}
        </>
    )
}
