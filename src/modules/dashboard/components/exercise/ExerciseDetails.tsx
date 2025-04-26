import "react-quill-new/dist/quill.bubble.css";
import ReactQuill from 'react-quill-new';
import ExerciseService from '@/services/ExerciseService';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import Modal from "@/modules/app/components/Modal";
import { DialogTitle } from "@headlessui/react";

type ExerciseDetailsProps = {
    urlToReturn: string
}
export default function ExerciseDetails({ urlToReturn }: ExerciseDetailsProps) {
    const params = useParams()
    const navigate = useNavigate();
    const contestId = params.contestId || ''
    const exerciseId = params.exerciseId || ''

    const { data, isError } = useQuery({
        queryKey: ['exercise', exerciseId],
        queryFn: () => ExerciseService.getExerciseDetails({
            exerciseId: Number(exerciseId),
            contestId: Number(contestId),
        })
    });


    if (isError) return <Navigate to={urlToReturn} />;

    if (data) return (
        <Modal show={true} onClose={() => navigate(urlToReturn)}>
            <DialogTitle
                as="h3"
                className="text-3xl font-bold text-gray-600"
            >
                {data.name}
            </DialogTitle>

            <p className="text-xl font-bold text-gray-400">
                {data.points} puntos
            </p>

            <div className="mt-10">
                <ReactQuill
                    readOnly
                    theme="bubble"
                    value={data.description}
                />
            </div>

            <Link to={urlToReturn} className="mt-10 inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4">
                Volver
            </Link>
        </Modal>
    )
}


