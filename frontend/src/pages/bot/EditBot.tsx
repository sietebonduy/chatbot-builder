import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
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
  CircularProgress
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { show as fetchBot, update as updateBot } from "@/api/repositories/BotRepository";
import Loader from "@/components/UI/loader/Loader";

interface IFormValues {
  name: string;
  provider: string;
  token: string;
  defaultResponce: string;
}

const providers = [
  { label: "Telegram", value: "telegram" },
  { label: "Viber", value: "viber" },
  { label: "WhatsApp", value: "whatsapp" },
];

const EditBot: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const schema = yup.object().shape({
    name: yup.string().required(t("edit_bot.errors.name_required")),
    provider: yup.string().required(t("edit_bot.errors.provider_required")),
    token: yup.string().required(t("edit_bot.errors.token_required")),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      provider: "",
      token: "",
      defaultResponse: "",
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchBot(id!);
        const bot = res.data;
        reset({
          name: bot.name ?? "",
          provider: bot.provider ?? "",
          token: bot.token ?? "",
          defaultResponse: bot.defaultResponse ?? "",
        });
      } catch (err) {
        toast.error(t("notifications.error"));
        navigate("/bots");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate, reset, t]);

  const onSubmit = async (values: IFormValues) => {
    try {
      await updateBot(id!, values);
      toast.success(t("edit_bot.notifications.updated"));
      navigate(`/bots/${id}`);
    } catch (err) {
      const messages = (err as any)?.response?.data?.errors || [t("notifications.error")];
      toast.error((messages as string[]).join(", "));
      console.error("Ошибка при обновлении бота:", err);
    }
  };

  if (loading) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {t("edit_bot.title")}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          {t("common.back")}
        </Button>
      </Box>

      <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                label={t("edit_bot.labels.name")}
                {...register("name")}
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
                    label={t("edit_bot.labels.provider")}
                    {...field}
                    error={!!errors.provider}
                    helperText={errors.provider?.message}
                    fullWidth
                  >
                    {providers.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <TextField
                label={t("edit_bot.labels.token")}
                {...register("token")}
                error={!!errors.token}
                helperText={errors.token?.message}
                fullWidth
              />

              <TextField
                label={t("edit_bot.labels.default_response")}
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
                {t("edit_bot.buttons.save")}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditBot;
