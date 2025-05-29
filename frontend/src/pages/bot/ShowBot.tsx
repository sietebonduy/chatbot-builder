import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { show as showBot, checkStatus } from "@/api/repositories/BotRepository";
import Loader from "@/components/UI/loader/Loader";
import { present } from "@/utils/presence";
import { toast } from 'react-toastify';
import {
  Container,
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Tooltip,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedIcon from '@mui/icons-material/Cached';
import ChatIcon from '@mui/icons-material/Chat';

interface InfoRowProps {
  label: string;
  value?: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
    <Typography variant="body1">{label}</Typography>
    <Typography variant="body2" color="text.secondary">
      {value ?? '—'}
    </Typography>
  </Box>
);

const ShowBotPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [bot, setBot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchBot = async () => {
    setLoading(true);
    try {
      const res = await showBot(id);
      setBot(res.data);
    } catch (err) {
      console.error("Ошибка загрузки бота:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBot();
  }, [id]);

  const handleCheckStatus = async () => {
    setLoading(true);
    try {
      const res = await checkStatus(id);
      setBot(res.data);
      toast.success(t('bot_details.notifications.status_ok'));
    } catch (err: any) {
      const messages = err?.response?.data?.errors || [t('notifications.error')];
      toast.error(messages.join(', '));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error || !bot) {
    navigate("/not_found", { replace: true });
    return null;
  }

  const isActive = present(bot.webhookUrl);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {/* Заголовок и кнопки Навигации */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/bots')}
          >
            {t('common.back')}
          </Button>
        </Box>
        <Typography variant="h5" fontWeight="bold">
          {t('bot_details.title')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          onClick={() => navigate(`/bots/${id}/chats`)}
        >
          {t('bot_details.buttons.chats')}
        </Button>
      </Box>

      <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 24 }}>
              {bot.name?.charAt(0) ?? 'B'}
            </Avatar>
          }
          title={
            <Typography variant="h6">
              {bot.name || `${t('bot_details.default_name')} #${bot.id}`}
            </Typography>
          }
          subheader={`@${bot.username}`}
        />
        <Divider />
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">{t('bot_details.labels.status')}</Typography>
              <Chip
                label={isActive ? t('bot_details.status.active') : t('bot_details.status.inactive')}
                color={isActive ? 'success' : 'default'}
                size="small"
                variant="outlined"
              />
              <Tooltip title={t('bot_details.tooltips.check_status')}>
                <Button
                  variant="text"
                  size="small"
                  startIcon={<CachedIcon />}
                  onClick={handleCheckStatus}
                >
                  {t('bot_details.buttons.refresh')}
                </Button>
              </Tooltip>
            </Stack>

            <Divider />

            <InfoRow label={t('bot_details.labels.name')} value={bot.name} />
            <InfoRow label={t('bot_details.labels.username')} value={bot.username} />
            <InfoRow label={t('bot_details.labels.description')} value={bot.description} />
            <InfoRow label={t('bot_details.labels.provider')} value={bot.provider} />
            <InfoRow label={t('bot_details.labels.token')} value={bot.token} />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ShowBotPage;
