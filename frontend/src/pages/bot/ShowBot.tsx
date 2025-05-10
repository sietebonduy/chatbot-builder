import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { show as showBot } from "@/api/repositories/BotRepository";
import Loader from "@/components/UI/loader/Loader.tsx";
import { present } from "@/utils/presence";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack
} from "@mui/material";
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
  if (!bot) {
    navigate("/not_found");
    return null;
  }

  const InfoRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
      <Typography variant="body1">{label}:</Typography>
      <Typography variant="body2" color="text.secondary">
        {value || '—'}
      </Typography>
    </Stack>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Детали бота
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
      </Box>

      <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight="medium">
                {bot.name || `Bot #${bot.id}`}
              </Typography>
              <Chip
                label={bot.isActive ? "Активен" : "Неактивен"}
                color={bot.isActive ? "success" : "default"}
                size="small"
              />
            </Box>

            <InfoRow label="Username" value={bot.username} />
            <InfoRow label="Описание" value={bot.description} />
            <InfoRow label="Провайдер" value={bot.provider} />
            <InfoRow label="Токен" value={bot.token} />
            <InfoRow label="Вебхук установлен" value={present(bot.webhookSetAt) ? 'Да' : 'Нет'} />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ShowBot;
