import { SubmitHandler, useForm } from "react-hook-form";
import FormContainer from "../FormContainer";
import Heading from "../Heading";
import NavLink from "../NavLink";
import NavLinkContainer from "../NavLinkContainer";
import SubmitForm from "../SubmitForm";
import ContestForm from "./ContestForm";
import { ContestFormData, EditContest } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContestService from "@/services/ContestService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useApp from "@/hooks/useApp";

type EditContestFormProps = {
    contest: EditContest['data'][0]
};

export default function EditContestForm({ contest }: EditContestFormProps) {
    const { user } = useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const initialValues: ContestFormData = {
        name: contest.name,
        image: null,
        started_at: contest.started_at,
        ended_at: contest.ended_at,
    }

    const { mutate, isPending } = useMutation({
        mutationFn: ContestService.editContest,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['edit-contest', contest.id.toString()], });
            queryClient.invalidateQueries({ queryKey: ['contests', user?.id] });
            toast.success(data);
            navigate('/dashboard');
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleEditContest: SubmitHandler<ContestFormData> = (data) =>
        mutate({ data, id: contest.id });

    return (
        <>
            <Heading>
                Editar Competencia
            </Heading>

            <NavLinkContainer>
                <NavLink to="/dashboard">
                    Volver a Dashboard
                </NavLink>
            </NavLinkContainer>

            <FormContainer
                className="mt-16"
                onSubmit={handleSubmit(handleEditContest)}

            >
                <ContestForm image={contest.image} register={register} errors={errors} />

                <SubmitForm
                    disabled={isPending}
                    value="Guardar Cambios"
                />
            </FormContainer>
        </>
    )
}
