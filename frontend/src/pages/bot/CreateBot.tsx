import React from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
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
} from "@mui/material";
import { create as createBot } from "@/api/repositories/BotRepository";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
  provider: yup.string().required("Провайдер обязателен"),
  token: yup.string().required("Токен обязателен"),
});

const providers = [
  { label: "Telegram", value: "telegram" },
  { label: "Viber", value: "viber" },
  { label: "WhatsApp", value: "whatsapp" },
];

const CreateBot = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: "",
      name: "",
      provider: "",
      token: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createBot(data);
      toast.success(t('notifications.successfully_created'));
      navigate(`/bots/${response.data.id}`);
    } catch (error) {
      const messages = error?.response?.data?.errors || t('notifications.error');
      toast.error(messages.join(', '));
      console.error("Ошибка при создании:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Создание чат-бота
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label="Имя"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />

              <TextField
                select
                label="Провайдер"
                {...register("provider")}
                error={!!errors.provider}
                helperText={errors.provider?.message}
                fullWidth
              >
                {providers.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Токен"
                {...register("token")}
                error={!!errors.token}
                helperText={errors.token?.message}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                Создать
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateBot;
