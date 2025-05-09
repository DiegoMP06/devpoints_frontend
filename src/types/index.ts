import {
    AddEvaluatorFormDataSchema,
    AssessmentSchema,
    AuthSchema,
    CheckFavoriteContestSchema,
    ContestDetailsSchema,
    ContestSchema,
    ContestsSchema,
    EditContestSchema,
    EditExerciseSchema,
    EditTeamMemberSchema,
    EditTeamSchema,
    EvaluatorSchema,
    ExerciseSchema,
    ExercisesSchema,
    HomeContestsSchema,
    PaginationSchema,
    QuerySearchSchema,
    SearchForUsersForEvaluatorsSchema,
    SubmitAssessmentFormDataSchema,
    TeamDetailsSchema,
    TeamMemberSchema,
    TeamSchema,
    UserSchema,
} from "@/schemas";
import { z } from "zod";

export type Auth = z.infer<typeof AuthSchema>;
export type UserRegisterForm = Pick<
    Auth,
    "email" | "password" | "password_confirmation" | "name"
>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type EditProfileFormData = Pick<Auth, "name" | "email">;
export type EditPasswordFormData = Pick<
    Auth,
    "current_password" | "password" | "password_confirmation"
>;
export type User = z.infer<typeof UserSchema>;

export type Evaluator = z.infer<typeof EvaluatorSchema>;
export type SearchForUsersForEvaluatorsSchema = z.infer<
    typeof SearchForUsersForEvaluatorsSchema
>;
export type AddEvaluatorFormData = z.infer<typeof AddEvaluatorFormDataSchema>;

export type Contest = z.infer<typeof ContestSchema>;
export type Contests = z.infer<typeof ContestsSchema>;
export type HomeContests = z.infer<typeof HomeContestsSchema>;
export type EditContest = z.infer<typeof EditContestSchema>;
export type ContestFormData = Pick<
    Contest,
    "name" | "started_at" | "ended_at"
> & {
    image: FileList | null;
};
export type ContestDetails = z.infer<typeof ContestDetailsSchema>;

export type Exercise = z.infer<typeof ExerciseSchema>;
export type Exercises = z.infer<typeof ExercisesSchema>;
export type EditExercise = z.infer<typeof EditExerciseSchema>;
export type ExerciseFormData = Pick<
    Exercise,
    "name" | "description" | "points"
>;

export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type EditTeamMember = z.infer<typeof EditTeamMemberSchema>;
export type TeamMemberFormData = Pick<
    TeamMember,
    "name" | "father_last_name" | "mother_last_name"
> & {
    id?: string;
};

export type Team = z.infer<typeof TeamSchema>;
export type EditTeam = z.infer<typeof EditTeamSchema>;
export type TeamDetails = z.infer<typeof TeamDetailsSchema>;
export type CreateTeamFormData = Pick<Team, "name"> & {
    members: TeamMemberFormData[];
};
export type EditTeamFormData = Pick<Team, "name">;

export type Assessment = z.infer<typeof AssessmentSchema>;
export type GetDataForAssessment = {
    team: Team;
    exercises: Exercises["data"];
};
export type SubmitAssessmentFormData = z.infer<
    typeof SubmitAssessmentFormDataSchema
>;

export type QuerySearch = z.infer<typeof QuerySearchSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;

export type NotificationAPI = {
    message: string;
};

export type CheckFavoriteContest = z.infer<typeof CheckFavoriteContestSchema>;
