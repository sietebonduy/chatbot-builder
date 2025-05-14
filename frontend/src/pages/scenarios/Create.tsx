import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { normalizeBot } from "@/lib/normalizeBot";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Stack,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { index as fetchBots } from '@/api/repositories/BotRepository';
import { create as createFlow } from "@/api/repositories/ChatbotFlowRepository";

const CreateFlow = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  const schema = yup.object().shape({
    name: yup.string().required(t('create_flow.errors.name_required')),
    botId: yup
      .number()
      .typeError(t('create_flow.errors.bot_required'))
      .required(t('create_flow.errors.bot_required')),
    description: yup.string().max(500, t('create_flow.errors.description_max')),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      botId: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, botId: Number(data.botId) };
      const response = await createFlow(payload);
      toast.success(t('notifications.successfully_created'));
      navigate(`/chatbot_flows/${response.data.slug}/edit`);
    } catch (error) {
      const messages = error?.response?.data?.errors || [t('notifications.error')];
      toast.error(messages.join(', '));
      console.error("Ошибка при создании:", error);
    }
  };

  useEffect(() => {
    fetchBots()
      .then((res) => setBots(res?.data.data.map(normalizeBot) ?? []))
      .catch(() => toast.error(t('notifications.error')))
      .finally(() => setLoading(false));
  }, [t]);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {t('create_flow.title')}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          {t('create_flow.buttons.back')}
        </Button>
      </Box>

      <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label={t('create_flow.labels.name')}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />

              <Controller
                name="botId"
                control={control}
                render={({ field }) => (
                  <TextField
                    label={t('create_flow.labels.bot')}
                    select
                    fullWidth
                    disabled={loading}
                    {...field}
                    error={!!errors.botId}
                    helperText={
                      loading
                        ? t('create_flow.loading')
                        : errors.botId?.message
                    }
                  >
                    {loading ? (
                      <MenuItem value="">
                        <em>{t('create_flow.loading')}</em>
                      </MenuItem>
                    ) : (
                      bots.map((bot) => (
                        <MenuItem key={bot.id} value={bot.id}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              src={bot.avatarUrl ?? undefined}
                              alt={bot.name ?? ''}
                            />
                            <Box>
                              <Typography variant="body1">
                                {bot.name ?? t('create_flow.unnamed')}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                @{bot.username ?? t('create_flow.noUsername')}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                )}
              />

              <TextField
                label={t('create_flow.labels.description')}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                multiline
                minRows={3}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                endIcon={isSubmitting && <CircularProgress size={20} />}
                sx={{ mt: 2 }}
              >
                {t('create_flow.buttons.create')}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateFlow;