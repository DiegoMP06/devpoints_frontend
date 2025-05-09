import LoadingSpinner from "@/modules/app/components/LoadingSpinner";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const ContestSummaryLayout = lazy(() => import("@/layouts/ContestSummaryLayout"));
const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const ProfileLayout = lazy(() => import("@/layouts/ProfileLayout"));
const FavoritesView = lazy(() => import("app/views/FavoritesView"));
const HomeView = lazy(() => import("app/views/HomeView"));
const NotFoundView = lazy(() => import("app/views/NotFoundView"));
const EmailVerificationNotificationView = lazy(() => import("auth/views/EmailVerificationNotificationView"));
const ForgotPasswordView = lazy(() => import("auth/views/ForgotPasswordView"));
const LoginView = lazy(() => import("auth/views/LoginView"));
const RegisterView = lazy(() => import("auth/views/RegisterView"));
const ResetPasswordView = lazy(() => import("auth/views/ResetPasswordView"));
const DashboardView = lazy(() => import("dashboard/views/DashboardView"));
const AssessmentTeamDetailsView = lazy(() => import("dashboard/views/assessment/AssesmentTeamDetailsView"));
const AssessmentExerciseDetailsView = lazy(() => import("dashboard/views/assessment/AssessmentExerciseDetailsView"));
const AssessmentTeamView = lazy(() => import("dashboard/views/assessment/AssessmentTeamView"));
const AssessmentView = lazy(() => import("dashboard/views/assessment/AssessmentView"));
const ContestDetailsView = lazy(() => import("dashboard/views/contests/ContestDetailsView"));
const EditContestView = lazy(() => import("dashboard/views/contests/EditContestView"));
const NewContestView = lazy(() => import("dashboard/views/contests/NewContestView"));
const EvaluatorsView = lazy(() => import("dashboard/views/evaluators/EvaluatorsView"));
const NewEvaluatorView = lazy(() => import("dashboard/views/evaluators/NewEvaluatorView"));
const EditExerciseView = lazy(() => import("dashboard/views/exercises/EditExerciseView"));
const ExerciseDetailsView = lazy(() => import("dashboard/views/exercises/ExerciseDetailsView"));
const ExercisesView = lazy(() => import("dashboard/views/exercises/ExercisesView"));
const NewExerciseView = lazy(() => import("dashboard/views/exercises/NewExerciseView"));
const EditTeamMember = lazy(() => import("dashboard/views/teams/EditTeamMember"));
const EditTeamView = lazy(() => import("dashboard/views/teams/EditTeamView"));
const NewTeamMember = lazy(() => import("dashboard/views/teams/NewTeamMember"));
const NewTeamView = lazy(() => import("dashboard/views/teams/NewTeamView"));
const TeamDetailsView = lazy(() => import("dashboard/views/teams/TeamDetailsView"));
const TeamsView = lazy(() => import("dashboard/views/teams/TeamsView"));
const ChangePasswordView = lazy(() => import("profile/views/ChangePasswordView"));
const EditProfileView = lazy(() => import("profile/views/EditProfileView"));
const ContestSummaryView = lazy(() => import("summary/views/ContestSummaryView"));
const ExercisesSummaryView = lazy(() => import("summary/views/ExercisesSummaryView"));
const TeamsSummaryView = lazy(() => import("summary/views/TeamsSummaryView"));

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Suspense fallback={<LoadingSpinner />}><AuthLayout /></Suspense>}>
                    <Route element={<Suspense fallback={<LoadingSpinner />}><LoginView /></Suspense>} path="/login" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><RegisterView /></Suspense>} path="/register" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><ForgotPasswordView /></Suspense>} path="/forgot-password" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><ResetPasswordView /></Suspense>} path="/reset-password/:token" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><EmailVerificationNotificationView /></Suspense>} path="/email/verification-notification" />s
                </Route>

                <Route element={<Suspense fallback={<LoadingSpinner />}><MainLayout /></Suspense>}>
                    <Route element={<Suspense fallback={<LoadingSpinner />}><HomeView /></Suspense>} path="/" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><FavoritesView /></Suspense>} path="/favorites" />

                    <Route element={<Suspense fallback={<LoadingSpinner />}><DashboardView /></Suspense>} path="/dashboard" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><NewContestView /></Suspense>} path="/dashboard/contests/new" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><EditContestView /></Suspense>} path="/dashboard/contests/:contestId/edit" />

                    <Route element={<Suspense fallback={<LoadingSpinner />}><ProfileLayout /></Suspense>} path="/profile">
                        <Route element={<Suspense fallback={<LoadingSpinner />}><EditProfileView /></Suspense>} index />
                        <Route element={<Suspense fallback={<LoadingSpinner />}><ChangePasswordView /></Suspense>} path="password" />
                    </Route>

                    <Route element={<Suspense fallback={<LoadingSpinner />}><ContestSummaryLayout /></Suspense>} path="/summary/contests/:contestId">
                        <Route element={<Suspense fallback={<LoadingSpinner />}><ContestSummaryView /></Suspense>} index />
                        <Route element={<Suspense fallback={<LoadingSpinner />}><ExercisesSummaryView /></Suspense>} path="exercises" />
                        <Route element={<Suspense fallback={<LoadingSpinner />}><TeamsSummaryView /></Suspense>} path="teams" />
                    </Route>
                </Route>

                <Route element={<Suspense fallback={<LoadingSpinner />}><DashboardLayout /></Suspense>} path="/dashboard/contests/:contestId">
                    <Route element={<Suspense fallback={<LoadingSpinner />}><ContestDetailsView /></Suspense>} index />

                    <Route element={<Suspense fallback={<LoadingSpinner />}><ExercisesView /></Suspense>} path="exercises">
                        <Route element={<Suspense fallback={<LoadingSpinner />}><ExerciseDetailsView /></Suspense>} path=":exerciseId" />
                    </Route>
                    <Route element={<Suspense fallback={<LoadingSpinner />}><NewExerciseView /></Suspense>} path="exercises/new" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><EditExerciseView /></Suspense>} path="exercises/:exerciseId/edit" />

                    <Route element={<Suspense fallback={<LoadingSpinner />}><TeamsView /></Suspense>} path="teams" >
                        <Route element={<Suspense fallback={<LoadingSpinner />}><TeamDetailsView /></Suspense>} path=":teamId" />
                    </Route>
                    <Route element={<Suspense fallback={<LoadingSpinner />}><NewTeamView /></Suspense>} path="teams/new" />
                    <Route element={<Suspense fallback={<LoadingSpinner />}><EditTeamView /></Suspense>} path="teams/:teamId/edit">
                        <Route element={<Suspense fallback={<LoadingSpinner />}><NewTeamMember /></Suspense>} path="members/new" />
                        <Route element={<Suspense fallback={<LoadingSpinner />}><EditTeamMember /></Suspense>} path="members/:memberId/edit" />
                    </Route>

                    <Route element={<Suspense fallback={<LoadingSpinner />}><EvaluatorsView /></Suspense>} path="evaluators">
                        <Route element={<Suspense fallback={<LoadingSpinner />}><NewEvaluatorView /></Suspense>} path="new" />
                    </Route>

                    <Route element={<Suspense fallback={<LoadingSpinner />}><AssessmentView /></Suspense>} path="assessment" >
                        <Route element={<Suspense fallback={<LoadingSpinner />}><AssessmentTeamView /></Suspense>} path=":teamId" />
                        <Route element={<Suspense fallback={<LoadingSpinner />}><AssessmentTeamDetailsView /></Suspense>} path="teams/:teamId/details" />
                        <Route element={<Suspense fallback={<LoadingSpinner />}><AssessmentExerciseDetailsView /></Suspense>} path="exercises/:exerciseId/details" />
                    </Route>
                </Route>

                <Route element={<Suspense fallback={<LoadingSpinner />}><MainLayout /></Suspense>} >
                    <Route element={<Suspense fallback={<LoadingSpinner />}><NotFoundView /></Suspense>} path="*" />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
