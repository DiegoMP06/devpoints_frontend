import { z } from "zod";

export const QuerySearchSchema = z.object({
    query: z.string(),
});

export const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    email_verified_at: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const AuthenticationSchema = z.object({
    token: z.string(),
    user: UserSchema,
});

export const EvaluatorSchema = UserSchema.pick({
    id: true,
    name: true,
    email: true,
}).extend({
    pivot: z.object({ id: z.number() }),
});

export const EvaluatorsSchema = z.object({
    data: z.array(EvaluatorSchema),
});

export const EvaluatorsIdSchema = z.object({
    data: z.array(EvaluatorSchema.pick({ id: true })),
});

export const SearchForUsersForEvaluatorsSchema = z.object({
    data: z.array(UserSchema.pick({ id: true, name: true, email: true })),
});

export const AddEvaluatorFormDataSchema = z.object({
    user_id: z.number(),
});

export const ExerciseSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    points: z.number().int(),
    contest_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const ExercisesSchema = z.object({
    data: z.array(
        ExerciseSchema.pick({
            id: true,
            name: true,
            points: true,
        })
    ),
});

export const ExerciseDetailsSchema = z.object({
    data: z.array(ExerciseSchema),
});

export const EditExerciseSchema = z.object({
    data: z.array(
        ExerciseSchema.pick({
            id: true,
            name: true,
            description: true,
            points: true,
        })
    ),
});

export const AssessmentSchema = z.object({
    id: z.number(),
    exercise_id: z.number(),
    team_id: z.number(),
    created_by: UserSchema.pick({
        id: true,
        name: true,
        email: true,
    }),
    deleted_by: UserSchema.pick({
        id: true,
        name: true,
        email: true,
    }).nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    deleted_at: z.string().nullable(),
    exercise: ExerciseSchema.pick({
        id: true,
        name: true,
        points: true,
    }),
});

export const SubmitAssessmentFormDataSchema = z.object({
    exercise_id: z.number(),
});

export const TeamMemberSchema = z.object({
    id: z.number(),
    name: z.string(),
    father_last_name: z.string(),
    mother_last_name: z.string(),
    team_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const EditTeamMemberSchema = z.object({
    data: z.array(
        TeamMemberSchema.pick({
            id: true,
            name: true,
            father_last_name: true,
            mother_last_name: true,
        })
    ),
});

export const TeamSchema = z.object({
    id: z.number(),
    name: z.string(),
    contest_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    members: z.array(TeamMemberSchema),
    assessments: z.array(AssessmentSchema),
});

export const TeamsSchema = z.object({
    data: z.array(
        TeamSchema.pick({
            id: true,
            name: true,
        })
    ),
});

export const TeamDetailsSchema = z.object({
    data: z.array(TeamSchema),
});

export const EditTeamSchema = z.object({
    data: z.array(
        TeamSchema.pick({
            id: true,
            name: true,
        }).extend({
            members: z.array(
                TeamMemberSchema.pick({
                    id: true,
                    name: true,
                    father_last_name: true,
                    mother_last_name: true,
                })
            ),
        })
    ),
});

export const ContestSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    is_published: z.number().int().min(0).max(1),
    user_id: UserSchema.shape.id,
    created_at: z.string(),
    updated_at: z.string(),
    teams: z.array(TeamSchema),
    exercises: z.array(ExerciseSchema),
    evaluators: z.array(EvaluatorSchema),
});

export const ContestDetailsSchema = z.object({
    data: z.array(ContestSchema),
});

export const EditContestSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
        })
    ),
});

export const DashboardContestsSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
            is_published: true,
            user_id: true,
        })
    ),
});
