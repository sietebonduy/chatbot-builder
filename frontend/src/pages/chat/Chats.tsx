import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Card, CardHeader, Avatar, Typography, List, ListItemButton, ListItemAvatar, ListItemText, Badge, TextField, Skeleton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/UI/loader/Loader';
import { index as fetchChats } from '@/api/repositories/ChatRepository';
import { IChat, IMessageAttributes } from '@/types/chat';

const ChatsIndexPage: React.FC = () => {
  const { t } = useTranslation();
  const { id: botId, chatId } = useParams<{ id: string; chatId?: string }>();
  const navigate = useNavigate();
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!botId) return;
    fetchChats(botId)
      .then(setChats)
      .catch(() => setError(t('chats.load_error')))
      .finally(() => setLoading(false));
  }, [botId, t]);

  const bot = chats[0]?.bot;

  const filtered = useMemo(() => {
    if (!filter) return chats;
    return chats.filter((c) => {
      const name = c.client.firstName?.toLowerCase() || '';
      const last = c.messages[c.messages.length - 1]?.content.toLowerCase() || '';
      return (
        name.includes(filter.toLowerCase()) ||
        last.includes(filter.toLowerCase())
      );
    });
  }, [chats, filter]);

  if (loading) return <Loader />;
  if (error)
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ display: 'flex', justifyContent: 'end', pt: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>{t('chats.back')}</Button>
      </Box>

      <Box sx={{ display: 'flex', py: 2, gap: 5 }}>
        <Box sx={{ width: 300 }}>
          { bot ? (
            <Card variant="outlined">
              <CardHeader
                avatar={ <Avatar sx={{ bgcolor: 'primary.main' }}>{ bot.name[0] }</Avatar> }
                title={bot.name}
                subheader={`@${bot.username}`}
              />
            </Card>
          ) : (
            <Skeleton variant="rectangular" height={80} />
            )
          }
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>{ t('chats.title') }</Typography>

          <Box mb={2}>
            <TextField fullWidth size="small" placeholder={t('chats.search_placeholder')} value={filter} onChange={(e) => setFilter(e.target.value)}/>
          </Box>

          <List sx={{ flex: 1, overflowY: 'auto' }}>
            { filtered.length > 0 ? (
              filtered.map((chat) => {
                const last: IMessageAttributes | undefined = chat.messages[chat.messages.length - 1];
                const name = chat.client.firstName || t('chats.no_name');
                const preview = last?.content || '';
                const time = last
                  ? new Date(last.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  : '';

                return (
                  <ListItemButton key={chat.id} selected={chatId === String(chat.id)} onClick={() => navigate(`/bots/${botId}/chats/${chat.id}`)} sx={{ mb: 1, borderRadius: 2,}}>
                    <ListItemAvatar>
                      <Badge badgeContent={chat.messages.length} color="primary">
                        <Avatar>{ chat.client.avatarUrl || name[0] }</Avatar>
                      </Badge>
                    </ListItemAvatar>

                    <ListItemText primary={name}
                      secondary={
                        <Typography component="span" variant="body2" color="text.secondary" noWrap>
                          { preview }
                        </Typography>
                      }
                    />

                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', ml: 1 }}>
                      { time }
                    </Typography>
                  </ListItemButton>
                );
              })
            ) : (
              <Typography color="text.secondary" sx={{ p: 2 }}>
                {t('chats.no_chats')}
              </Typography>
              )
            }
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default ChatsIndexPage;
