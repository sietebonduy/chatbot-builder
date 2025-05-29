import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  index as fetchAnalytics,
  getMessagesOverTime,
  getChatsOverTime,
  getMessagesByHour,
} from "@/api/repositories/AnalyticsRepository";
import { IAnalytics } from "@/types/analytics";

import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  ChatBubbleOutline,
  SmartToy,
  Person,
  AccessTime,
} from "@mui/icons-material";
import Loader from "@/components/UI/loader/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<IAnalytics | null>(null);
  const [dailyMessages, setDailyMessages] = useState<Record<string, number>>({});
  const [dailyChats, setDailyChats] = useState<Record<string, number>>({});
  const [messagesByHour, setMessagesByHour] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const statsRes = await fetchAnalytics();
        setStats(statsRes.data);

        const msgRes = await getMessagesOverTime();
        setDailyMessages(msgRes.data || {});

        const chatRes = await getChatsOverTime();
        setDailyChats(chatRes.data || {});

        const hourRes = await getMessagesByHour();
        setMessagesByHour(hourRes.data || {});
      } catch {
        setError(t("dashboard.load_error"));
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e0e0e0" } },
    },
  };

  const buildDateChartData = (
    data: Record<string, number>,
    label: string
  ) => {
    const labels = Object.keys(data).map(dateStr => {
      let day: string, month: string, year: string;
      if (dateStr.includes("-")) {
        [year, month, day] = dateStr.split("-");
      } else if (dateStr.length === 8) {
        year  = dateStr.slice(0, 4);
        month = dateStr.slice(4, 6);
        day   = dateStr.slice(6, 8);
      } else {
        const d = new Date(dateStr);
        day   = String(d.getDate()).padStart(2, "0");
        month = String(d.getMonth() + 1).padStart(2, "0");
        year  = String(d.getFullYear());
      }
      return `${day}.${month}.${year}`;
    });

    return {
      labels,
      datasets: [{
        label,
        data: Object.values(data),
        fill: false,
        borderColor: "#1976d2",
        backgroundColor: "#1976d2",
        tension: 0.4,
      }],
    };
  };

  const buildHourChartData = (
    data: Record<string, number>,
    label: string
  ) => ({
    labels: Object.keys(data).map(hour => `${hour}:00`),
    datasets: [{
      label,
      data: Object.values(data),
      fill: false,
      borderColor: "#1976d2",
      backgroundColor: "#1976d2",
      tension: 0.4,
    }],
  });


  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {t("dashboard.title")}
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        gutterBottom
      >
        {t("dashboard.subtitle")}
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{ mt: 5 }}
      >
        {[
          {
            title: t("dashboard.total_chats"),
            value: stats?.totalChats || 0,
            icon: <ChatBubbleOutline fontSize="large" />,
          },
          {
            title: t("dashboard.bot_messages"),
            value: stats?.totalMessagesFromBots || 0,
            icon: <SmartToy fontSize="large" />,
          },
          {
            title: t("dashboard.client_messages"),
            value: stats?.totalMessagesFromClients || 0,
            icon: <Person fontSize="large" />,
          },
          {
            title: t("dashboard.scheduled_messages"),
            value: stats?.scheduledMessages || 0,
            icon: <AccessTime fontSize="large" />,
          },
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 3,
                width: "250px",
                height: "150px",
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "background.paper",
                transition: "transform 0.3s ease, boxShadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  width: 56,
                  height: 56,
                  mr: 2,
                }}
              >
                {card.icon}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  gutterBottom
                >
                  {card.title}
                </Typography>
                <Typography variant="h4" color="primary">
                  {card.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }} justifyContent="space-evenly">
        <Grid item xs={12} md={4}>
          <Card sx={{height: "300px"}}>
            <CardHeader title={t("dashboard.messages_over_time")} />
            <CardContent>
              <Line
                data={buildDateChartData(
                  dailyMessages,
                  t("dashboard.messages_over_time")
                )}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{height: "300px"}}>
            <CardHeader title={t("dashboard.messages_by_hour")} />
            <CardContent>
              <Bar
                data={buildHourChartData(
                  messagesByHour,
                  t("dashboard.messages_by_hour")
                )}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{height: "300px"}}>
            <CardHeader title={t("dashboard.chats_over_time")} />
            <CardContent>
              <Line
                data={buildDateChartData(
                  dailyChats,
                  t("dashboard.chats_over_time")
                )}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;