
export default function LoadingSpinner() {
    return (
        <div className="w-full flex justify-center h-full my-10">
            <div className="animate-spin inline-block size-12 border-4 border-current border-t-transparent text-cyan-700 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
