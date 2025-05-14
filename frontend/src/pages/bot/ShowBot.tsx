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
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedIcon from '@mui/icons-material/Cached';

const ShowBotPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [bot, setBot] = useState(null);
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
    } catch (err) {
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

  const InfoRow = ({ label, value }) => (
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="body1">{label}</Typography>
      <Typography variant="body2" color="text.secondary">
        {value || '—'}
      </Typography>
    </Stack>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {t('bot_details.title')}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          {t('common.back')}
        </Button>
      </Box>

      <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="medium">
                {bot.name || `${t('bot_details.default_name')} #${bot.id}`}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label={isActive ? t('bot_details.status.active') : t('bot_details.status.inactive')}
                  color={isActive ? 'success' : 'default'}
                  size="small"
                  variant="outlined"
                />
                <Tooltip title={t('bot_details.tooltips.check_status')}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CachedIcon />}
                    onClick={handleCheckStatus}
                  >
                    {t('bot_details.buttons.refresh')}
                  </Button>
                </Tooltip>
              </Stack>
            </Box>

            <InfoRow label={t('bot_details.labels.name')} value={bot.name} />
            <InfoRow label={t('bot_details.labels.username')} value={bot.username} />
            <InfoRow label={t('bot_details.labels.description')} value={bot.description} />
            <InfoRow label={t('bot_details.labels.provider')} value={bot.provider} />
            <InfoRow label={t('bot_details.labels.token')} value={bot.token} />
            <InfoRow
              label={t('bot_details.labels.webhook_set')}
              value={isActive ? t('common.yes') : t('common.no')}
            />
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ShowBotPage;