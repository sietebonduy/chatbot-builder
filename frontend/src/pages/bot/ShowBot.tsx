import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { show as showBot } from "@/api/repositories/BotRepository";
import Loader from "@/components/UI/loader/Loader.tsx";

import { Box, Card, CardContent, Typography, Button, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShowBot = () => {
  const { id } = useParams();
  const [bot, setBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    showBot(id)
      .then((res) => {
        setBot(res.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки: ", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (!bot) return navigate("/not_found");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card sx={{ minWidth: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Информация о боте
          </Typography>

          <Typography variant="body1">
            <strong>ID:</strong> {bot.id}
          </Typography>

          <Typography variant="body1">
            <strong>Имя:</strong> {bot.name}
          </Typography>

          <Typography variant="body1">
            <strong>Провайдер:</strong> {bot.provider}
          </Typography>

          <Box mt={2}>
            <Chip
              label={bot.active ? "Активен" : "Неактивен"}
              color={bot.active ? "success" : "default"}
              variant="outlined"
            />
          </Box>

          <Box mt={3} display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/bots/${bot.id}/edit`)}
            >
              Редактировать
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default ShowBot;
