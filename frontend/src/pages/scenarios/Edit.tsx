import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { normalizeBot } from "@/lib/normalizeBot";
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from "@/components/UI/loader/Loader";

import { index as fetchBots } from '@/api/repositories/BotRepository';
import { show as fetchFlow, update as updateFlow } from '@/api/repositories/ChatbotFlowRepository';
import { normalizeFlow } from '@/lib/normalizeFlow';
import type { IChatbotFlowResource, IChatbotFlow } from '@/types/chatbotFlow';
import type { IBot, IBotListParams } from '@/types/bot';

interface IFormValues {
  name: string;
  botId: number | '';
  description: string;
}

const EditFlow: React.FC = () => {
  const { t } = useTranslation();
  const { id, slug } = useParams<{ id: string, slug: string }>();
  const navigate = useNavigate();

  const [bots, setBots] = useState<IBot[]>([]);
  const [loading, setLoading] = useState(true);

  const schema = yup.object().shape({
    name: yup.string().required(t('edit_flow.errors.name_required')),
    // botId: yup
    //   .number()
    //   .typeError(t('edit_flow.errors.bot_required'))
    //   .required(t('edit_flow.errors.bot_required')),
    description: yup
      .string()
      .max(500, t('edit_flow.errors.description_max')),
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      botId: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    (async () => {
      try {
        const flowRes = await fetchFlow(slug);
        const resource = flowRes.data.data as IChatbotFlowResource;
        const domainFlow = normalizeFlow(resource);

        reset({
          name:        domainFlow.name,
          botId:       domainFlow.botId ?? '',
          description: domainFlow.description,
        });

        const params: IBotListParams = {
          withoutFlows: true,
          includeBotId: domainFlow.botId,
        };
        const botsRes = await fetchBots(params);
        const normalizedBots = botsRes.data.data.map(normalizeBot);
        setBots(normalizedBots);

      } catch (err) {
        toast.error(t('notifications.error'));
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, reset, t]);

  const onSubmit = async (data: IFormValues) => {
    if (!id) return;
    try {
      await updateFlow(id, {
        name: data.name,
        bot_id: data.botId,
        description: data.description,
      });
      toast.success(t('edit_flow.notifications.updated'));
      navigate('/chatbot_flows');
    } catch {
      toast.error(t('notifications.error'));
    }
  };

  if (loading) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          {t('edit_flow.title')}
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
                label={t('edit_flow.labels.name')}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />

              <Controller
                name="botId"
                control={control}
                render={({ field }) => (
                  <TextField
                    label={t('edit_flow.labels.bot')}
                    select
                    fullWidth
                    {...field}
                    error={!!errors.botId}
                    helperText={errors.botId?.message}
                  >
                    {bots.map((bot) => (
                      <MenuItem key={bot.id} value={bot.id}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Avatar src={bot.avatarUrl || undefined} />
                          <Box>
                            <Typography>{bot.name || t('create_flow.unnamed')}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              @{bot.username || t('create_flow.no_username')}
                            </Typography>
                          </Box>
                        </Stack>
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <TextField
                label={t('edit_flow.labels.description')}
                {...register('description')}
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
                {t('edit_flow.buttons.save')}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditFlow;
