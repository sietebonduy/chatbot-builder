import Home from "@/pages/Home";
import { Authentication, PageTypes } from "@/pages/Authentication";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import ListUsers from "@/pages/admin/users/ListUsers";
import MainLayout from "@/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import Settings from "@/pages/Settings";
import ChatbotFlowListPage from "@/pages/scenarios/ChatbotFlowListPage";
import CreateFlow from "@/pages/scenarios/Create";
import ChatbotBuilder from "@/components/ChatbotBuilder";
import BotListPage from "@/pages/bot/BotListPage";
import ShowBot from "@/pages/bot/ShowBot";
import CreateBot from "@/pages/bot/CreateBot";
import ResetPassword from "@/pages/ResetPassword.tsx";
import ResetPasswordRequest from "@/pages/ResetPasswordRequest.tsx";
import EditBot from "@/pages/bot/EditBot.tsx";

export const routes = [
  {
    path: "/login",
    element: <Authentication pageType={PageTypes.LOGIN} />,
    isPrivate: false,
  },
  {
    path: "/sign_up",
    element: <Authentication pageType={PageTypes.REGISTER} />,
    isPrivate: false,
  },
  {
    path: "/forgot_password",
    element: <ResetPasswordRequest />,
    isPrivate: false,
  },
  {
    path: "/reset_password",
    element: <ResetPassword />,
    isPrivate: false,
  },
  {
    element: <MainLayout />,
    isPrivate: false,
    children: [
      { path: "/", element: <Home />, isPrivate: false },
      { path: "/about_us", element: <AboutUs />, isPrivate: false },
      { path: "*", element: <NotFound />, isPrivate: false },
    ],
  },
  {
    element: <MainLayout />,
    isPrivate: true,
    children: [
      { path: "/chatbot_flows", element: <ChatbotFlowListPage />, isPrivate: false },
      { path: "/chatbot_flows/new", element: <CreateFlow />, isPrivate: false },
      { path: "/bots", element: <BotListPage />, isPrivate: false },
      { path: "/bots/:id", element: <ShowBot />, isPrivate: false },
      { path: "/bots/new", element: <CreateBot />, isPrivate: false },
      { path: "/bots/:id/edit", element: <EditBot />, isPrivate: false },
      { path: "/dashboard", element: <Dashboard />, isPrivate: false },
      // { path: "/profile", element: <Profile />, isPrivate: false },
      { path: "/settings", element: <Settings />, isPrivate: false },
      { path: "/admin/users", element: <ListUsers />, isPrivate: false },
    ],
  },
  { path: "/chatbot_flows/:slug/edit", element: <ChatbotBuilder />, isPrivate: false },
];
