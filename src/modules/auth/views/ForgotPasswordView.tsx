import { Link } from "react-router";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import FormContainer from "../components/FormContainer";
import InputContainer from "@/modules/app/components/InputContainer";
import LabelInput from "@/modules/app/components/LabelInput";

export default function ForgotPasswordView() {
    return (
        <>
            <Heading>
                Recuperar Contraseña
            </Heading>

            <Subheading>
                Recupera tu contraseña llenando el siguiente formulario, y sigue las instrucciones.
            </Subheading>

            <FormContainer>
                <InputContainer>
                    <LabelInput htmlFor="email">
                        Tu Email:
                    </LabelInput>

                    <input
                        type="email"
                        id="email"
                        placeholder="Tu Email"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    />
                </InputContainer>

                <input
                    type="submit"
                    value="Enviar"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center"
                />
            </FormContainer>

            <nav className="flex gap-6 justify-between items-center mt-10 flex-col lg:flex-row">
                <Link to="/login" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿Ya tienes una cuenta? Inicia Sesión
                </Link>

                <Link to="/register" className="text-purple-100 hover:underline hover:text-white transition-colors text-center">
                    ¿No tienes una cuenta? Registrate
                </Link>
            </nav>
        </>
    )
}
