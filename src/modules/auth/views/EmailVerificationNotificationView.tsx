import AuthService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";

export default function EmailVerificationNotificationView() {
    const { mutate, isPending } = useMutation({
        mutationFn: AuthService.emailVerificationNotification,
        onSuccess(data) {
            toast.success(data)
        },
        onError(error) {
            toast.error(error.message)
        }
    });

    return (
        <>
            <Heading>
                Verifica tu cuenta
            </Heading>

            <Subheading>
                Verifica tu cuenta y comienza a disfrutar de nuestra plataforma. Si no has recibido el correo de verificación, puedes solicitarlo de nuevo.
            </Subheading>

            <input
                disabled={isPending}
                type="button"
                value="Solicitar Correo de Verificación"
                className="bg-purple-100 hover:bg-purple-50 text-purple-700 font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center mt-10 disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={() => mutate()}
            />
        </>
    )
}
