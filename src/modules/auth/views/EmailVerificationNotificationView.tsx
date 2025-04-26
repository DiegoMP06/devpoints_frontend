import AuthService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

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
            <h1 className="text-4xl font-bold text-white">
                Verifica tu cuenta
            </h1>

            <p className="text-xl font-medium text-purple-100 mt-2">
                Verifica tu cuenta y comienza a disfrutar de nuestra plataforma. Si no has recibido el correo de verificación, puedes solicitarlo de nuevo.
            </p>

            <input
                disabled={isPending}
                type="button"
                value="Solicitar Correo de Verificación"
                className="bg-purple-100 hover:bg-purple-50 text-purple-700 font-bold py-3 px-4 cursor-pointer transition-colors block w-full text-center mt-10 disabled:opacity-25 disabled:cursor-not-allowed"
                onClick={() => mutate()}
            />
        </>
    )
}
