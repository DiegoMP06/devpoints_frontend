import ErrorMessage from "@/modules/app/components/ErrorMessage";
import { QuerySearch } from "@/types";
import { DialogTitle } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type SearchEvaluatorFormProps = {
    register: UseFormRegister<QuerySearch>;
    handleSubmit: UseFormHandleSubmit<QuerySearch, QuerySearch>;
    errors: FieldErrors<QuerySearch>;
    handleSearchEvaluator: SubmitHandler<QuerySearch>;
}

export default function SearchEvaluatorForm({register, handleSubmit, errors, handleSearchEvaluator}: SearchEvaluatorFormProps) {
    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-6">
            <div className="flex-1">
                <DialogTitle
                    as="h3"
                    className="text-3xl font-bold text-gray-600"
                >
                    Agregar Evaluador
                </DialogTitle>

                <p className="text-xl font-bold text-gray-400">
                    Busca un Evaluador por su nombre o email
                </p>
            </div>

            <form className="flex-1 space-y-2" onSubmit={handleSubmit(handleSearchEvaluator)}>
                <div className="w-full flex">
                    <input
                        className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 flex-1"
                        type="search"
                        placeholder="Buscar Evaluador"
                        id="query"
                        {...register('query', {
                            required: "El campo es requerido"
                        })}
                    />

                    <button type="submit" title="Buscar Evaluador" className="block bg-purple-700 hover:bg-purple-800 text-white p-2">
                        <MagnifyingGlassIcon className="size-8" />
                    </button>
                </div>

                {errors.query && <ErrorMessage>{errors.query.message}</ErrorMessage>}
            </form>
        </div>
    )
}
