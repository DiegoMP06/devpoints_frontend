import Heading from "dashboard/components/Heading";
import { QuerySearch } from "@/types";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function SearchForm() {
    const navigate = useNavigate();
    const initialValues: QuerySearch = {
        query: ''
    }

    const { handleSubmit, register } = useForm({ defaultValues: initialValues });
    
    const handleSearchContests: SubmitHandler<QuerySearch> = (data) =>
        navigate('?query=' + data.query);

    return (
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
            <div className="flex-1">
                <Heading>
                    Competencias
                </Heading>

                <p className="md:text-xl font-bold text-gray-400 max-w-xl mt-2">
                    Ingresa a una competencia para seguir el resumen de cerca.
                </p>
            </div>

            <form className="flex-1 space-y-2" onSubmit={handleSubmit(handleSearchContests)}>
                <div className="w-full flex">
                    <input
                        className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 flex-1"
                        type="search"
                        placeholder="Buscar Competencia"
                        id="query"
                        {...register('query')}
                    />

                    <button type="submit" title="Buscar Evaluador" className="block bg-purple-700 hover:bg-purple-800 text-white p-2">
                        <MagnifyingGlassIcon className="size-8" />
                    </button>
                </div>
            </form>
        </div>
    )
}
