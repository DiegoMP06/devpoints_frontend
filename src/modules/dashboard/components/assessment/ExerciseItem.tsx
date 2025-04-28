import useApp from "@/hooks/useApp";
import AssessmentService from "@/services/AssessmentService";
import { Assessment, Exercises, GetDataForAssessment, Team } from "@/types"
import { Switch } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

type ExerciseItemProps = {
    exercise: Exercises['data'][0]
    team: Team
}

export default function ExerciseItem({ exercise, team }: ExerciseItemProps) {
    const { user } = useApp();
    const params = useParams();
    const contestId = params.contestId || '';
    const queryClient = useQueryClient();

    const submitAssessmentMutation = useMutation({
        mutationFn: AssessmentService.submitAssessment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['assessment-team', team.id.toString()]
            })
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const removeAssessmentMutation = useMutation({
        mutationFn: AssessmentService.removeAssessment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['assessment-team', team.id.toString()]
            })
            toast.success(data);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const isEvaluated = useMemo(() =>
        team.assessments.some(
            assessment => assessment.exercise_id === exercise.id && !assessment.deleted_at
        ), [team.assessments, exercise.id]);

    const submitAssessment = () => {
        submitAssessmentMutation.mutate({
            contestId: Number(contestId),
            teamId: team.id,
            exerciseId: exercise.id,
        })

        const updatedAssessments: Assessment[] = [...team.assessments, {
            id: 0,
            team_id: team.id,
            exercise_id: exercise.id,
            created_by: {
                id: user?.id || 0,
                name: user?.name || '',
                email: user?.email || '',
            },
            deleted_by: null,
            deleted_at: null,
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
            exercise: exercise,
        }]

        const updateTeam = {
            ...team,
            assessments: updatedAssessments
        };

        queryClient.setQueryData(
            ['assessment-team', team.id.toString()],
            (oldData: GetDataForAssessment) => ({
                ...oldData,
                team: updateTeam,
            })
        );
    }

    const removeAssessment = () => {
        const assessmentId = team.assessments.find((assessment) => assessment.exercise_id === exercise.id && !assessment.deleted_at)?.id;

        if (assessmentId) {
            removeAssessmentMutation.mutate({
                contestId: Number(contestId),
                teamId: team.id,
                exerciseId: exercise.id,
                assessmentId
            })

            const updatedAssessments = team.assessments.map(
                (assessment) => assessment.id === assessmentId ? {
                    ...assessment,
                    deleted_at: new Date().toString(),
                    deleted_by: {
                        id: user?.id,
                        name: user?.name,
                        email: user?.email,
                    }
                } : assessment
            );

            const updateTeam = {
                ...team,
                assessments: updatedAssessments
            };

            queryClient.setQueryData(
                ['assessment-team', team.id.toString()],
                (oldData: GetDataForAssessment) => ({
                    ...oldData,
                    team: updateTeam,
                })
            );
        }

    }

    const handleAssessment = () => {
        if (isEvaluated) {
            removeAssessment();
        } else {
            submitAssessment();
        }
    }

    return (
        <li className="text-gray-600 font-bold p-2 flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center justify-between gap-4 flex-1">
                {exercise.name}
                <span className="text-sm text-gray-400 font-bold">
                    {exercise.points} puntos
                </span>
            </p>

            <Switch
                checked={isEvaluated}
                onChange={handleAssessment}
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
