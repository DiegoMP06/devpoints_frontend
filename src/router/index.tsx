import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "auth/views/LoginView";
import RegisterView from "auth/views/RegisterView";
import ForgotPasswordView from "auth/views/ForgotPasswordView";
import EmailVerificationNotificationView from "auth/views/EmailVerificationNotificationView";
import ResetPasswordView from "auth/views/ResetPasswordView";
import VerifyEmailView from "auth/views/VerifyEmailView";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardView from "dashboard/views/DashboardView";
import NewContestView from "dashboard/views/contests/NewContestView";
import EditContestView from "dashboard/views/contests/EditContestView";
import MainLayout from "@/layouts/MainLayout";
import ContestDetailsView from "dashboard/views/contests/ContestDetailsView";
import ExercisesView from "dashboard/views/exercises/ExercisesView";
import TeamsView from "dashboard/views/teams/TeamsView";
import NewExerciseView from "dashboard/views/exercises/NewExerciseView";
import EditExerciseView from "dashboard/views/exercises/EditExerciseView";
import ExerciseDetailsView from "dashboard/views/exercises/ExerciseDetailsView";
import NewTeamView from "dashboard/views/teams/NewTeamView";
import EditTeamView from "dashboard/views/teams/EditTeamView";
import NewTeamMember from "dashboard/views/teams/NewTeamMember";
import EditTeamMember from "dashboard/views/teams/EditTeamMember";
import TeamDetailsView from "dashboard/views/teams/TeamDetailsView";
import EvaluatorsView from "dashboard/views/evaluators/EvaluatorsView";
import NewEvaluatorView from "dashboard/views/evaluators/NewEvaluatorView";
import AssessmentView from "dashboard/views/assessment/AssessmentView";
import AssessmentTeamView from "dashboard/views/assessment/AssessmentTeamView";
import AssessmentTeamDetailsView from "dashboard/views/assessment/AssesmentTeamDetailsView";
import AssessmentExerciseDetailsView from "dashboard/views/assessment/AssessmentExerciseDetailsView";
import HomeView from "@/modules/app/views/HomeView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route element={<LoginView />} path="/login" />
                    <Route element={<RegisterView />} path="/register" />
                    <Route element={<ForgotPasswordView />} path="/forgot-password" />
                    <Route element={<ResetPasswordView />} path="/reset-password" />
                    <Route element={<EmailVerificationNotificationView />} path="/email/verification-notification" />
                    <Route element={<VerifyEmailView />} path="verify-email/:id/:hash" />
                </Route>

                <Route element={<MainLayout />}>
                    <Route element={<HomeView />} path="/" />

                    <Route element={<DashboardView />} path="/dashboard" />
                    <Route element={<NewContestView />} path="/dashboard/contests/new" />
                    <Route element={<EditContestView />} path="/dashboard/contests/:contestId/edit" />
                </Route>
                <Route element={<DashboardLayout />} path="/dashboard/contests/:contestId">
                    <Route element={<ContestDetailsView />} index />
                    <Route element={<ExercisesView />} path="exercises">
                        <Route element={<ExerciseDetailsView />} path=":exerciseId" />
                    </Route>
                    <Route element={<NewExerciseView />} path="exercises/new" />
                    <Route element={<EditExerciseView />} path="exercises/:exerciseId/edit" />
                    <Route element={<TeamsView />} path="teams" >
                        <Route element={<TeamDetailsView />} path=":teamId" />
                    </Route>
                    <Route element={<NewTeamView />} path="teams/new" />
                    <Route element={<EditTeamView />} path="teams/:teamId/edit">
                        <Route element={<NewTeamMember />} path="members/new" />
                        <Route element={<EditTeamMember />} path="members/:memberId/edit" />
                    </Route>

                    <Route element={<EvaluatorsView />} path="evaluators">
                        <Route element={<NewEvaluatorView />} path="new" />
                    </Route>

                    <Route element={<AssessmentView />} path="assessment" >
                        <Route element={<AssessmentTeamView />} path=":teamId" />
                        <Route element={<AssessmentTeamDetailsView />} path="teams/:teamId/details" />
                        <Route element={<AssessmentExerciseDetailsView />} path="exercises/:exerciseId/details" />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
