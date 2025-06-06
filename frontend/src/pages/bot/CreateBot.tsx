import React from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { create as createBot } from "@/api/repositories/BotRepository";

const providers = [
  { label: "Telegram", value: "telegram" },
  { label: "Viber", value: "viber" },
  { label: "WhatsApp", value: "whatsapp" },
];

const CreateBotPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(t('create_bot.errors.name_required')),
    provider: yup.string().required(t('create_bot.errors.provider_required')),
    token: yup.string().required(t('create_bot.errors.token_required')),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      provider: "",
      token: "",
      defaultResponse: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await createBot(data);
      toast.success(t('notifications.successfully_created'));
      navigate(`/bots/${res.data.id}`);
    } catch (err) {
      const messages = err?.response?.data?.errors || [t('notifications.error')];
      toast.error(messages.join(', '));
      console.error("Ошибка при создании бота:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {t('create_bot.title')}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label={t('create_bot.labels.name')}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />

              <Controller
                name="provider"
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    label={t('create_bot.labels.provider')}
                    {...field}
                    error={!!errors.provider}
                    helperText={errors.provider?.message}
                    fullWidth
                  >
                    {providers.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <TextField
                label={t('create_bot.labels.token')}
                {...register('token')}
                error={!!errors.token}
                helperText={errors.token?.message}
                fullWidth
              />

              <TextField
                label={t("create_bot.labels.default_response")}
                {...register("defaultResponse")}
                error={!!errors.defaultResponse}
                helperText={errors.defaultResponse?.message}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                endIcon={isSubmitting && <CircularProgress size={20} />}
                sx={{ mt: 2 }}
              >
                {t('create_bot.buttons.create')}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateBotPage;