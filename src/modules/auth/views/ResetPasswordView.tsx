import InputContainer from "@/modules/app/components/InputContainer";
import FormContainer from "../components/FormContainer";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import LabelInput from "@/modules/app/components/LabelInput";

export default function ResetPasswordView() {
    return (
        <>
            <Heading>
                Restablecer Contraseña
            </Heading>

            <Subheading>
                Restablece tu contraseña llenando el siguiente formulario.
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

                <InputContainer>
                    <LabelInput htmlFor="password">
                        Tu Contraseña:
                    </LabelInput>

                    <input
                        type="password"
                        id="password"
                        placeholder="Tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    />
                </InputContainer>

                <InputContainer>
                    <LabelInput htmlFor="password_confirmation">
                        Repite Tu Contraseña:
                    </LabelInput>

                    <input
                        type="password"
                        id="password_confirmation"
                        placeholder="Repite Tu Contraseña"
                        className="border border-gray-300 w-full px-4 py-2 placeholder-gray-400"
                    />
                </InputContainer>

                <input
                    type="submit"
                    value="Cambiar Contraseña"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors block w-full text-center"
                />
            </FormContainer>
        </>
    )
}
