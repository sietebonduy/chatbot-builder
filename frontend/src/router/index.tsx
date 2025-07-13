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
import ResetPassword from "@/pages/ResetPassword";
import ResetPasswordRequest from "@/pages/ResetPasswordRequest";
import EditBot from "@/pages/bot/EditBot";
import EditFlow from "@/pages/scenarios/Edit";
import Chats from "@/pages/chat/Chats";
import ShowChatPage from "@/pages/chat/ShowChatPage";
import AdminDashboard from "@/pages/admin/AdminDashboard.tsx";

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
      { path: "/", element: <Home /> },
      { path: "/about_us", element: <AboutUs /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    element: <MainLayout />,
    isPrivate: true,
    children: [
      { path: "/chatbot_flows", element: <ChatbotFlowListPage /> },
      { path: "/chatbot_flows/new", element: <CreateFlow /> },
      { path: "/chatbot_flows/:id/:slug/edit", element: <EditFlow /> },
      { path: "/bots", element: <BotListPage /> },
      { path: "/bots/:id", element: <ShowBot /> },
      { path: "/bots/:id/chats", element: <Chats /> },
      { path: "/bots/:id/chats/:chat_id", element: <ShowChatPage /> },
      { path: "/bots/new", element: <CreateBot /> },
      { path: "/bots/:id/edit", element: <EditBot /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  { path: "/chatbot_flows/:slug/edit", element: <ChatbotBuilder />, isPrivate: true },
  {
    element: <MainLayout />,
    isPrivate: true,
    isAdminOnly: true,
    children: [
      { path: "/admin/users", element: <ListUsers />},
      { path: "/admin/dashboard", element: <AdminDashboard /> },
    ]
  },
];
