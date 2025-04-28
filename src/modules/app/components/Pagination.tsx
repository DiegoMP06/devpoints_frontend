import type { Pagination } from "@/types";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

type PaginationType = {
    meta: Pagination;
}

export default function Pagination({ meta }: PaginationType) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query') || '';

    const queryExists = query ? true : false

    const links = useMemo(() => Array.from({ length: meta.last_page }, (_, i) => i + 1), [meta.last_page]);
    if (meta.last_page > 1) return (
        <div className="mt-10 flex flex-col md:flex-row items-center gap-4 justify-between">
            <p className="text-lg font-bold text-gray-400">
                Página {meta.current_page} de {meta.last_page}
            </p>

            <div className="flex gap-1">
                <button
                    type="button"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                    title="Primer Página"
                    disabled={meta.current_page === 1}
                    onClick={() => navigate(`?page=1${queryExists ? `&query=${query}` : ''}`)}
                >
                    <ChevronDoubleLeftIcon className="size-6" />
                </button>

                <button
                    type="button"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                    title="Página Anterior"
                    disabled={meta.current_page === 1}
                    onClick={() => navigate(`?page=${meta.current_page - 1}${queryExists ? `&query=${query}` : ''}`)}
                >
                    <ChevronLeftIcon className="size-6" />
                </button>

                {links.map((link) => (
                    <button
                        key={link}
                        type="button"
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors disabled:opacity-25 disabled:cursor-not-allowed hidden md:block"
                        title={`Página ${link}`}
                        disabled={meta.current_page === link}
                        onClick={() => navigate(`?page=${link}${queryExists ? `&query=${query}` : ''}`)}
                    >
                        {link}
                    </button>
                ))}

                <button
                    type="button"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                    title="Página Siguiente"
                    disabled={meta.current_page === meta.last_page}
                    onClick={() => navigate(`?page=${meta.current_page + 1}${queryExists ? `&query=${query}` : ''}`)}
                >
                    <ChevronRightIcon className="size-6" />
                </button>

                <button
                    type="button"
                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 cursor-pointer transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                    title="Ultima Página"
                    disabled={meta.current_page === meta.last_page}
                    onClick={() => navigate(`?page=${meta.last_page}${queryExists ? `&query=${query}` : ''}`)}
                >
                    <ChevronDoubleRightIcon className="size-6" />
                </button>
            </div>
        </div>
    )
}
