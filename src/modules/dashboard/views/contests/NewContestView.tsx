import Heading from "dashboard/components/Heading";
import NavLinkContainer from "dashboard/components/NavLinkContainer";
import NavLink from "dashboard/components/NavLink";
import FormContainer from "dashboard/components/FormContainer";
import SubmitForm from "dashboard/components/SubmitForm";
import type { ContestFormData } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import ContestForm from "dashboard/components/forms/ContestForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ContestService from "@/services/ContestService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useApp from "@/hooks/useApp";
export default function NewContestView() {
    const { user } = useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const initialValues: ContestFormData = {
        name: '',
        image: null,
        started_at: '',
        ended_at: '',
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: ContestService.createContest,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['contests', user?.id] });
            toast.success(data);
            navigate('/dashboard');
        },
        onError(error) {
            toast.error(error.message);
        }
    });

    const handleCreateContest: SubmitHandler<ContestFormData> = (data) =>
        mutate({ data });

    return (
        <>
            <Heading>
                Nueva Competencia
            </Heading>

            <NavLinkContainer>
                <NavLink to="/dashboard">
                    Volver a Dashboard
                </NavLink>
            </NavLinkContainer>

            <FormContainer
                className="mt-16"
                onSubmit={handleSubmit(handleCreateContest)}
            >
                <ContestForm register={register} errors={errors} />

                <SubmitForm
                    disabled={isPending}
                    value="Crear Competencia"
                />
            </FormContainer>
        </>
    )
}
