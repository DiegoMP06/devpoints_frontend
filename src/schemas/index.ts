import { z } from "zod";

export const QuerySearchSchema = z.object({
    query: z.string(),
});

export const PaginationSchema = z.object({
    current_page: z.number(),
    from: z.number().nullable(),
    last_page: z.number(),
    path: z.string(),
    per_page: z.number(),
    to: z.number().nullable(),
    total: z.number(),
    links: z.array(
        z.object({
            url: z.string().nullable(),
            label: z.string(),
            active: z.boolean(),
        })
    ),
});

export const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    current_password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
});

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    email_verified_at: z.string().nullable().optional(),
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
    started_at: z.string(),
    ended_at: z.string(),
    is_ended: z.number().int().min(0).max(1),
    created_at: z.string(),
    updated_at: z.string(),
    teams: z.array(TeamSchema),
    exercises: z.array(ExerciseSchema),
    evaluators: z.array(EvaluatorSchema),
    user: UserSchema.pick({ id: true, name: true, email: true }),
    // is_saved: UserSchema.pick({ id: true, name: true, email: true })
    //     .extend({
    //         pivot: z.object({ id: z.number() }),
    //     })
    //     .nullable(),
});

export const ContestDetailsSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
            is_published: true,
            user_id: true,
            user: true,
            teams: true,
            exercises: true,
            evaluators: true,
            started_at: true,
            ended_at: true,
            is_ended: true,
            updated_at: true,
            created_at: true,
        })
    ),
});

export const ContestSummarySchema = z.object({
    data: z.array(ContestSchema),
});

export const FavoriteContestsSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
            is_published: true,
            user_id: true,
            user: true,
            started_at: true,
            ended_at: true,
            is_ended: true,
            updated_at: true,
            created_at: true,
        }).extend({
            pivot: z.object({ id: z.number() }),
        })
    ),
});

export const CheckFavoriteContestSchema = z.object({
    data: z.array(
        z.object({
            pivot: z.object({ id: z.number() }),
        })
    ),
});

export const EditContestSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
            started_at: true,
            ended_at: true,
        })
    ),
});

export const ContestsSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
            is_published: true,
            user_id: true,
            started_at: true,
            ended_at: true,
            is_ended: true,
        })
    ),
    meta: PaginationSchema,
});

export const HomeContestsSchema = z.object({
    data: z.array(
        ContestSchema.pick({
            id: true,
            name: true,
            image: true,
            is_published: true,
            user_id: true,
            started_at: true,
            ended_at: true,
            user: true,
        })
    ),
    meta: PaginationSchema,
});
