import Home from "@/pages/Home";
import { Authentication, PageTypes } from "@/pages/Authentication";
// import ChatbotFlow from "@/pages/ChatbotFlow.tsx";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import ListUsers from "@/pages/admin/users/ListUsers";
import MainLayout from "@/layouts/MainLayout";
import AboutUs from "@/pages/AboutUs";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import ChatbotFlowListPage from "@/pages/ChatbotFlowListPage.tsx";
import ChatbotBuilder from "@/components/ChatbotBuilder";
import BotListPage from "@/pages/bot/BotListPage";
import ShowBot from "../pages/bot/ShowBot.tsx";

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
      { path: "/chatbot_flows/:slug/edit", element: <ChatbotBuilder />, isPrivate: false },
      { path: "/bots", element: <BotListPage />, isPrivate: false },
      { path: "/bots/:id", element: <ShowBot />, isPrivate: false },
      { path: "/dashboard", element: <Dashboard />, isPrivate: false },
      { path: "/profile", element: <Profile />, isPrivate: false },
      { path: "/settings", element: <Settings />, isPrivate: false },
      { path: "/admin/users", element: <ListUsers />, isPrivate: false },
    ],
  },
];
