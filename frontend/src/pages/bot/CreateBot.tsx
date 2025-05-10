import React from "react";
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
      navigate(`/bots/${response.data.id}`);
    } catch (error) {
      console.error("Ошибка при создании:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Создание чат-бота
        </Typography>
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
