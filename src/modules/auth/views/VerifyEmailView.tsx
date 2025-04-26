import AuthService from "@/services/AuthService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";

export default function VerifyEmailView() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const expires = queryParams.get('expires') || '';
    const signature = queryParams.get('signature') || '';
    const params = useParams();
    const hash = params.hash || '';
    const id = params.id || '';

    const { isError, error, data } = useQuery({
        queryKey: ['verify-email', id, hash],
        queryFn: () => AuthService.verifyEmail({ id, hash, expires, signature }),
        retry: false,
        refetchOnWindowFocus: false
    });

    if (isError) {
        toast.error(error.message, {
            toastId: 'verify-email-error'
        });
    }

    if (data && !isError) return <Navigate to="/dashboard" />

    return (
        <>
            <h1 className="text-4xl font-bold text-white">
                Verifica tu cuenta
            </h1>

            <p className="text-xl font-medium text-purple-100 mt-2">
                Verifica tu cuenta y comienza a disfrutar de nuestra plataforma. Gracias por registrarte.
            </p>
        </>
    )
}
