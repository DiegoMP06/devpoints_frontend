
export default function TeamItem() {
    return (
        <li className="text-gray-600 font-bold px-4 py-2 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center justify-between gap-4 flex-1">
                {i + 1}. {exercise.name}
                <span className="text-sm text-gray-400 font-bold">
                    {exercise.points} puntos
                </span>
            </p>

            <Switch
                checked={enabled}
                onChange={setEnabled}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-purple-300 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-purple-700 data-focus:outline data-focus:outline-white"
            >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
                />
            </Switch>
        </li>
    )
}
